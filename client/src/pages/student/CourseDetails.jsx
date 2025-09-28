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
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";

const CourseDetails = () => {
  const isCoursePurchased = true;
  return (
    <div className="mt-20 space-y-5">
      <div className="bg-[#2d2f31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">Course Title</h1>
          <p className="text-base md:text-lg">Course Sub-Title</p>
          <p>
            Created by{" "}
            <span className="text-[#c0c4fc] underline italic">Sreenu</span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated 27-11-2025</p>
          </div>
          <p>Students enrolled: 10</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-2">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
            repellat quos reiciendis dolore itaque velit corporis aliquid
            voluptatibus sint, nisi, modi est eveniet quae quaerat, iusto
            temporibus. Tempora perferendis hic fugiat harum rerum odio expedita
            placeat est debitis? Voluptates reiciendis, corporis doloribus a,
            ipsa iste explicabo iure harum, corrupti quasi quod? Nemo facilis
            consectetur delectus incidunt sunt quisquam nihil id facere soluta
            eius ut a quidem fuga nostrum, eveniet eum?
          </p>
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>4 Lectures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3].map((Lecture, idx) => {
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
                    <p>Lecture Title</p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4">Video</div>
              <h1>Lecture Title</h1>
              <Separator className="my-4" />
              <h1 className="text-lg md:text-xl font-semibold">Course Price</h1>
            </CardContent>
            <CardFooter>
              {isCoursePurchased ? (
                <Button className="w-full">Continue</Button>
              ) : (
                <BuyCourseButton />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
