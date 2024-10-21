"use client";

import { cn } from "@/utils/tailwindMerge";
import { FC, useCallback, useRef, useState } from "react";
import { IoCaretDown } from "react-icons/io5";
import { useOnClickOutside } from "usehooks-ts";

export interface SelectFieldOption {
  value: string;
  label: string;
}

export interface SelectFieldProps {
  id: string;
  label?: string;
  selectedOption: SelectFieldOption;
  setSelectedOption: (option: SelectFieldOption) => void;
  options: SelectFieldOption[];
  containerClassName?: string;
  innerClassName?: string;
  fieldClassName?: string;
  error?: string;
}

export const SelectField: FC<SelectFieldProps> = ({
  id,
  label,
  selectedOption,
  setSelectedOption,
  options,
  containerClassName,
  innerClassName,
  fieldClassName,
  error,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const handleClickOutside = useCallback(() => {
    setOpen(false);
  }, []);

  useOnClickOutside(ref, handleClickOutside);

  const handleOptionClick = useCallback(
    (option: SelectFieldOption) => {
      setSelectedOption(option);
      setOpen(false);
    },
    [setSelectedOption]
  );

  return (
    <div ref={ref} className={cn("relative", containerClassName)}>
      <div className={cn("flex flex-col gap-2", innerClassName)}>
        {label && (
          <label
            htmlFor={id}
            className="font-normal text-lg text-whiteSecondary"
          >
            {label}
          </label>
        )}

        <div
          id={id}
          onClick={() => setOpen(!open)}
          className={cn(
            "bg-darkPrimary h-full border-[#373F48] border-[1px] flex items-center justify-between px-2 gap-2 rounded cursor-pointer",
            error && "border-red-500",
            fieldClassName
          )}
        >
          <div className="text-whiteTertiary">{selectedOption.label}</div>
          <IoCaretDown
            size={10}
            className={cn(
              "text-whiteTertiary transition-all",
              open && "rotate-180"
            )}
          />
        </div>
      </div>

      <ul
        className={cn(
          "bg-darkPrimary mt-1 border-[#373F48] border-[1px] overflow-y-auto absolute w-full z-10 flex flex-col space-y-1 rounded",
          open ? "max-h-60" : "max-h-0 border-0"
        )}
      >
        {options.map((option, index) => (
          <li
            key={option.value}
            className={cn(
              "hover:bg-[#31475d] cursor-pointer p-1 border-b-[#373F48] border-b-[1px]",
              option.label === selectedOption.label && "text-whiteTertiary",
              index === options.length - 1 && "border-b-0"
            )}
            onClick={() => handleOptionClick(option)}
          >
            {option.label}
          </li>
        ))}
      </ul>

      {Boolean(error) && <span className="text-red-500 mt-2">{error}</span>}
    </div>
  );
};
