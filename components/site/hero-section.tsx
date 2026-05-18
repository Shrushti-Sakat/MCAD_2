import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { BuyButton } from "@/components/site/buy-button";
import { SiteButton } from "@/components/site/button";
import { heroStats } from "@/components/site/constants";

export function HeroSection() {
  return (
    <section className="section-shell pt-10">
      <div className="grid-pattern relative overflow-hidden rounded-[2rem] border border-white/70 bg-hero-grid bg-[length:38px_38px] px-6 py-6 shadow-soft sm:px-10 sm:py-8 lg:px-14">
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-[#fff8ef]/85 to-[#f9eacb]/45" />
        <div className="relative animate-appear grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white/85 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-brand-dark">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
              M CAD Solutions | College Robotics Labs + Digital Twin Training
            </div>
            <h1 className="mt-4 sm:mt-6 text-2xl sm:text-4xl lg:text-7xl font-semibold leading-[1.15] tracking-tight text-foreground lg:leading-[1.1] sm:leading-[1.12]">
              Real Robots. Smarter Labs.
            </h1>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-xl leading-7 sm:leading-9 text-muted/90">
              M CAD Solutions helps colleges develop robotics labs with industry-relevant robot platforms,
              hands-on Digital Twin training, and guided implementation support. Every course is open to
              students from branches: Computer, IT, AIDS, Mechanical, ENTC and Robotics and Automation, and all academic years.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col gap-3 sm:gap-4 sm:flex-row">
              <Link href="/courses">
                <SiteButton className="px-8 py-4 text-base">
                  Explore Training Programs
                  <ArrowRight className="ml-2 h-5 w-5" />
                </SiteButton>
              </Link>
              <BuyButton variant="secondary" className="px-8 py-4 text-base">Build Your Lab Plan</BuyButton>
            </div>
          </div>

          {/* New Image Section to fill blank space properly */}
          <div className="relative h-[400px] lg:h-full min-h-[500px] w-full animate-float lg:scale-105">
            <Image
              src="/hero-robot.png"
              alt="M CAD Solutions Robotics Lab"
              fill
              className="object-cover rounded-[2rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border border-white/50"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}
