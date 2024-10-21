"use client";

import { NumberField } from "@/components/NumberInputField";
import { FormikErrors } from "formik";
import { ChangeEvent, FC, FocusEvent, useCallback } from "react";
import { FormInputs } from "../../form";

export interface TimeFormatFieldProps {
  takeSnapshotAt: string;
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean
  ) => Promise<void> | Promise<FormikErrors<FormInputs>>;
  error?: string;
}

export const TimeFormatField: FC<TimeFormatFieldProps> = ({
  takeSnapshotAt,
  setFieldValue,
  error,
}) => {
  const handleHoursChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      if (/^\d{0,2}$/.test(value) && Number(value) <= 23) {
        setFieldValue(
          "takeSnapshotAt",
          value + ":" + takeSnapshotAt.split(":")[1].toString()
        );
      }
    },
    [setFieldValue, takeSnapshotAt]
  );

  const handleMinutesChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      if (/^\d{0,2}$/.test(value) && Number(value) <= 59) {
        setFieldValue(
          "takeSnapshotAt",
          takeSnapshotAt.split(":")[0].toString() + ":" + value
        );
      }
    },
    [setFieldValue, takeSnapshotAt]
  );

  const handleHourBlur = useCallback(
    (event: FocusEvent<HTMLInputElement, Element>) => {
      const { value } = event.target;

      const rightValue = takeSnapshotAt.split(":")[1];
      if (value.length === 1) {
        setFieldValue("takeSnapshotAt", `0${value}:${rightValue}`);
      } else if (value === "") {
        setFieldValue("takeSnapshotAt", `00:${rightValue}`);
      }
    },
    [setFieldValue, takeSnapshotAt]
  );

  const handleMinuteBlur = useCallback(
    (event: FocusEvent<HTMLInputElement, Element>) => {
      const { value } = event.target;

      const leftValue = takeSnapshotAt.split(":")[0];
      if (value.length === 1) {
        setFieldValue("takeSnapshotAt", `${leftValue}:0${value}`);
      } else if (value === "") {
        setFieldValue("takeSnapshotAt", `${leftValue}:00`);
      }
    },
    [setFieldValue, takeSnapshotAt]
  );

  return (
    <div>
      <div className="flex gap-2 items-center">
        <NumberField
          value={takeSnapshotAt.split(":")[0]}
          onChange={handleHoursChange}
          onBlur={handleHourBlur}
          className="w-[46px]"
          maxLength={2}
          min="0"
          max="23"
        />

        <span className="text-lg">:</span>

        <NumberField
          value={takeSnapshotAt.split(":")[1]}
          onChange={handleMinutesChange}
          onBlur={handleMinuteBlur}
          className="w-[46px]"
          maxLength={2}
          min="0"
          max="59"
        />
      </div>

      {Boolean(error) && <span className="text-red-500 mt-2">Hello</span>}
    </div>
  );
};
