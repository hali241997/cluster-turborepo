import { cn } from "@/utils/tailwindMerge";
import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";

export interface CheckboxFieldProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  error?: string;
  disabled?: boolean;
  containerClassName?: string;
}

export const CheckboxField: FC<CheckboxFieldProps> = ({
  id,
  label,
  className,
  containerClassName,
  ...props
}) => {
  return (
    <div className={cn("flex items-center gap-2", containerClassName)}>
      <input
        id={id}
        name={id}
        type="checkbox"
        className={cn("w-4 h-4", className)}
        {...props}
      />
      {label && (
        <label htmlFor={id} className="text-lg text-whiteSecondary">
          {label}
        </label>
      )}
    </div>
  );
};
