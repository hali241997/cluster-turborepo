import { cn } from "@/utils/tailwindMerge";
import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";

export interface TextFieldProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  containerClassName?: string;
  error?: string;
}

export const TextField: FC<TextFieldProps> = ({
  id,
  label,
  containerClassName,
  className,
  error,
  type = "text",
  ...props
}) => {
  return (
    <div className={cn("flex flex-col gap-2", containerClassName)}>
      {label && (
        <label htmlFor={id} className="font-normal text-lg text-whiteSecondary">
          {label}
        </label>
      )}

      <div className="flex flex-col">
        <input
          id={id}
          name={id}
          type={type}
          className={cn(
            "bg-[#424B5380] border-[#424B53] border-[1px] px-2 py-[6px] text-whiteSecondary text-h2 rounded focus-visible:outline-none",
            error && "text-red-500 border-red-500",
            className
          )}
          {...props}
        />
        {Boolean(error) && <span className="mt-2 text-red-500">{error}</span>}
      </div>
    </div>
  );
};
