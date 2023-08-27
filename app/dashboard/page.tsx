import HistoryCard from "@/components/dashboard/HistoryCard";
import QuizmeCard from "@/components/dashboard/QuizmeCard";
import { getAuthSession } from "@/lib/nextauth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";
import HotTopicCard from "./HotTopicCard";
import RecentActivities from "./RecentActivities";

export const metadata: Metadata = {
  title: "Phay Kyi | Dashboard",
  description: "Test your knowledge",
};

const Dashboard = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }

  return (
    <main className=" p-8 mx-auto max-w-7xl">
      <div className=" flex items-center">
        <h2 className=" font-bold text-3xl mr-2 tracking-tighter">Dashboard</h2>
      </div>

      <div className=" grid gap-4 mt-4 md:grid-cols-2">
        <QuizmeCard />
        <HistoryCard />
      </div>

      <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">
        <HotTopicCard />
        <RecentActivities />
      </div>
    </main>
  );
};

export default Dashboard;
