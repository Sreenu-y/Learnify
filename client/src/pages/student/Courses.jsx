import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Course from "./Course";
import { useGetPublishedCoursesQuery } from "@/features/api/courseApi";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetPublishedCoursesQuery();
  if (isError) <h1>Error occurred..</h1>;
  if (isError || !data || !data.courses)
    return (
      <div className="mt-10 font-bold text-xl ml-10">
        <Button variant="outline" onClick={() => navigate("/login")}>
          <h1>Login to explore courses...</h1>
        </Button>
      </div>
    );
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-3xl text-center mb-10">Our Courses</h2>
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <CourseSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data?.courses &&
              data?.courses?.map((course, idx) => (
                <Course key={idx} course={course} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      {/* Thumbnail */}
      <Skeleton className="w-full h-36" />

      {/* Content */}
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-5 w-3/4" /> {/* Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/4" /> {/* Price or CTA */}
      </div>
    </div>
  );
};
