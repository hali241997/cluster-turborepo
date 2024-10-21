import { FC, useCallback, WheelEvent } from "react";
import { TextField, TextFieldProps } from "../TextField";

export type NumberInputField = Omit<
  TextFieldProps,
  "onKeyDown" | "onWheel" | "type"
>;

const excludedSymbols = ["e", "E", "+", "-", "."];

export const NumberField: FC<NumberInputField> = ({ ...props }) => {
  const handleWheel = useCallback((event: WheelEvent<HTMLInputElement>) => {
    event.currentTarget.blur();
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      return excludedSymbols.includes(event.key) && event.preventDefault();
    },
    []
  );

  return (
    <TextField
      type="number"
      onWheel={handleWheel}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
};
