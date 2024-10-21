"use client";

import Routes from "@/config/routes";
import { cn } from "@/utils/tailwindMerge";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

const appRoutes = [
  {
    key: "metrics",
    value: "Performance Metrics",
    href: Routes.home,
  },
  {
    key: "policy",
    value: "Edit Snapshot Policy",
    href: Routes.policy,
  },
];

// Used inside Drawer/index.tsx to display routes
export const AppRoutes: FC = () => {
  const pathname = usePathname();

  return (
    <div className="pl-3">
      <div className="flex flex-col space-y-1">
        {appRoutes.map((route) => {
          return (
            <Link key={route.key} href={route.href}>
              <div
                className={cn(
                  "flex items-center py-1",
                  route.href === pathname &&
                    "bg-[#13181E] border-r-2 border-r-bluePrimary"
                )}
              >
                <div className="w-1 h-1 rounded-full bg-white mx-2" />
                <div className="text-white leading-6">{route.value}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
