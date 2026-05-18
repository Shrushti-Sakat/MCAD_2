
import { PageHero } from "@/components/site/page-hero";
import { TrainingTracksSection } from "@/components/site/training-tracks-section";
import { getCourses } from "@/lib/courses";

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const { courses } = await getCourses();

  return (
    <>
      <PageHero
        eyebrow="Courses"
        title="Browse Digital Twin Training Programs Built For College Robotics Labs"
        description="Explore training paths designed for robotics lab development in colleges. These programs are open to students from all branches and all academic years, with sign-in only required at purchase time."
      />
      <TrainingTracksSection />

    </>
  );
}

