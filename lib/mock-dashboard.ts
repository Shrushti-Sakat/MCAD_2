export type DashboardCourse = {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  nextLesson: string;
  status: "On Track" | "In Progress" | "Ready to Complete";
};

export const mockDashboardCourses: DashboardCourse[] = [
  {
    id: "Digital Twin-foundations",
    title: "Digital Twin Foundations for Robotics Engineers",
    instructor: "Aarav Kulkarni",
    progress: 68,
    nextLesson: "Services, actions, and launch files",
    status: "In Progress",
  },
  {
    id: "Digital Twin-navigation-systems",
    title: "Digital Twin Navigation and Autonomous Systems",
    instructor: "Neha Deshmukh",
    progress: 34,
    nextLesson: "Localization and mapping concepts",
    status: "On Track",
  },
  {
    id: "Digital Twin-lab-project-accelerator",
    title: "Digital Twin Lab Project Accelerator",
    instructor: "Ritika Joshi",
    progress: 91,
    nextLesson: "Final live robot demonstration",
    status: "Ready to Complete",
  },
];
