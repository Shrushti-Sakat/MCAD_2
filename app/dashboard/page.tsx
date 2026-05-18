import { DashboardCourseList } from "@/components/site/dashboard-course-list";
import { DashboardSummary } from "@/components/site/dashboard-summary";
import { PageHero } from "@/components/site/page-hero";
import { mockDashboardCourses } from "@/lib/mock-dashboard";

export default function DashboardPage() {
  return (
    <>
      <PageHero
        eyebrow="Dashboard"
        title="Your learning dashboard for robotics and Digital Twin progress"
        description="A clean dashboard view for purchased courses, current progress, and the next lesson to continue. This version uses mock data so the UI foundation is ready before backend wiring."
      />
      <DashboardSummary courses={mockDashboardCourses} />
      <DashboardCourseList courses={mockDashboardCourses} />
    </>
  );
}
