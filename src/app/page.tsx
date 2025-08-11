import { TransitionMount } from "@/components/shared/transition-mount";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ROUTE } from "../lib/route";

export default function Home() {
  return (
    <main className="mx-auto mt-8 max-w-5xl py-16">
      <TransitionMount>
        <h1 className="text-4xl leading-12 font-extrabold tracking-tighter whitespace-pre-wrap">
          <span className="from-primary-light to-primary w-fit bg-gradient-to-r bg-clip-text py-16 text-transparent">
            스텔라
          </span>

          {" 와 함께\n쉽고 빠르게 폼을 만들어보세요."}
        </h1>
      </TransitionMount>
      <TransitionMount delay={0.2}>
        <Link
          href={ROUTE.LOGIN}
          className={cn(
            "mt-8 h-14 px-7",
            "inline-flex items-center justify-center gap-1.5 rounded-full border border-transparent shadow-xl transition-colors",
            "hover:bg-primary-dark to-primary hover:to-primary-dark bg-gradient-to-r from-sky-500 hover:from-sky-500",
            "text-xl font-semibold text-white",
          )}
        >
          시작하기
        </Link>
      </TransitionMount>
    </main>
  );
}
