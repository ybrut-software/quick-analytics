"use client";

import { Heading } from "@/components/heading";
import { useEffect } from "react";
import { Stat } from "./stat";
import { CASE_FIELDS } from "./analytics/page";

export default function Home() {
  useEffect(() => {
    // Send a message to Electron Main
    window.electron?.sendMessage("Hello from Renderer!");

    // Listen for message from Main
    window.electron?.onMessage((message) => {
      console.log("Received from Main:", message);
    });
  }, []);
  return (
    <>
      <div className="max-w-7xl mx-auto min-h-screen">
        <Heading>Overview</Heading>
        <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-5">
          {CASE_FIELDS.map((i) => {
            return (
              <Stat title={snakeToWords(i.label)} value={i.value} change="0" />
            );
          })}
        </div>
      </div>
    </>
  );
}
