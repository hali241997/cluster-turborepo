"use client";

import { ChangeEvent, FC, ReactNode, useCallback } from "react";

export interface RadioGroupOption {
  value: string;
  label: string | ReactNode;
}

export interface RadioGroupFieldProps {
  selectedOption: RadioGroupOption;
  onChange: (option: RadioGroupOption) => void;
  options: RadioGroupOption[];
  error?: string;
}

export const RadioGroupField: FC<RadioGroupFieldProps> = ({
  selectedOption,
  onChange,
  options,
  error,
}) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const newOption = options.find((o) => o.value === value);
      if (newOption) {
        onChange(newOption);
      }
    },
    [onChange, options]
  );

  return (
    <div>
      <div className="flex gap-6 items-center">
        {options.map((option) => (
          <div key={option.value} className="space-x-2 flex items-center">
            <input
              id={option.value}
              type="radio"
              checked={selectedOption.value === option.value}
              onChange={handleChange}
              name={option.value}
              value={option.value}
            />
            {typeof option.label === "string" ? (
              <label
                htmlFor={option.value}
                className="text-lg text-whiteSecondary -mb-[1px]"
              >
                {option.label}
              </label>
            ) : (
              option.label
            )}
          </div>
        ))}
      </div>

      {Boolean(error) && <span className="text-red-500 mt-2">error</span>}
    </div>
  );
};
