import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  useGetCourseProgressQuery,
  useMarkAsCompletedMutation,
  useMarkAsInCompletedMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import { CheckCircle, CheckCircle2, CirclePlay, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseProgress = () => {
  const { courseId } = useParams();
  const { data, isLoading, isError, refetch } =
    useGetCourseProgressQuery(courseId);
  const [
    markAsCompleted,
    { data: completedData, isSuccess: completedSuccess },
  ] = useMarkAsCompletedMutation();
  const [
    markAsInCompleted,
    { data: inCompletedData, isSuccess: inCompletedSuccess },
  ] = useMarkAsInCompletedMutation();
  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [currentLecture, setCurrentLecture] = useState(null);

  useEffect(() => {
    if (completedSuccess) {
      refetch();
      toast.success(completedData?.message || "Course marked as completed ✅");
    } else if (inCompletedSuccess) {
      refetch();
      toast.success(
        inCompletedData?.message || "Course marked as incompleted ❌",
      );
    }
  }, [completedSuccess, inCompletedSuccess]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--background)]">
        <Loader2 className="animate-spin h-8 w-8 text-black/30 dark:text-white/30" />
      </div>
    );
  if (isError)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--background)]">
        <p className="text-red-500">Error loading course progress.</p>
      </div>
    );

  const { courseDetails, progress, completed } = data.data;
  const { courseTitle } = courseDetails;
  const initialLecture = currentLecture || courseDetails?.lectures?.[0];

  const isLectureCompleted = (id) =>
    progress.some((p) => p.lectureId === id && p.viewed);

  const lectureProgressHandler = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-black dark:text-white">
            {courseTitle}
          </h1>
          <Button
            variant={completed ? "outline" : "default"}
            className={
              completed
                ? "border-black/20 dark:border-white/20 text-black dark:text-white"
                : "btn-glow"
            }
            onClick={() =>
              completed
                ? markAsInCompleted({ courseId })
                : markAsCompleted({ courseId })
            }
          >
            {completed ? (
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" /> Completed
              </span>
            ) : (
              "Mark as Completed"
            )}
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Video player */}
          <div className="flex-1 md:w-3/5 bg-white dark:bg-[#101010] border border-black/[0.07] dark:border-white/[0.07] rounded-2xl overflow-hidden shadow-sm">
            <video
              src={
                currentLecture?.videoUrl ||
                initialLecture?.videoUrl ||
                "https://www.w3schools.com/html/mov_bbb.mp4"
              }
              controls
              className="w-full aspect-video object-cover"
              onPlay={() =>
                lectureProgressHandler(
                  currentLecture?._id || initialLecture._id,
                )
              }
            />
            <div className="p-4 border-t border-black/[0.06] dark:border-white/[0.06]">
              <h3 className="font-semibold text-black dark:text-white">
                {`Lecture ${
                  courseDetails.lectures.findIndex(
                    (lec) =>
                      lec._id === (currentLecture?._id || initialLecture._id),
                  ) + 1
                }: ${currentLecture?.lectureTitle || initialLecture?.lectureTitle}`}
              </h3>
            </div>
          </div>

          {/* Lecture sidebar */}
          <div className="w-full md:w-2/5 flex flex-col gap-3">
            <h2 className="font-bold text-lg text-black dark:text-white px-1">
              Lectures
            </h2>
            <div className="flex flex-col gap-2 max-h-[520px] overflow-y-auto pr-1">
              {courseDetails?.lectures.map((lecture) => {
                const isActive =
                  lecture._id === (currentLecture?._id || initialLecture?._id);
                const isDone = isLectureCompleted(lecture._id);
                return (
                  <div
                    key={lecture._id}
                    onClick={() => setCurrentLecture(lecture)}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all
                      ${
                        isActive
                          ? "bg-black dark:bg-white border-transparent"
                          : "bg-white dark:bg-[#101010] border-black/[0.07] dark:border-white/[0.07] hover:border-black/20 dark:hover:border-white/20"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      {isDone ? (
                        <CheckCircle2
                          size={20}
                          className={
                            isActive
                              ? "text-white dark:text-black"
                              : "text-green-500"
                          }
                        />
                      ) : (
                        <CirclePlay
                          size={20}
                          className={
                            isActive
                              ? "text-white/70 dark:text-black/60"
                              : "text-black/30 dark:text-white/30"
                          }
                        />
                      )}
                      <span
                        className={`text-sm font-medium ${isActive ? "text-white dark:text-black" : "text-black dark:text-white"}`}
                      >
                        {lecture.lectureTitle}
                      </span>
                    </div>
                    {isDone && (
                      <Badge
                        className={`text-xs ${isActive ? "bg-white/20 dark:bg-black/20 text-white dark:text-black border-0" : "bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400 border-0"}`}
                      >
                        Done
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
