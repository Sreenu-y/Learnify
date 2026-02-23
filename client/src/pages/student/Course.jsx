import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BadgeCheckIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Course = ({ course }) => {
  return (
    <Link to={`/course-details/${course?._id}`} className="group block h-full">
      <div className="glass-card overflow-hidden rounded-2xl h-full flex flex-col">
        {/* Thumbnail */}
        <div className="relative overflow-hidden rounded-t-2xl">
          <img
            src={course?.courseThumbnail}
            alt={course?.courseTitle}
            className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Dark gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {/* Level chip */}
          <div className="absolute top-3 right-3 tag-chip backdrop-blur-sm">
            <BadgeCheckIcon size={10} />
            {course?.courseLevel}
          </div>
        </div>

        {/* Body */}
        <div className="p-4 flex flex-col flex-1 gap-3">
          <h3 className="font-semibold text-sm text-black/85 dark:text-white/85 line-clamp-2 leading-snug group-hover:text-black dark:group-hover:text-white transition-colors">
            {course?.courseTitle}
          </h3>

          {/* Creator */}
          <div className="flex items-center gap-2 mt-auto">
            <Avatar className="h-6 w-6 ring-1 ring-black/10 dark:ring-white/10">
              <AvatarImage
                src={
                  course?.creator?.photoUrl || "https://github.com/shadcn.png"
                }
              />
              <AvatarFallback className="bg-black/10 dark:bg-white/10 text-black dark:text-white text-[10px]">
                {course?.creator?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-black/40 dark:text-white/35">
              {course?.creator?.name}
            </span>
          </div>

          {/* Price row */}
          <div className="flex items-center justify-between pt-3 border-t border-black/[0.06] dark:border-white/[0.06]">
            <span className="text-lg font-black text-black dark:text-white">
              ₹{course?.coursePrice?.toLocaleString()}
            </span>
            <span className="text-xs text-black/30 dark:text-white/30 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              View →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Course;
