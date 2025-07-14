"use client";

import { Link } from "@/components/link";
import {
  Navbar,
  NavbarDivider,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
} from "@/components/navbar";
import { PowerIcon } from "@heroicons/react/16/solid";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../button";

export const ROUTES = {
  root: "/",
  dashboard: "/",
  feeds: "/feeds",
  analytics: "/analytics",
  settings: "/settings",
};

const PRIMARY_LINKS = [
  {
    name: "Dashboard",
    path: ROUTES.dashboard,
    icon: null,
  },
  {
    name: "Analytics",
    path: ROUTES.analytics,
    icon: null,
  },
  {
    name: "Feeds",
    path: ROUTES.feeds,
    icon: null,
  },
  {
    name: "Settings",
    path: ROUTES.settings,
    icon: null,
  },
];

const AppNavbar = () => {
  const pathname = usePathname();
  const isActive = (path) => pathname.includes(path);

  const [isElectron, setIsElectron] = useState(false);
  const [appVersion, setAppVersion] = useState("Unknown");

  const handleClose = () => {
    window.electron.closeApp();
  };

  useEffect(() => {
    // Check if we're running in Electron
    const isRunningInElectron = window.electron !== undefined;
    setIsElectron(isRunningInElectron);

    // Get app version from Electron if available
    if (isRunningInElectron) {
      try {
        const version = window.electron.getAppVersion();
        setAppVersion(version);
      } catch (error) {
        console.error("Error getting app version:", error);
      }
    }

    // Prevent right-click context menu for security
    document.addEventListener("contextmenu", (e) => e.preventDefault());

    // Block devtools keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      // Block F12, Ctrl+Shift+I, Ctrl+Shift+J
      if (
        e.key === "F12" ||
        (e.ctrlKey &&
          e.shiftKey &&
          (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j"))
      ) {
        e.preventDefault();
      }
    });

    // Return cleanup function
    return () => {
      document.removeEventListener("contextmenu", (e) => e.preventDefault());
      document.removeEventListener("keydown", (e) => e.preventDefault());
    };
  }, []);

  return (
    <Navbar className="max-w-7xl mx-auto">
      <Link href={ROUTES.dashboard} aria-label="Home">
        <b>QAnalytics</b>
      </Link>
      <NavbarDivider className="max-lg:hidden" />
      <NavbarSection className="max-lg:hidden">
        {PRIMARY_LINKS.map((i) => (
          <NavbarItem key={i.path} href={i.path} current={isActive(i.path)}>
            {i.name}
          </NavbarItem>
        ))}
      </NavbarSection>
      <NavbarSpacer />
      <NavbarSection>
        <Button plain onClick={handleClose}>
          <PowerIcon />
          Exit
        </Button>
      </NavbarSection>
    </Navbar>
  );
};

export default AppNavbar;
