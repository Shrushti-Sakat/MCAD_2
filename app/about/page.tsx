import { PageHero } from "@/components/site/page-hero";
import { ArrowRight, CheckCircle2, Zap, Target, Users, Award, BookOpen, Lightbulb, Shield, Rocket, TrendingUp, Building2, GraduationCap } from "lucide-react";

const aboutCards = [
  {
    title: "College lab focus",
    icon: Zap,
    body: "M CAD Solutions is positioned around helping colleges develop robotics labs with real robot platforms and practical implementation support. We work directly with educational institutions to design, set up, and maintain state-of-the-art robotics labs that give students hands-on experience with modern robotic systems and industry-standard tools.",
  },
  {
    title: "Digital twin training with hardware",
    icon: Target,
    body: "Training is framed around Digital Twin concepts applied on physical robots so students can connect software, controls, sensing, and deployment. Our curriculum bridges the gap between theory and practice, allowing students to understand how robotic systems integrate perception, decision-making, and physical actuation in real-world scenarios.",
  },
  {
    title: "Open to every branch and year",
    icon: Users,
    body: "Courses are clearly described as accessible to students from branches: Computer, IT, AIDS, Mechanical, ENTC and Robotics and Automation and all academic years, helping colleges run broader interdisciplinary programs. Whether you're from Computer Science, Mechanical Engineering, Electrical Engineering, or any other discipline, our programs are designed to be inclusive and provide foundational knowledge with advanced pathways.",
  },
] as const;

const missionPoints = [
  { icon: "🎯", text: "Democratize access to robotics education across Indian colleges" },
  { icon: "⚙️", text: "Provide practical, hands-on learning with industry-relevant technologies" },
  { icon: "🌉", text: "Bridge the skills gap between academic training and industry requirements" },
  { icon: "💡", text: "Foster innovation and research in robotics and autonomous systems" },
  { icon: "🤝", text: "Support interdisciplinary collaboration among students and faculty" },
] as const;

const whyChooseUs = [
  {
    title: "Real Hardware + Simulation Expertise",
    description: "Best of both worlds - combining real robots with digital twin simulation for comprehensive learning and risk-free testing.",
    icon: Award,
  },
  {
    title: "Digital Twin Native Development",
    description: "Latest technology stack with native Digital Twin, Gazebo, and MoveIt 2 integration for professional-grade robotics development.",
    icon: CheckCircle2,
  },
  {
    title: "Industry-Level Implementation",
    description: "Production-ready solutions built for real-world deployment, not just educational prototypes.",
    icon: Zap,
  },
  {
    title: "Affordable Educational Solutions",
    description: "Value for money with customizable modules tailored to institutional budgets and learning objectives.",
    icon: ArrowRight,
  },
] as const;

const capabilities = [
  { icon: "🤖", title: "Advanced Robotics Platforms", desc: "Access to cutting-edge robotic systems and hardware for real-world experimentation" },
  { icon: "💻", title: "Software Development", desc: "Comprehensive Digital Twin stack with integration for sensors, actuators, and autonomous systems" },
  { icon: "📚", title: "Curriculum Design", desc: "Tailored course structures designed for colleges and all academic disciplines" },
  { icon: "🏆", title: "Industry Partnerships", desc: "Connections with leading robotics companies and research institutions" },
  { icon: "👥", title: "Expert Mentorship", desc: "Guidance from experienced professionals with proven track records in robotics" },
  { icon: "🚀", title: "Career Development", desc: "Job placement support and industry networking opportunities for students" },
] as const;

const processSteps = [
  { num: "01", title: "Consultation", desc: "We understand your college's needs, resources, and educational goals" },
  { num: "02", title: "Planning", desc: "Design a customized robotics lab setup and training program for your institution" },
  { num: "03", title: "Implementation", desc: "Install hardware, set up infrastructure, and prepare faculty for training" },
  { num: "04", title: "Training", desc: "Conduct comprehensive workshops and courses for students and faculty" },
  { num: "05", title: "Support", desc: "Provide ongoing technical support, maintenance, and curriculum updates" },
  { num: "06", title: "Growth", desc: "Help scale your program with advanced projects and industry collaborations" },
] as const;

const stats = [
  { number: "100+", label: "Colleges Partnered", icon: Building2 },
  { number: "5000+", label: "Students Trained", icon: GraduationCap },
  { number: "50+", label: "Labs Established", icon: Rocket },
  { number: "10+", label: "Years Experience", icon: Award },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="M CAD Solutions | Building Indigenous Robotics Solutions For A Self-Reliant India"
        description="From real robots to virtual simulations – We design, develop & train next-generation robotics solutions using Digital Twin, AI & Digital Twins. Supporting Make in India, Skill India, and Atmanirbhar Bharat initiatives."
      />



      {/* About Company Section (Who We Are) */}
      <section className="w-full py-8 sm:py-12 bg-white border-y border-brand/10 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-soft/20 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/4"></div>
        
        <div className="section-shell">
          <div className="px-4 sm:px-6 lg:px-10">
            <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-start">
            {/* Left Content */}
            <div className="space-y-6">
              <div>
                <span className="inline-block text-brand-dark font-semibold text-xs tracking-[0.2em] uppercase mb-3 px-4 py-1.5 rounded-full bg-brand-soft/50 border border-brand/20">
                  Our Story
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight [text-wrap:balance]">
                  Who We Are
                </h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-lg sm:text-xl font-medium leading-relaxed text-foreground/90 text-pretty">
                  M CAD Solutions is dedicated to building indigenous robotics solutions for a self-reliant India. We combine real robot platforms with digital twin simulation technology to create comprehensive learning and industrial automation ecosystems.
                </p>
                <div className="h-px w-16 bg-brand/30 rounded-full my-4"></div>
                <p className="text-base leading-relaxed text-muted text-pretty">
                  Our focus is on Digital Twin development, AI integration, and practical hands-on training. We support national initiatives like Make in India, Skill India, and Atmanirbhar Bharat by providing affordable, industry-ready robotics solutions tailored for educational institutions and enterprises.
                </p>
                <p className="text-base leading-relaxed text-muted text-pretty">
                  From beginner-level Python programming to advanced AI robotics with vision systems and autonomous automation, our structured training paths ensure students and professionals are job-ready. We've trained over 5000 students and established robotics labs in 50+ institutions across India.
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-xl text-brand">★</span>
                  ))}
                </div>
                <span className="text-sm text-foreground font-semibold">Trusted by leading institutions across India</span>
              </div>
            </div>

            {/* Right Stats Grid */}
            <div className="relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {stats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div 
                      key={stat.label} 
                      className="group relative rounded-[2rem] border border-brand/10 bg-white p-6 text-left shadow-soft transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-brand-soft/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-[2rem]"></div>
                      <div className="relative z-10 flex flex-col items-start">
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-soft text-brand-dark">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-1">
                          {stat.number}
                        </div>
                        <div className="text-[10px] font-semibold uppercase tracking-widest text-muted">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* Mission Section */}
      <section className="w-full py-10 sm:py-16 bg-surface">
        <div className="section-shell">
          <div className="px-4 sm:px-6 lg:px-10">
          <div className="mb-6 sm:mb-8">
            <span className="inline-block text-brand-dark font-semibold text-xs tracking-[0.2em] uppercase mb-3 px-4 py-1.5 rounded-full bg-brand-soft/50 border border-brand/20">
              Our Purpose
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight [text-wrap:balance]">Mission & Vision</h2>
            <p className="mt-3 text-lg text-muted text-pretty">Driving excellence in robotics education across India</p>
          </div>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {missionPoints.map((point) => (
              <div key={point.text} className="flex flex-col items-start text-left p-8 sm:p-10 rounded-[2.5rem] border border-brand/15 bg-white shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                <div className="text-4xl mb-6 transform transition-transform duration-300 group-hover:scale-110">{point.icon}</div>
                <p className="text-base text-foreground font-medium leading-relaxed">{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

      {/* Why Choose Us Section */}
      <section className="w-full py-10 sm:py-16 bg-white border-y border-brand/10">
        <div className="section-shell">
          <div className="px-4 sm:px-6 lg:px-10">
          <div className="mb-8 sm:mb-10">
            <span className="inline-block text-brand-dark font-semibold text-xs tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full bg-brand-soft/50 border border-brand/20">
              Why Us
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">Why Choose M CAD Solutions</h2>
            <p className="mt-4 text-lg text-muted">We stand out through expertise, innovation, and unwavering commitment to your success</p>
          </div>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative rounded-[2rem] border border-brand/15 bg-gradient-to-b from-white to-brand-soft/10 p-8 shadow-soft hover:shadow-lg transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-soft text-brand-dark mb-6 group-hover:-translate-y-1 transition-transform duration-300 shadow-sm border border-brand/10">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{item.description}</p>
                </div>
              );
          })}
        </div>
      </div>
    </div>
  </section>

      {/* Capabilities Section */}
      <section className="w-full py-10 sm:py-16 bg-surface">
        <div className="section-shell">
          <div className="px-4 sm:px-6 lg:px-10">
          <div className="mb-6 sm:mb-8">
            <span className="inline-block text-brand-dark font-semibold text-xs tracking-[0.2em] uppercase mb-3 px-4 py-1.5 rounded-full bg-brand-soft/50 border border-brand/20">
              What We Offer
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight [text-wrap:balance]">Our Capabilities</h2>
            <p className="mt-3 text-lg text-muted text-pretty">Comprehensive solutions covering every aspect of robotics education</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap) => (
              <div key={cap.title} className="group relative rounded-[2rem] border border-brand/15 bg-white p-8 shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="text-brand-dark text-4xl mb-6 inline-block transform transition-transform duration-300 group-hover:scale-110">
                  {cap.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{cap.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

      {/* Services Section */}
      <section className="w-full py-10 sm:py-16 bg-white border-y border-brand/10">
        <div className="section-shell">
          <div className="px-4 sm:px-6 lg:px-10">
          <div className="mb-6 sm:mb-8">
            <span className="inline-block text-brand-dark font-semibold text-xs tracking-[0.2em] uppercase mb-3 px-4 py-1.5 rounded-full bg-brand-soft/50 border border-brand/20">
              Services
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight [text-wrap:balance]">Our Services</h2>
            <p className="mt-3 text-lg text-muted text-pretty">Comprehensive solutions tailored to your institution's needs</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            
            {/* Service 1 */}
            <div className="group relative rounded-[2.5rem] border border-brand/15 bg-surface p-8 sm:p-12 shadow-soft hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-soft text-brand-dark mb-8 shadow-sm border border-brand/10 text-3xl group-hover:scale-105 transition-transform">
                ⚙️
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Lab Development & Setup</h3>
              <ul className="space-y-4">
                {[
                  "Complete robotics lab design and implementation",
                  "Hardware procurement and installation",
                  "Infrastructure and workspace optimization",
                  "Ongoing maintenance and support",
                  "Technical consultation and troubleshooting",
                  "Lab documentation and best practices"
                ].map((item) => (
                  <li key={item} className="flex gap-4 items-start group/item">
                    <CheckCircle2 className="w-5 h-5 text-brand flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform duration-300" />
                    <span className="text-foreground/80 leading-relaxed font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service 2 */}
            <div className="group relative rounded-[2.5rem] border border-brand/15 bg-surface p-8 sm:p-12 shadow-soft hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-soft text-brand-dark mb-8 shadow-sm border border-brand/10 text-3xl group-hover:scale-105 transition-transform">
                📚
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Training Programs</h3>
              <ul className="space-y-4">
                {[
                  "Digital Twin fundamentals and advanced courses",
                  "Hands-on robotics projects and workshops",
                  "Faculty training and certification",
                  "Customized curriculum for your institution",
                  "Industry guest lectures and seminars",
                  "Student mentorship and project guidance"
                ].map((item) => (
                  <li key={item} className="flex gap-4 items-start group/item">
                    <CheckCircle2 className="w-5 h-5 text-brand flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform duration-300" />
                    <span className="text-foreground/80 leading-relaxed font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>

      {/* Commitment Section */}
      <section className="w-full py-10 sm:py-16 bg-surface">
        <div className="section-shell">
          <div className="px-4 sm:px-6 lg:px-10">
          <div className="mb-8 sm:mb-10">
            <span className="inline-block text-brand-dark font-semibold text-xs tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full bg-brand-soft/50 border border-brand/20">
              Our Promise
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">What Sets Us Apart</h2>
          </div>
          
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            <div className="p-8 rounded-[2rem] border border-brand/15 bg-white shadow-soft hover:shadow-lg transition-all duration-300 group">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-soft flex items-center justify-center flex-shrink-0 border border-brand/10 group-hover:-translate-y-1 transition-transform">
                  <Rocket className="w-7 h-7 text-brand-dark" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Cutting-Edge Technology</h3>
                  <p className="text-base text-muted leading-relaxed">We continuously invest in the latest robotics platforms, sensors, and software frameworks to ensure our labs remain state-of-the-art.</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-[2rem] border border-brand/15 bg-white shadow-soft hover:shadow-lg transition-all duration-300 group">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-soft flex items-center justify-center flex-shrink-0 border border-brand/10 group-hover:-translate-y-1 transition-transform">
                  <BookOpen className="w-7 h-7 text-brand-dark" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Comprehensive Curriculum</h3>
                  <p className="text-base text-muted leading-relaxed">Our curriculum progresses from fundamentals to advanced topics, ensuring students can learn at their own pace while building practical skills.</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-[2rem] border border-brand/15 bg-white shadow-soft hover:shadow-lg transition-all duration-300 group">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-soft flex items-center justify-center flex-shrink-0 border border-brand/10 group-hover:-translate-y-1 transition-transform">
                  <TrendingUp className="w-7 h-7 text-brand-dark" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Proven Track Record</h3>
                  <p className="text-base text-muted leading-relaxed">Our alumni work at top tech companies, startups, and research institutions, validating the quality of our training and career outcomes.</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-[2rem] border border-brand/15 bg-white shadow-soft hover:shadow-lg transition-all duration-300 group">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-soft flex items-center justify-center flex-shrink-0 border border-brand/10 group-hover:-translate-y-1 transition-transform">
                  <Shield className="w-7 h-7 text-brand-dark" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Dedicated Support</h3>
                  <p className="text-base text-muted leading-relaxed">Our team provides continuous support, maintenance, and updates to ensure your lab runs smoothly and your programs stay relevant.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    </>
  );
}
