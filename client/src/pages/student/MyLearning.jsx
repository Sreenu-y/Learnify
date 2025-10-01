import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Course from "./Course";

const MyLearning = () => {
  const isLoading = false;
  const myLearningCourses = [];
  return (
    <div className="max-w-4xl mx-auto my-24 px-4 md:px-0">
      <h1 className="font-bold text-2xl">My Learnings</h1>
      <div className="my-5">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : myLearningCourses.length === 0 ? (
          <div>No courses are found</div>
        ) : (
          <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {myLearningCourses.map((course, index) => (
              <Course key={index} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;

const MyLearningSkeleton = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {/* Repeat skeleton cards */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-md p-4">
          {/* Thumbnail */}
          <Skeleton className="h-36 w-full rounded-md mb-4" />

          {/* Title */}
          <Skeleton className="h-5 w-3/4 mb-2" />

          {/* Subtitle */}
          <Skeleton className="h-4 w-1/2 mb-4" />

          {/* Progress bar */}
          <Skeleton className="h-3 w-full rounded-md" />
        </div>
      ))}
    </div>
  );
};
