import { Button } from "@/components/ui/button";
import React from "react";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-gray-900 py-16 px-4  text-center">
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <h1 className="text-white text-4xl font-bold my-4">
          Find the Best Courses for You
        </h1>
        <p className="text-gray-200 dark:text-gray-400 mb-8">
          Discover, Learn and Upskill with our wide range of courses
        </p>

        {/* Search Bar */}
        <form className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto h-12">
          <input
            type="text"
            placeholder="Search for courses..."
            className=" h-full flex-grow bg-transparent border-none focus:outline-none focus:ring-0 px-6 text-gray-900 dark:text-gray-100"
          />
          <Button
            type="submit"
            className="h-full rounded-none rounded-r-full bg-blue-600 dark:bg-blue-700 text-white px-6 hover:bg-blue-700 dark:hover:bg-blue-800 "
          >
            Search
          </Button>
        </form>
        <Button className="h-12 bg-white dark:bg-gray-800 text-blue-600 rounded-full mt-6   hover:bg-gray-300 ">
          Explore Courses
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
