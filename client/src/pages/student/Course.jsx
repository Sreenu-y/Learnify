import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheckIcon } from "lucide-react";
import React from "react";

const Course = () => {
  return (
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 pt-0  bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className="relative">
        <img
          src="https://miro.medium.com/v2/resize:fit:1358/1*a6km7w5LwfUnRg1uKzNyoA.png"
          alt="Next.JS Course"
          className="h-36 w-full object-cover rounded-t-lg"
        />
      </div>
      <CardContent className=" px-5">
        <h1 className="hover:underline font-bold text-lg truncate">
          Nextjs complete course in English
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 mt-1">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-medium text-sm">Jenny Nextjs</h1>
          </div>
          <Badge
            variant="secondary"
            className="bg-blue-500 text-white dark:bg-blue-600"
          >
            <BadgeCheckIcon />
            Verified
          </Badge>
        </div>
        <div className="text-lg font-bold mt-1">
          <span>$499</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Course;
