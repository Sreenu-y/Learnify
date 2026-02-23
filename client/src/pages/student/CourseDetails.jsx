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
import {
  useGetCourseDetailsWithStatusQuery,
  useVerifyPaymentQuery,
} from "@/features/api/purchaseApi";
import { BadgeInfo, Loader2, Lock, PlayCircle } from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";

const CourseDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { courseId } = params;
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  // Only run when Stripe redirects back with a session_id
  const {
    data: verifyData,
    isSuccess: verifySuccess,
    isError: verifyError,
  } = useVerifyPaymentQuery(sessionId, { skip: !sessionId });

  const { data, isError, isLoading, refetch } =
    useGetCourseDetailsWithStatusQuery(courseId);

  // After verification, refetch purchase status and clean up the URL
  useEffect(() => {
    if (verifySuccess) {
      toast.success("Payment verified! Course unlocked.");
      refetch();
      // Remove session_id from URL without reloading
      navigate(`/course-details/${courseId}`, { replace: true });
    }
    if (verifyError) {
      toast.error("Payment verification failed. Please contact support.");
    }
  }, [verifySuccess, verifyError]);

  if (isLoading)
    return <Loader2 className="w-24 h-24 animate-spin mt-84 ml-160" />;
  if (isError) return <h1>Failed to load course details</h1>;

  const { course, purchased } = data;

  const continueCourseHandler = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  return (
    <div className="mt-20 space-y-5">
      <div className="bg-black dark:bg-[#111] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">
            {course?.courseTitle}
          </h1>
          <p className="text-base md:text-lg text-white/70">
            {course?.subTitle}
          </p>
          <p className="text-white/60">
            Created by{" "}
            <span className="text-white underline italic font-medium">
              {course?.creator.name}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm text-white/50">
            <BadgeInfo size={16} />
            <p>Last updated: {course?.createdAt.split("T")[0]}</p>
          </div>
          <p className="text-white/50">
            Students enrolled: {course?.enrolledStudents.length}
          </p>
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
                {course?.lectures.length} Lectures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {course?.lectures.map((lecture, idx) => {
                return (
                  <div key={idx} className="flex items-center text-sm gap-5">
                    <span>
                      {lecture.isPreviewFree ? (
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
                  src={course?.lectures[0]?.videoUrl}
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
