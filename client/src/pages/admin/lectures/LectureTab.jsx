import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  useEditLectureMutation,
  useGetLectureByIdQuery,
  useRemoveLectureMutation,
} from "@/features/api/courseApi";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const MEDIA_API = "http://localhost:8080/api/v1/media";

const LectureTab = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [buttonDisable, setButtonDisable] = useState(true);
  const params = useParams();
  const { courseId, lectureId } = params;

  const [editLecture, { data, isError, isLoading, isSuccess, error }] =
    useEditLectureMutation();

  const [
    removeLecture,
    {
      data: removeLectureData,
      isLoading: removeLectureIsLoading,
      isSuccess: removeLectureIsSuccess,
      isError: removeLectureIsError,
      error: removeLectureError,
    },
  ] = useRemoveLectureMutation();

  const { data: getLectureByIdData } = useGetLectureByIdQuery(lectureId);

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });
        if (res.data.success) {
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          setButtonDisable(false);
          toast.success(res?.data?.message);
        }
      } catch (error) {
        toast.error("video upload failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Updated successfully");
      navigate(`/admin/course/${courseId}/lecture`);
    }
    if (isError) {
      toast.error(error?.data?.message || "failed to update");
    }
  }, [data, isSuccess, isError]);

  useEffect(() => {
    if (removeLectureIsSuccess) {
      toast.success(
        removeLectureData.message || "Lecture removed successfully"
      );
      navigate(`/admin/course/${courseId}/lecture`);
    }
    if (removeLectureIsError) {
      toast.error(removeLectureError?.data?.message || "Failed to remove");
    }
  }, [removeLectureData, removeLectureIsSuccess, removeLectureIsError]);

  useEffect(() => {
    console.log("Fetched lecture:", getLectureByIdData);
    if (getLectureByIdData) {
      setLectureTitle(getLectureByIdData.lecture.lectureTitle);
      setIsFree(getLectureByIdData.lecture.isPreviewFree);
    }
  }, [getLectureByIdData]);

  const removeLectureHandler = async () => {
    await removeLecture(lectureId);
  };

  const lectureUpdateHandler = async () => {
    await editLecture({
      lectureTitle,
      videoInfo: uploadVideoInfo,
      isPreviewFree: isFree,
      courseId,
      lectureId,
    });
  };

  return (
    <Card>
      <CardHeader className="flex justify-between flex-col">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make changes and click save when you're done.
          </CardDescription>
        </div>
        <div>
          <Button
            variant="destructive"
            disabled={removeLectureIsLoading}
            onClick={removeLectureHandler}
          >
            {removeLectureIsLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </>
            ) : (
              "Remove Lecture"
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label>Lecture Title</Label>
          <Input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Ex. Introduction"
          />
        </div>
        <div className="space-y-2">
          <Label>
            Video <span className="text-red-600">*</span>
          </Label>
          <Input
            type="file"
            onChange={fileChangeHandler}
            accept="video/*"
            placeholder="Ex. Introduction"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="video" checked={isFree} onCheckedChange={setIsFree} />
          <Label htmlFor="video">Is this Video free</Label>
        </div>
        {mediaProgress && (
          <div className="my-4">
            <Progress value={uploadProgress} />
            <p>{uploadProgress} uploaded</p>
          </div>
        )}
        <div className="mt-4">
          <Button
            className="bg-gray-700"
            onClick={lectureUpdateHandler}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </>
            ) : (
              "Update Lecture"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
