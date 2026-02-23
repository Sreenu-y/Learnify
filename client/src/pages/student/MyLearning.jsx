import { Skeleton } from "@/components/ui/skeleton";
import Course from "./Course";
import { useLoadUserQuery } from "@/features/api/authApi";
import { BookOpen } from "lucide-react";

const MyLearning = () => {
  const { data, isLoading } = useLoadUserQuery();

  return (
    <div className="min-h-screen bg-[var(--background)] pt-20 pb-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="font-bold text-2xl text-black dark:text-white flex items-center gap-2">
            <BookOpen size={22} className="text-black/40 dark:text-white/40" />
            My Learnings
          </h1>
          <p className="text-sm text-black/35 dark:text-white/30 mt-1">
            All courses you're currently enrolled in
          </p>
        </div>

        <div className="h-px bg-black/[0.07] dark:bg-white/[0.07] mb-8" />

        {isLoading ? (
          <MyLearningSkeleton />
        ) : data?.user?.enrolledCourses?.length === 0 ? (
          <div className="glass-card p-12 flex flex-col items-center gap-3 text-center">
            <BookOpen size={40} className="text-black/20 dark:text-white/15" />
            <h2 className="font-semibold text-black dark:text-white">
              No courses yet
            </h2>
            <p className="text-sm text-black/35 dark:text-white/30">
              Start learning by enrolling in a course.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data?.user?.enrolledCourses?.map((course) => (
              <Course key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;

const MyLearningSkeleton = () => (
  <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
    {Array.from({ length: 6 }).map((_, i) => (
      <div
        key={i}
        className="glass-card overflow-hidden rounded-2xl animate-pulse"
      >
        <Skeleton className="h-36 w-full rounded-none bg-black/5 dark:bg-white/5" />
        <div className="p-4 space-y-3">
          <Skeleton className="h-4 w-3/4 bg-black/5 dark:bg-white/5" />
          <Skeleton className="h-3 w-1/2 bg-black/5 dark:bg-white/5" />
          <Skeleton className="h-3 w-full bg-black/5 dark:bg-white/5 rounded-full" />
        </div>
      </div>
    ))}
  </div>
);
