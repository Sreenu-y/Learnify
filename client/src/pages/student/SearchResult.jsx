import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const SearchResult = ({ course }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-black/[0.07] dark:border-white/[0.07] py-5 gap-4 group">
      <Link
        to={`/course-details/${course?._id}`}
        className="flex flex-col md:flex-row gap-4 w-full md:w-auto"
      >
        <img
          src={
            course?.courseThumbnail ||
            "https://tse2.mm.bing.net/th/id/OIP.mdLT2ZK_3OlDwK2R-Q2UlQHaGp?pid=Api&P=0&h=180"
          }
          alt="Course Thumbnail"
          className="h-32 w-full md:w-56 object-cover rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <div className="flex flex-col gap-1.5">
          <h2 className="font-bold text-lg text-black dark:text-white group-hover:underline underline-offset-2">
            {course?.courseTitle}
          </h2>
          <p className="text-sm text-black/45 dark:text-white/35">
            {course?.subTitle}
          </p>
          <p className="text-sm text-black/50 dark:text-white/40">
            Instructor:{" "}
            <span className="font-semibold text-black dark:text-white">
              {course?.creator?.name}
            </span>
          </p>
          <Badge className="w-fit mt-1 bg-black/8 dark:bg-white/8 text-black dark:text-white border-black/10 dark:border-white/10">
            {course?.courseLevel}
          </Badge>
        </div>
      </Link>
      <div className="md:text-right shrink-0">
        <p className="font-black text-xl text-black dark:text-white">
          ₹{course.coursePrice}
        </p>
      </div>
    </div>
  );
};

export default SearchResult;
