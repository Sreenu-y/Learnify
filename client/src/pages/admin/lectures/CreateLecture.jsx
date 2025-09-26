import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.courseId;
  const [lectureTitle, setLectureTitle] = useState("");

  const [createLecture, { data, isLoading, isSuccess, error, isError }] =
    useCreateLectureMutation();

  const {
    data: lectureData,
    isLoading: lectureIsLoading,
    isError: lectureIsError,
  } = useGetCourseLectureQuery(courseId);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Lecture created successfully");
    }
    if (isError) {
      toast.error(error?.data?.message || "Failed to create");
    }
  }, [isSuccess, isError]);
  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
  };

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Let's add lectures, add some basic details for your new lecture
        </h1>
        <p className="text-sm">
          Fill in the lecture information to make it ready for your students.
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            className="mt-2"
            placeholder="Your Course Name"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/course/${courseId}`)}
          >
            Back to course
          </Button>
          <Button disabled={isLoading} onClick={createLectureHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-1 h-4 w-4 animate-spin" /> Creating
              </>
            ) : (
              "Create Lecture"
            )}
          </Button>
        </div>
        <div className="mt-10">
          {lectureIsLoading ? (
            <h1>Loading...</h1>
          ) : lectureIsError ? (
            <h1>Failed to load lectures</h1>
          ) : lectureData.lectures.length === 0 ? (
            <h1>No Lectures found</h1>
          ) : (
            lectureData.lectures.map((lecture, index) => {
              return (
                <Lecture
                  lecture={lecture}
                  key={lecture._id}
                  courseId={courseId}
                  index={index}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
