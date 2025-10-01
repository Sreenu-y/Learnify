import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CheckCircle2, CirclePlay } from "lucide-react";
import React from "react";

const CourseProgress = () => {
  const isCompleted = true;
  return (
    <div className="max-w-7xl mx-auto p-4 mt-20">
      {/* Display course name */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Course Title</h1>
        <Button>Completed</Button>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        {/* video section */}
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          <div>
            {/* video */}
            <video
              //   src={course.lectures[0]?.videoUrl}
              className="w-full h-[400px] rounded"
              controls
            />
          </div>
          <div className="mt-3">
            {/* display current watching lecture */}
            <h3 className="">lecture 1 : Introduction</h3>
          </div>
        </div>
        {/* Lecture sidebar */}
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-4">
          <h2 className="font-semibold text-xl mb-4">Course lecture</h2>
          <div className="flex-1 overflow-y-auto">
            {[1, 2, 3, 4].map((lecture, idx) => (
              <Card
                key={idx}
                className="mb-3 hover:cursor-pointer transition transform p-0"
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    {!isCompleted ? (
                      <CheckCircle2 size={24} className="text-green-500 mr-2" />
                    ) : (
                      <CirclePlay size={24} className="text-gray-500 mr-2" />
                    )}
                    <CardTitle className="font-medium text-lg">
                      Introduction
                    </CardTitle>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-green-600 bg-green-200"
                  >
                    Completed
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
