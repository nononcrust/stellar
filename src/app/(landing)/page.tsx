import { Header as HeaderBase } from "@/components/layouts/header";
import { TransitionMount } from "@/components/shared/transition-mount";
import { Button } from "@/components/ui/button";
import { ROUTE } from "@/lib/route";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main>
      <Header />
      <HeroSection />
      <SummarySection />
      <FeaturesSection />
      <FaqSection />
    </main>
  );
}

const Header = () => {
  return (
    <HeaderBase>
      <div className="mx-auto flex h-full w-full max-w-4xl items-center justify-between px-4">
        <h1 className="text-primary text-2xl font-extrabold tracking-tighter">Stellar</h1>
        <div className="flex gap-2">
          <Button variant="outlined" render={<Link href={ROUTE.LOGIN} />}>
            로그인
          </Button>
          <Button render={<Link href={ROUTE.LOGIN} />}>시작하기</Button>
        </div>
      </div>
    </HeaderBase>
  );
};

const HeroSection = () => {
  return (
    <section className="bg-background-100">
      <div className="mx-auto max-w-4xl px-4 py-40">
        <TransitionMount>
          <h1 className="text-4xl leading-12 font-extrabold tracking-tighter whitespace-pre-wrap">
            <span className="from-primary-light to-primary w-fit bg-gradient-to-r bg-clip-text py-16 text-transparent">
              스텔라
            </span>
            {" 와 함께\n누구나 쉽고 빠르게 만드는 설문"}
          </h1>
          <p className="text-subtle mt-3 text-xl font-semibold">
            설문조사, 신청서, 피드백 수집까지. 간단한 과정으로 필요한 양식을 바로 만들어 공유하세요.
          </p>
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
      </div>
    </section>
  );
};

const SummarySection = () => {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="grid grid-cols-2 gap-4">
          <div className="border-border bg-background-100 col-span-2 h-[240px] rounded-lg border" />
          <div className="border-border bg-background-100 col-span-1 h-[240px] rounded-lg border" />
          <div className="border-border bg-background-100 col-span-1 h-[240px] rounded-lg border" />
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="grid grid-cols-3 gap-4">
          <div className="border-border bg-background-100 h-[200px] rounded-lg border" />
          <div className="border-border bg-background-100 h-[200px] rounded-lg border" />
          <div className="border-border bg-background-100 h-[200px] rounded-lg border" />
        </div>
      </div>
    </section>
  );
};

const FaqSection = () => {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <ul className="flex flex-col gap-4">
          <li className="border-border bg-background-100 h-[64px] rounded-lg border" />
          <li className="border-border bg-background-100 h-[64px] rounded-lg border" />
          <li className="border-border bg-background-100 h-[64px] rounded-lg border" />
          <li className="border-border bg-background-100 h-[64px] rounded-lg border" />
        </ul>
      </div>
    </section>
  );
};
