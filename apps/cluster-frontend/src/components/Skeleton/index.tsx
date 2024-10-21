import { cn } from "@/utils/tailwindMerge";
import { FC, HTMLAttributes } from "react";

export type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export const Skeleton: FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn("h-2.5 animate-pulse bg-gray-200/10 rounded", className)}
      {...props}
    />
  );
};
