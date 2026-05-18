export type CourseModule = {
  title: string;
  summary: string;
};

export type Course = {
  id: string;
  category: string;
  title: string;
  description: string;
  instructor: string;
  price: string;
  duration: string;
  level: string;
  format: string;
  tagline: string;
  outcomes: string[];
  curriculum: CourseModule[];
};

export const mockCourses: Course[] = [
  {
    id: "Digital Twin-foundations",
    category: "Digital Twin Core",
    title: "Digital Twin Foundations for Robotics Engineers",
    description:
      "A modern starter track for learners who want to understand nodes, topics, services, launch files, and practical Digital Twin system architecture.",
    instructor: "Aarav Kulkarni",
    price: "INR 14,999",
    duration: "8 weeks",
    level: "Beginner to Intermediate",
    format: "Live + Guided lab",
    tagline: "Start with the Digital Twin concepts that matter in real robotics workflows.",
    outcomes: [
      "Understand Digital Twin communication patterns and package structure",
      "Build confidence with launch flows, debugging habits, and project setup",
      "Complete practical exercises on lab robot scenarios",
    ],
    curriculum: [
      {
        title: "Digital Twin architecture and workspace setup",
        summary: "Install, structure, and navigate a clean robotics development environment.",
      },
      {
        title: "Nodes, topics, and message flow",
        summary: "Work through the communication model that powers Digital Twin applications.",
      },
      {
        title: "Services, actions, and launch",
        summary: "Coordinate system behavior and learn when to use each interaction pattern.",
      },
      {
        title: "Mini project and debugging workflow",
        summary: "Wrap the foundation with hands-on troubleshooting and structured delivery.",
      },
    ],
  },
  {
    id: "Digital Twin-navigation-systems",
    category: "Robotics Systems",
    title: "Digital Twin Navigation and Autonomous Systems",
    description:
      "A course for learners ready to move into mapping, navigation stacks, sensor integration, and autonomy-oriented robotics thinking.",
    instructor: "Neha Deshmukh",
    price: "INR 19,499",
    duration: "10 weeks",
    level: "Intermediate",
    format: "Instructor-led cohort",
    tagline: "Explore the Digital Twin workflows behind navigation-first robotics systems.",
    outcomes: [
      "Gain clarity on localization, mapping, and navigation concepts",
      "Connect sensor inputs to navigation-focused robotics behavior",
      "Build advanced autonomy demos on realistic robot workflows",
    ],
    curriculum: [
      {
        title: "Sensor pipelines and robot state awareness",
        summary: "Understand the flow of data from hardware inputs into system behavior.",
      },
      {
        title: "Localization and mapping concepts",
        summary: "Learn the building blocks that make navigation decisions possible.",
      },
      {
        title: "Navigation stack foundations",
        summary: "Work with path planning, goal execution, and recovery concepts.",
      },
      {
        title: "Autonomy case study",
        summary: "Apply the stack to a guided mobility or warehouse-style robotics scenario.",
      },
    ],
  },
  {
    id: "Digital Twin-lab-project-accelerator",
    category: "Lab Accelerator",
    title: "Digital Twin Lab Project Accelerator",
    description:
      "A fast-paced program focused on Digital Twin project builds, hardware integration, and lab-grade execution quality.",
    instructor: "Ritika Joshi",
    price: "INR 11,999",
    duration: "6 weeks",
    level: "All levels",
    format: "Mentor-driven sprint",
    tagline: "Turn Digital Twin learning into reliable real-robot performance.",
    outcomes: [
      "Build complete Digital Twin mini-projects from architecture to demo",
      "Practice debugging, testing, and deployment on physical robots",
      "Improve system thinking with mentor-led lab reviews",
    ],
    curriculum: [
      {
        title: "Lab roadmap and project planning",
        summary: "Define execution milestones for a guided Digital Twin robot build.",
      },
      {
        title: "System integration sprint",
        summary: "Connect sensing, control, and motion modules into one stable workflow.",
      },
      {
        title: "Technical review and debugging drills",
        summary: "Harden your project with mentor-led testing and fault diagnosis.",
      },
      {
        title: "Final live robot demonstration",
        summary: "Deliver a complete Digital Twin lab demo with clear performance checkpoints.",
      },
    ],
  },
];

export function getCourseById(id: string) {
  return mockCourses.find((course) => course.id === id);
}
