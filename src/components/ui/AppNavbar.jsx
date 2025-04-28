"use client";

import React from "react";
import {
  Navbar,
  NavbarDivider,
  NavbarItem,
  NavbarSection,
} from "@/components/navbar";
import { Link } from "@/components/link";
import { usePathname } from "next/navigation";

const ROUTES = {
  root: "/",
  dashboard: "/dashboard",
  feed: "/feed",
  analytics: "/analytics",
};

const PRIMARY_LINKS = [
  {
    name: "Dashboard",
    path: ROUTES.dashboard,
    icon: null,
  },
  {
    name: "Feed",
    path: ROUTES.feed,
    icon: null,
  },
  {
    name: "Analytics",
    path: ROUTES.analytics,
    icon: null,
  },
];

const AppNavbar = () => {
  const pathname = usePathname();
  const isActive = (path) => pathname.includes(path);

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
    </Navbar>
  );
};

export default AppNavbar;
