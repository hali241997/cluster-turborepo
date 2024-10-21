import { cn } from "@/utils/tailwindMerge";
import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: "default" | "ghost";
}

export const Button: FC<ButtonProps> = ({ variant = "default", ...props }) => {
  return (
    <button
      className={cn({
        "bg-[#007ACC] py-[6px] px-4 rounded shadow-[0px_1px_0px_0px_rgba(255,255,255,0.25)]":
          variant === "default",
        "py-[6px] px-4 text-[#0298FF]": variant === "ghost",
      })}
      {...props}
    />
  );
};
