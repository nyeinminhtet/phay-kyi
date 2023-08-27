"use client";

import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React from "react";
import D3WordCloud from "react-d3-cloud";

type Props = {
  formattedTopics: { text: string; value: number }[];
};

const CustomWordClouds = ({ formattedTopics }: Props) => {
  const theme = useTheme();
  const router = useRouter();
  return (
    <>
      <D3WordCloud
        data={formattedTopics}
        font="Times"
        height={550}
        rotate={0}
        fontSize={(word) => Math.log2(word.value) * 5}
        fill={theme.theme === "dark" ? "white" : "black"}
        onWordClick={(e, w) => router.push(`/quiz?topic=${w.text}`)}
      />
    </>
  );
};

export default CustomWordClouds;
