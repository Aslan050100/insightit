<?php
/**
 * Lead intake -> Bitrix24 (CODEX_TASKS P0-1).
 *
 * The site is a Next.js static export (`output: "export"`) served by nginx
 * on Plesk, so there is no Node runtime for an app/api/lead/route.ts handler
 * — it gets dropped from the build and 404s in production. This plain PHP
 * script is the replacement; the front end posts to /api/lead.php instead.
 *
 * The Bitrix24 webhook URL is a secret and must never live in this file or
 * anywhere under httpdocs/. It is read from, in order:
 *   1. the B24_WEBHOOK_URL environment variable, if the host sets one;
 *   2. a PHP file OUTSIDE the web root that returns the URL as a string —
 *      see secrets/b24-webhook.php.example next to this file's project root
 *      for the exact format and where to put it on the server.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$body = json_decode((string) $raw, true);
if (!is_array($body)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'bad_json']);
    exit;
}

function b24_str(array $body, string $key): string
{
    return isset($body[$key]) && is_string($body[$key]) ? trim($body[$key]) : '';
}

$name = b24_str($body, 'name');
$phoneRaw = b24_str($body, 'phone');
$email = b24_str($body, 'email');
$message = b24_str($body, 'message');
$source = b24_str($body, 'source') ?: 'Сайт InsightIT';
$formName = b24_str($body, 'formName') ?: 'unknown';
$pageUrl = b24_str($body, 'url');
$hp = b24_str($body, 'hp');
$renderedAt = isset($body['renderedAt']) && is_numeric($body['renderedAt']) ? (float) $body['renderedAt'] : null;
$utm = isset($body['utm']) && is_array($body['utm']) ? $body['utm'] : [];

// Honeypot: a real visitor never fills this hidden field in. Pretend success
// so the bot doesn't learn anything, but never touch Bitrix24.
if ($hp !== '') {
    echo json_encode(['ok' => false, 'error' => 'spam']);
    exit;
}

// Reject submissions completed faster than 3s after the form rendered.
if ($renderedAt !== null && (microtime(true) * 1000 - $renderedAt) < 3000) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'too_fast']);
    exit;
}

$phoneDigits = preg_replace('/\D+/', '', $phoneRaw) ?? '';
$phoneValid = strlen($phoneDigits) >= 10 && strlen($phoneDigits) <= 11;

if ($name === '' || (!$phoneValid && $email === '')) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'validation']);
    exit;
}

function b24_webhook_url(): ?string
{
    $env = getenv('B24_WEBHOOK_URL');
    if (is_string($env) && $env !== '') {
        return $env;
    }
    // __DIR__ here is httpdocs/api; two levels up is the Plesk home dir,
    // a sibling of httpdocs — never inside the deployed static export.
    $secretsFile = dirname(__DIR__, 2) . '/secrets/b24-webhook.php';
    if (is_file($secretsFile)) {
        $value = include $secretsFile;
        if (is_string($value) && $value !== '') {
            return $value;
        }
    }
    return null;
}

$webhook = b24_webhook_url();
if ($webhook === null) {
    // Not configured yet — the client falls back to WhatsApp, no lead lost.
    echo json_encode(['ok' => false, 'error' => 'not_configured']);
    exit;
}
$base = rtrim($webhook, '/') . '/';

$commentsLines = [];
if ($message !== '') {
    $commentsLines[] = $message;
}
if ($pageUrl !== '') {
    $commentsLines[] = 'Страница: ' . $pageUrl;
}
$utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
$utmParts = [];
foreach ($utmKeys as $key) {
    if (!empty($utm[$key]) && is_string($utm[$key])) {
        $utmParts[] = $key . '=' . $utm[$key];
    }
}
if ($utmParts !== []) {
    $commentsLines[] = implode(', ', $utmParts);
}

$fields = [
    'TITLE' => 'Заявка с сайта: ' . $formName,
    'NAME' => $name,
    'SOURCE_ID' => 'WEB',
    'SOURCE_DESCRIPTION' => $source,
    'OPENED' => 'Y',
];
if ($commentsLines !== []) {
    $fields['COMMENTS'] = implode("\n", $commentsLines);
}
if ($phoneValid) {
    $fields['PHONE'] = [['VALUE' => $phoneRaw, 'VALUE_TYPE' => 'WORK']];
}
if ($email !== '') {
    $fields['EMAIL'] = [['VALUE' => $email, 'VALUE_TYPE' => 'WORK']];
}
$utmFieldMap = [
    'utm_source' => 'UTM_SOURCE',
    'utm_medium' => 'UTM_MEDIUM',
    'utm_campaign' => 'UTM_CAMPAIGN',
    'utm_content' => 'UTM_CONTENT',
    'utm_term' => 'UTM_TERM',
];
foreach ($utmFieldMap as $key => $b24Field) {
    if (!empty($utm[$key]) && is_string($utm[$key])) {
        $fields[$b24Field] = $utm[$key];
    }
}

$payload = json_encode(['fields' => $fields, 'params' => ['REGISTER_SONET_EVENT' => 'Y']]);

$ch = curl_init($base . 'crm.lead.add.json');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_POSTFIELDS => $payload,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_SSL_VERIFYPEER => true,
]);
$response = curl_exec($ch);
$curlError = curl_error($ch);
$status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($curlError !== '' || $response === false) {
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'network']);
    exit;
}

$data = json_decode((string) $response, true);
if ($status >= 400 || !is_array($data) || isset($data['error']) || empty($data['result'])) {
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'bitrix_error']);
    exit;
}

echo json_encode(['ok' => true, 'id' => $data['result']]);
