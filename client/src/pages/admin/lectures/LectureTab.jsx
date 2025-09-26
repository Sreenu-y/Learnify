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
import { useEditLectureMutation } from "@/features/api/courseApi";
import axios from "axios";
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
          <Button variant="destructive">Remove Lecture</Button>
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
          <Switch id="video" />
          <Label htmlFor="video">Is this Video free</Label>
        </div>
        {mediaProgress && (
          <div className="my-4">
            <Progress value={uploadProgress} />
            <p>{uploadProgress} uploaded</p>
          </div>
        )}
        <div className="mt-4">
          <Button className="bg-gray-700" onClick={lectureUpdateHandler}>
            Update Lecture
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
