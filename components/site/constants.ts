import {
  Blocks,
  Bot,
  Cpu,
  GraduationCap,
  Radar,
  ShieldCheck,
} from "lucide-react";

export const navLinks = [
  { href: "/", label: "Home",external: false },
  { href: "/courses", label: "Courses",external: false },
  { href: "/products", label: "Products",external: false },
  { href: "/about", label: "About",external: false },
  {
    href: "https://cv-analyzer-alpha-eosin.vercel.app",
    label: "CV Analyzer",
    external: true,
  },
  {
    href: "https://forms.gle/CpJLzSWMzXhGL8cFA",
    label: "ADMISSION FORM",
    external: true,
  },
] as const;

export const heroStats = [
  { value: "College-Ready", label: "Robotics lab setups planned for engineering campuses" },
  { value: "Digital Twin Training", label: "Hands-on sessions from foundations to deployment workflows" },
  { value: "Branches: Computer, IT, AIDS, Mechanical, ENTC and Robotics and Automation", label: "Open to students from every year and every department" },
] as const;

export const services = [
  {
    title: "Robotics Lab Development For Colleges",
    description:
      "We help colleges set up practical robotics labs with robot arms, mobile robots, accessories, and deployment guidance matched to academic use.",
    icon: Bot,
  },
  {
    title: "Digital Twin Training And Faculty Support",
    description:
      "Structured Digital Twin training programs support students, faculty, and lab teams with theory, simulation, hardware bring-up, and live demos.",
    icon: Cpu,
  },
  {
    title: "Inclusive Campus Learning",
    description:
      "Branches: Computer, IT, AIDS, Mechanical, ENTC and Robotics and Automation students can attend these courses, making the lab useful across interdisciplinary batches.",
    icon: Radar,
  },
] as const;

export const focusCards = [
  {
    title: "From lab setup to outcomes",
    description:
      "The website now leads with institution-ready robotics labs instead of generic training language.",
    icon: Blocks,
  },
  {
    title: "Training tied to real robots",
    description:
      "Students learn Digital Twin on physical platforms, with simulation and hardware integrated into one journey.",
    icon: GraduationCap,
  },
  {
    title: "Accessible to every student cohort",
    description:
      "Programs are presented as open to branches: Computer, IT, AIDS, Mechanical, ENTC and Robotics and Automation, and all academic years so colleges can scale participation easily.",
    icon: ShieldCheck,
  },
] as const;

export const coursesPreview = [
  {
    category: "Campus Foundation",
    title: "Digital Twin Foundations For Branches: Computer, IT, AIDS, Mechanical, ENTC and Robotics and Automation",
    summary: "Core Digital Twin concepts, communication patterns, and practical robotics workflows designed for students from any department and any year.",
    price: "Buy access",
  },
  {
    category: "Lab Intensive",
    title: "College Robotics Lab Integration Sprint",
    summary: "Hands-on training for robot bring-up, sensors, control loops, and lab exercises on physical systems used in academic robotics labs.",
    price: "Buy access",
  },
  {
    category: "Deployment Track",
    title: "Digital Twin Project And Deployment Studio",
    summary: "A guided implementation track where students build, test, and present robotics projects using the same lab ecosystem colleges deploy on campus.",
    price: "Buy access",
  },
] as const;

export const solutionTiers = [
  {
    name: "Tier 1",
    title: "Software simulation",
    description: "Perfect for initial learning and development. This tier provides a complete simulation environment using industry-standard robotics tools. Students can learn Digital Twin, motion planning, and visualization without physical hardware investment.",
    details: "Tier 1 is the foundation of robotics education. Using Gazebo's physics engine, students simulate complex robot behaviors in a virtual environment. RViz provides real-time 3D visualization of robot states, sensor data, and trajectories. MoveIt enables motion planning and manipulation in software before transitioning to hardware.",
    learningOutcomes: [
      "Understand Digital Twin architecture and communication",
      "Master motion planning algorithms",
      "Learn 3D visualization and debugging",
      "Develop foundational C++ programming skills",
      "Create and test robot behaviors in simulation"
    ],
    useCases: ["Beginner students", "Algorithm development", "Classroom learning", "Budget-friendly introduction"],
    items: ["MoveIt", "Gazebo", "RViz", "C++", "UI provided"],
  },
  {
    name: "Tier 2",
    title: "Real hardware",
    description: "Step into hands-on robotics with real hardware. This tier provides everything needed to control actual robot arms with servo motors. Students transition from simulation to physical manipulation and real-world problem solving.",
    details: "Tier 2 bridges the gap between theory and practice. Real servo motors (Bus Servo) provide authentic haptic feedback and real-world constraints. The hardware adapter enables seamless communication with the physical system. Students learn about actuator control, sensor feedback loops, and troubleshooting real-world robotics challenges.",
    learningOutcomes: [
      "Control physical robot arms in real-time",
      "Understand servo motor mechanics and control",
      "Debug hardware-specific issues",
      "Learn about torque, speed, and precision in real systems",
      "Develop practical robot programming skills"
    ],
    useCases: ["Hardware experience", "Real-world control", "Lab exercises", "Intermediate level"],
    items: [
      "MoveIt",
      "Real hardware",
      "C++",
      "Adapter",
      "UI provided",
      "Bus Servo",
      "USB cable",
    ],
  },
  {
    name: "Tier 3",
    title: "Software + hardware",
    description: "The most comprehensive learning package combining both simulation and real hardware. Students can prototype in simulation and then deploy to physical robots. Perfect for advanced robotics projects and research.",
    details: "Tier 3 provides the complete robotics development ecosystem. Simulation allows risk-free algorithm testing and rapid iteration. Real hardware validation ensures solutions work in practice. This dual approach accelerates development while building deep understanding of both theoretical and practical aspects.",
    learningOutcomes: [
      "Develop in simulation, validate on hardware",
      "Understand sim-to-real transfer challenges",
      "Create production-ready robot applications",
      "Master complex motion planning scenarios",
      "Lead advanced robotics research projects"
    ],
    useCases: ["Hybrid development", "Project-based learning", "Research work", "Advanced coursework"],
    items: [
      "MoveIt",
      "Gazebo",
      "RViz",
      "C++",
      "Bus Servo",
      "Real hardware",
      "Adapter",
      "USB cable",
    ],
  },
  {
    name: "Tier 4",
    title: "Real hardware + AI (YOLO only)",
    description: "Introduces artificial intelligence with computer vision capabilities. Uses YOLO for real-time object detection. Perfect for robotics applications requiring AI-powered perception and vision-based manipulation.",
    details: "Tier 4 adds intelligent perception to robotics. YOLO (You Only Look Once) provides real-time object detection at high speed. Two cameras enable stereo vision for depth estimation. Mobile app allows remote monitoring and control. Focus is on pick & place operations guided by computer vision.",
    learningOutcomes: [
      "Implement computer vision in robotics",
      "Deploy YOLO for object detection",
      "Create vision-guided robot tasks",
      "Learn depth estimation and 3D localization",
      "Build AI-powered automation systems"
    ],
    useCases: ["Vision-based tasks", "Object detection", "Pick & place", "AI integration"],
    items: [
      "YOLO",
      "2 cameras",
      "PS4 controller",
      "Mobile app",
      "Pick & place only",
    ],
  },
  {
    name: "Tier 5",
    title: "Real hardware + AI (Full brain)",
    description: "The most advanced package with full AI capabilities and complete autonomous control. Enables sophisticated robotics applications with deep learning, complex decision-making, and full system autonomy.",
    details: "Tier 5 represents the frontier of autonomous robotics. Full AI brain enables end-to-end learning from raw sensor inputs to motor commands. Deep neural networks handle complex perception, planning, and control. System can learn from demonstrations and adapt to new environments. Ideal for research and cutting-edge applications.",
    learningOutcomes: [
      "Master deep reinforcement learning for robotics",
      "Design end-to-end autonomous systems",
      "Implement advanced computer vision and perception",
      "Create adaptive learning algorithms",
      "Develop production autonomous robots"
    ],
    useCases: ["Advanced AI integration", "Autonomous systems", "Research projects", "Enterprise solutions"],
    items: [],
  },
] as const;

export const solutionAddOns = {
  title: "Add-ons",
  items: [
    { name: "Extra Bus Servo", image: "/addons/bus-servo.jpg" },
    { name: "Motor", image: "/addons/motor.jpg" },
    { name: "Wires", image: "/addons/wires.jpg" },
    { name: "Mobile Application", image: "/addons/mobile-app.jpg" },
    { name: "UI laptop", image: "/addons/ui-laptop.jpg" },
  ],
} as const;
