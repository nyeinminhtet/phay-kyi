import CustomWordClouds from "@/components/CustomWordClouds";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/db";
import React from "react";

const HotTopicCard = async () => {
  const topics = await prisma.topic_count.findMany({});
  const formattedTopics = topics.map((topic) => {
    return {
      text: topic.topic,
      value: topic.count,
    };
  });

  return (
    <Card className=" col-span-4">
      <CardHeader>
        <CardTitle className=" text-2xl font-bold">Hot Topics</CardTitle>
        <CardDescription>
          Click on a topic to start a quiz on it!
        </CardDescription>
      </CardHeader>

      <CardContent className="pl-2">
        <CustomWordClouds formattedTopics={formattedTopics} />
      </CardContent>
    </Card>
  );
};

export default HotTopicCard;
