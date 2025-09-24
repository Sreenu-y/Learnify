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
import React from "react";

const CourseTab = () => {
  const isPublished = true;
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your course. Click save when you're done.
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button variant="outline">
            {isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Button>Remove Course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div className="space-y-1">
            <Label>Title</Label>
            <Input type="text" name="courseTitle" placeholder="Eg. Docker" />
          </div>
          <div className="space-y-1">
            <Label>Subtitle</Label>
            <Input
              type="text"
              name="courseTitle"
              placeholder="Eg. Become a FullStack Developer from zero to hero in 2 months"
            />
          </div>
          <div className="space-y-1">
            <Label>Description</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
