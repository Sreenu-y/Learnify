import { Skeleton } from "@/components/ui/skeleton";
import Course from "./Course";
import { useGetPublishedCoursesQuery } from "@/features/api/courseApi";
import { Layers } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Courses = () => {
  const { data, isLoading, isError } = useGetPublishedCoursesQuery();
  useScrollReveal();

  if (isError || !data || !data.courses)
    return (
      <section className="grid-bg-subtle min-h-screen flex items-center justify-center">
        <p className="text-black/30 dark:text-white/25 text-lg">
          Failed to load courses.
        </p>
      </section>
    );

  return (
    <section className="grid-bg-subtle relative py-20">
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 mb-6 text-center">
          <div className="badge-pill reveal" data-delay="0">
            <Layers size={12} />
            Curated for you
          </div>
          <h2
            className="text-3xl md:text-4xl font-black text-black dark:text-white tracking-tight reveal"
            data-delay="80"
          >
            Explore <span className="gradient-text-gray">Our Courses</span>
          </h2>
          <p
            className="text-black/35 dark:text-white/30 text-sm max-w-md reveal"
            data-delay="160"
          >
            Handpicked courses across design, development, business, and more.
          </p>
        </div>

        {/* Animated divider */}
        <div className="line-reveal mb-14" data-delay="240" />

        {/* Course grid */}
        {isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <CourseSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {data?.courses?.map((course, idx) => (
              <div key={idx} className="reveal-scale" data-delay={idx * 80}>
                <Course course={course} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[var(--background)] to-transparent pointer-events-none" />
    </section>
  );
};

export default Courses;

const CourseSkeleton = () => (
  <div className="glass-card rounded-2xl overflow-hidden animate-shimmer">
    <Skeleton className="w-full h-44 bg-black/5 dark:bg-white/5 rounded-none" />
    <div className="p-4 space-y-3">
      <Skeleton className="h-4 w-3/4 bg-black/5 dark:bg-white/5" />
      <Skeleton className="h-3 w-1/2 bg-black/5 dark:bg-white/5" />
      <div className="flex items-center gap-2 pt-2">
        <Skeleton className="h-6 w-6 rounded-full bg-black/5 dark:bg-white/5" />
        <Skeleton className="h-3 w-20 bg-black/5 dark:bg-white/5" />
      </div>
      <Skeleton className="h-px w-full bg-black/5 dark:bg-white/5" />
      <Skeleton className="h-5 w-16 bg-black/5 dark:bg-white/5" />
    </div>
  </div>
);
