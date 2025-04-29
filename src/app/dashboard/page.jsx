"use client";

import { Subheading } from "@/components/heading";
import { useEffect } from "react";
import { Stat } from "@/app/stat";

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
        <Subheading>Overview</Subheading>
        <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-5">
          <Stat title="Total revenue" value="$2.6M" change="+4.5%" />
          <Stat title="Average order value" value="$455" change="-0.5%" />
          <Stat title="Tickets sold" value="5,888" change="+4.5%" />
          <Stat title="Pageviews" value="823,067" change="+21.2%" />
          <Stat title="Pageviews" value="823,067" change="+21.2%" />
        </div>
      </div>
    </>
  );
}
