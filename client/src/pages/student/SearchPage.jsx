import { useState } from "react";
import Filter from "./Filter";
import SearchResult from "./SearchResult";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useGetSearchCourseQuery } from "@/features/api/courseApi";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const { data, isLoading } = useGetSearchCourseQuery({
    searchQuery: query,
    categories: selectedCategories,
    searchByPrice: sortByPrice,
  });

  const changeFilterHandler = (categories, price) => {
    setSelectedCategories(categories);
    setSortByPrice(price);
  };

  const isEmpty = !isLoading && data?.courses?.length === 0;

  return (
    <div className="min-h-screen bg-[var(--background)] pt-20">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="mb-8">
          <h1 className="font-bold text-2xl text-black dark:text-white mb-1">
            Results for "{query}"
          </h1>
          <p className="text-sm text-black/45 dark:text-white/35">
            Showing results for{" "}
            <span className="font-semibold text-black dark:text-white italic">
              {query}
            </span>
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-black/[0.08] dark:bg-white/[0.08] mb-8" />

        <div className="flex flex-col md:flex-row gap-10">
          <Filter changeFilterHandler={changeFilterHandler} />
          <div className="flex-1">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, idx) => (
                <CourseSkeleton key={idx} />
              ))
            ) : isEmpty ? (
              <CourseNotFound />
            ) : (
              data?.courses?.map((course) => (
                <SearchResult key={course._id} course={course} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

const CourseSkeleton = () => (
  <div className="flex flex-col md:flex-row gap-4 border-b border-black/[0.07] dark:border-white/[0.07] py-5 animate-pulse">
    <Skeleton className="h-32 w-full md:w-56 rounded-xl bg-black/5 dark:bg-white/5" />
    <div className="flex flex-col gap-2 flex-1">
      <Skeleton className="h-5 w-3/4 bg-black/5 dark:bg-white/5" />
      <Skeleton className="h-4 w-1/2 bg-black/5 dark:bg-white/5" />
      <Skeleton className="h-4 w-1/3 bg-black/5 dark:bg-white/5" />
      <Skeleton className="h-6 w-16 mt-2 bg-black/5 dark:bg-white/5" />
    </div>
    <Skeleton className="h-6 w-16 bg-black/5 dark:bg-white/5 self-start md:self-end" />
  </div>
);

const CourseNotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-64 p-8 rounded-2xl border border-black/[0.07] dark:border-white/[0.07] bg-black/[0.02] dark:bg-white/[0.02]">
    <AlertCircle className="text-black/25 dark:text-white/25 h-14 w-14 mb-4" />
    <h2 className="font-bold text-2xl text-black dark:text-white mb-2">
      No courses found
    </h2>
    <p className="text-sm text-black/40 dark:text-white/35 mb-6 text-center">
      Sorry, we couldn't find any courses matching your search.
    </p>
    <Link to="/">
      <Button className="btn-glow rounded-xl px-6">Browse All Courses</Button>
    </Link>
  </div>
);
