import Image from "next/image";
import { CheckCircle2, Zap, Users, Gauge, BookOpen, BarChart3 } from "lucide-react";

import { services } from "@/components/site/constants";
import { SectionHeading } from "@/components/site/section-heading";

export function ServicesSection() {
  const serviceFeatures = [
    "Complete lab infrastructure setup",
    "Hardware procurement and integration",
    "Faculty training and onboarding",
    "Student-ready curriculum",
    "Ongoing technical support",
    "Regular maintenance and updates",
  ];

  const processSteps = [
    {
      number: "01",
      title: "Assessment & Planning",
      description: "We evaluate your college's existing infrastructure, identify specific needs, and create a customized robotics lab roadmap.",
      icon: Gauge,
    },
    {
      number: "02",
      title: "Setup & Integration",
      description: "Our technical team handles hardware procurement, installation, network configuration, and system testing for seamless operation.",
      icon: Zap,
    },
    {
      number: "03",
      title: "Faculty & Student Training",
      description: "Comprehensive Digital Twin training programs for your faculty and structured learning paths for students across all academic branches.",
      icon: BookOpen,
    },
    {
      number: "04",
      title: "Ongoing Support",
      description: "Continuous technical support, curriculum updates, maintenance scheduling, and performance monitoring to ensure lab excellence.",
      icon: Users,
    },
  ];

  const impactMetrics = [
    {
      value: "500+",
      label: "Students Trained Annually",
      icon: Users,
    },
    {
      value: "95%",
      label: "Faculty Satisfaction Rate",
      icon: BarChart3,
    },
    {
      value: "50+",
      label: "Partner Colleges",
      icon: BookOpen,
    },
  ];

  return (
    <section className="section-shell mt-16 sm:mt-24">
      <div className="grid items-start gap-8 sm:gap-12 md:grid-cols-1 lg:grid-cols-[1fr_0.75fr]">
        <SectionHeading
          eyebrow="Core Services"
          title="We Don't Just Supply Robots. We Build The Lab That Teaches Them."
          description={
            <div className="space-y-3">
              <p className="text-base font-medium text-foreground/90">
                Most colleges get hardware. Their students get confused. 
                We give you a system — robots, curriculum, trained faculty, and a learning track that works for every branch, every year, every student.
              </p>
              
              <div className="space-y-2">
                <h4 className="text-lg font-semibold text-brand-dark">What Makes MCAD Different?</h4>
                <p className="text-sm text-muted">
                  Forget vendor relationships. We operate as your robotics lab partner — 
                  embedded in your institution's growth, not just your purchase order. 
                  Every solution we deploy is built around three principles:
                </p>
                
                <div className="grid gap-3">
                  <div className="space-y-0.5">
                    <h5 className="text-sm font-bold text-foreground flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-brand" />
                      Hardware That Works On Day 1
                    </h5>
                    <p className="text-xs text-muted ml-3">
                      No assembly surprises. No compatibility chaos. Every robot arrives configured, tested, and ROS2-ready for your specific lab environment.
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    <h5 className="text-sm font-bold text-foreground flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-brand" />
                      Training That Actually Sticks
                    </h5>
                    <p className="text-xs text-muted ml-3">
                      Our ROS2 programs aren't slide decks — they're live, hands-on sessions designed for students who've never touched a robot and faculty who want to teach them confidently.
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    <h5 className="text-sm font-bold text-foreground flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-brand" />
                      Support That Doesn't Disappear After Delivery
                    </h5>
                    <p className="text-sm text-muted mt-1 ml-3.5">
                      We stay. Technical issues, curriculum questions, lab expansion — our team is reachable long after the invoice is closed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          }
        />
        <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/85 p-4 shadow-soft">
          <Image
            alt="M CAD robotic arm lab variants"
            className="h-full w-full rounded-[1.5rem] object-cover"
            height={768}
            src="/services-robot-labs.jpeg"
            width={1152}
          />
        </div>
      </div>

      {/* Service Cards */}
      <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.title}
            className="rounded-[2rem] border border-white/80 bg-white/80 p-7 shadow-soft hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand-dark">
              <service.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-foreground">{service.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted">{service.description}</p>
          </article>
        ))}
      </div>

      {/* What's Included */}
      <div className="mt-12 sm:mt-16 rounded-[2rem] border border-white/80 bg-gradient-to-br from-white/85 to-white/75 p-6 sm:p-8 lg:p-12 shadow-soft">
        <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">What's Included In Our Service</h2>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted">
          Our comprehensive robotics lab development service covers everything your college needs to launch a successful program.
        </p>
        <div className="mt-6 sm:mt-10 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
          {serviceFeatures.map((feature) => (
            <div key={feature} className="flex items-start gap-4">
              <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-brand mt-1" />
              <span className="text-base text-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Implementation Process */}
      <div className="mt-16 sm:mt-24">
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">Our Implementation Process</h2>
          <p className="mt-3 text-sm sm:text-base text-muted">
            A structured, phased approach ensures your robotics lab is delivered on time and exceeds expectations.
          </p>
        </div>
        
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, idx) => (
            <div key={step.title} className="relative">
              <div className="rounded-[2rem] border border-brand/15 bg-white/80 p-6 shadow-soft hover:shadow-lg transition-shadow min-h-[320px] flex flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand-dark">
                  <step.icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-3xl font-bold text-brand-dark/30">{step.number}</p>
                <h3 className="mt-3 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted flex-grow">{step.description}</p>
              </div>
              {idx < processSteps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <div className="w-6 h-0.5 bg-gradient-to-r from-brand/50 to-transparent" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Additional Benefits */}
      <div className="mt-16 sm:mt-24">
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">Why Colleges Choose M CAD Solutions</h2>
          <p className="mt-3 text-sm sm:text-base text-muted">
            We combine cutting-edge robotics hardware with proven educational methodologies.
          </p>
        </div>
        
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
          <div className="rounded-[2rem] border border-white/80 bg-gradient-to-br from-white/90 to-brand-soft/20 p-6 sm:p-8 shadow-soft">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground">Industry-Ready Curriculum</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Our Digital Twin-first curriculum aligns with industry standards and prepares students for real-world robotics challenges.
            </p>
          </div>
          
          <div className="rounded-[2rem] border border-white/80 bg-gradient-to-br from-white/90 to-brand-soft/20 p-6 sm:p-8 shadow-soft">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground">Expert Technical Support</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Dedicated support team ensures your lab runs smoothly with minimal downtime and continuous optimization.
            </p>
          </div>
          
          <div className="rounded-[2rem] border border-white/80 bg-gradient-to-br from-white/90 to-brand-soft/20 p-6 sm:p-8 shadow-soft">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground">Inclusive Learning Paths</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Programs designed for branches: Computer, IT, AIDS, Mechanical, ENTC and Robotics and Automation. Beginner to advanced levels available.
            </p>
          </div>
          
          <div className="rounded-[2rem] border border-white/80 bg-gradient-to-br from-white/90 to-brand-soft/20 p-6 sm:p-8 shadow-soft">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground">Scalable Infrastructure</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Start small and grow your lab. Our modular approach allows you to expand as your program develops.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
