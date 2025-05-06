"use client";

import { Heading } from "@/components/heading";
import { ROUTES } from "@/components/ui/AppNavbar";
import { snakeToWords } from "@/utils/utils";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { CASE_FIELDS } from "./analytics/page";
import { Stat } from "./stat";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push(ROUTES.dashboard);
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
