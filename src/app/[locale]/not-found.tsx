import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { buttonVariants } from "@/components/shared/Button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <section className="radial-spot relative flex min-h-[60vh] items-center justify-center overflow-hidden">
      <Container>
        <div className="mx-auto max-w-md text-center">
          <p className="text-gradient font-heading text-7xl font-extrabold">404</p>
          <h1 className="mt-4 text-2xl font-bold text-text">Страница не найдена</h1>
          <p className="mt-3 text-sm text-text-muted">
            Возможно, ссылка устарела или страница была перемещена.
          </p>
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "primary", size: "lg" }), "mt-7")}
          >
            На главную
          </Link>
        </div>
      </Container>
    </section>
  );
}
