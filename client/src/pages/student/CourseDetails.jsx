import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailsWithStatusQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player";

const CourseDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { courseId } = params;

  const { data, isError, isLoading } =
    useGetCourseDetailsWithStatusQuery(courseId);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Failed to load course details</h1>;

  const { course, purchased } = data;

  const continueCourseHandler = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  console.log(course.lectures[0].videoUrl);
  return (
    <div className="mt-20 space-y-5">
      <div className="bg-[#2d2f31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">
            {course?.courseTitle}
          </h1>
          <p className="text-base md:text-lg">{course?.subTitle}</p>
          <p>
            Created by{" "}
            <span className="text-[#c0c4fc] underline italic">
              {course?.creator.name}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated: {course?.createdAt.split("T")[0]}</p>
          </div>
          <p>Students enrolled: {course?.enrolledStudents.length}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-2">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p className="text-sm">{course?.description}</p>
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>
                {course.lectures.length} Lectures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {course.lectures.map((lecture, idx) => {
                return (
                  <div key={idx} className="flex items-center text-sm gap-5">
                    <span>
                      {true ? (
                        <>
                          <PlayCircle size={20} />
                        </>
                      ) : (
                        <Lock size={20} />
                      )}
                    </span>
                    <p>{lecture.lectureTitle}</p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="w-full h-[200px]">
                <video
                  src={course.lectures[0]?.videoUrl}
                  className="w-full h-[200px] rounded"
                  controls
                />
              </div>
              <h1 className="pt-4 text-xl">{course?.courseTitle}</h1>
              <Separator className="my-4" />
              <h1 className="text-lg md:text-xl font-semibold">
                Rs.{course?.coursePrice}₹
              </h1>
            </CardContent>
            <CardFooter>
              {purchased ? (
                <Button className="w-full" onClick={continueCourseHandler}>
                  Continue
                </Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
