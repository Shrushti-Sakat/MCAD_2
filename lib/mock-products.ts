export type ProductVariant = {
  id: string;
  color: string;
  colorHex: string;
  image: string;
  stock: number;
};

export type RobotProduct = {
  id: string;
  category: string;
  title: string;
  description: string;
  type: string;
  price: string;
  useCase: string;
  highlights: string[];
  variants: ProductVariant[];
};

export const mockProducts: RobotProduct[] = [
  {
    id: "agv-lab-bot",
    category: "Mobile Robotics",
    title: "AGV Lab Bot",
    description:
      "A compact autonomous guided vehicle platform designed for Digital Twin learning, warehouse simulation, and navigation experiments.",
    type: "Indoor AGV",
    price: "INR 1,85,000",
    useCase: "Navigation, path planning, and robotics lab demos",
    highlights: [
      "Digital Twin-ready integration for classroom and prototyping workflows",
      "Useful for mapping, localization, and movement control demos",
      "Designed as a hands-on learning robot for mobility projects",
    ],
    variants: [
      { id: "agv-white", color: "Arctic White", colorHex: "#f0ece6", image: "/variant-white.png", stock: 12 },
      { id: "agv-black", color: "Stealth Black", colorHex: "#1a1a1a", image: "/variant-black.png", stock: 8 },
      { id: "agv-red", color: "Industrial Red", colorHex: "#c0392b", image: "/variant-red.png", stock: 5 },
      { id: "agv-blue", color: "Navy Blue", colorHex: "#1e3a5f", image: "/variant-blue.png", stock: 3 },
      { id: "agv-metallic", color: "Brushed Silver", colorHex: "#b0b8c1", image: "/variant-metallic.jpg", stock: 6 },
      { id: "agv-yellow", color: "Campus Yellow", colorHex: "#f0c419", image: "/variant-yellow.png", stock: 9 },
    ],
  },
  {
    id: "arm-trainer-x2",
    category: "Manipulator Systems",
    title: "Arm Trainer X2",
    description:
      "A robotic arm training unit built for pick-and-place demos, kinematics learning, and industrial automation practice.",
    type: "Training Manipulator",
    price: "INR 2,40,000",
    useCase: "Kinematics, simulation, and automation skill-building",
    highlights: [
      "Supports robotics fundamentals and industrial motion concepts",
      "Useful for lab-ready automation projects and academic demos",
      "Pairs well with Digital Twin-centered manipulation learning tracks",
    ],
    variants: [
      { id: "arm-coming-soon", color: "Coming Soon", colorHex: "#1a1a1a", image: "/coming-soon.png", stock: 0 },
    ],
  },
  {
    id: "inspection-rover-mini",
    category: "Field Robotics",
    title: "Inspection Rover Mini",
    description:
      "A rugged mock rover concept for inspection workflows, sensor testing, and remote robotics experiments in training environments.",
    type: "Tracked Rover",
    price: "INR 2,95,000",
    useCase: "Sensor integration, telemetry, and robotics exploration",
    highlights: [
      "Fits robotics prototyping scenarios for mobile field systems",
      "Encourages practical sensor stack and communications learning",
      "Can be positioned as a project robot for advanced cohorts",
    ],
    variants: [
      { id: "rover-coming-soon", color: "Coming Soon", colorHex: "#1a1a1a", image: "/coming-soon.png", stock: 0 },
    ],
  },
];
