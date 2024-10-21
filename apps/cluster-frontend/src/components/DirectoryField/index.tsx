import { cn } from "@/utils/tailwindMerge";
import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";

export interface DirectoryFieldProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  containerClassName?: string;
  error?: string;
}

export const DirectoryField: FC<DirectoryFieldProps> = ({
  id,
  label,
  containerClassName,
  error,
  ...props
}) => {
  return (
    <div className={cn("flex flex-col gap-2", containerClassName)}>
      {label && (
        <label htmlFor={id} className="font-normal text-lg text-whiteSecondary">
          {label}
        </label>
      )}

      <div className="flex">
        <div className="border-[1px] border-[#424B53] w-10 flex items-center justify-center rounded-tl rounded-bl text-h2 text-[#F3F4F4]">
          /
        </div>

        <div className="flex flex-col w-full">
          <input
            id={id}
            name={id}
            className={cn(
              "bg-[#424B5380] w-full border-[#424B53] border-[1px] px-2 py-[6px] text-whiteSecondary text-h2 rounded rounded-tl-none rounded-bl-none focus-visible:outline-none",
              error && "text-red-500 border-red-500"
            )}
            {...props}
          />
          {Boolean(error) && <span className="mt-2">{error}</span>}
        </div>
      </div>
    </div>
  );
};
