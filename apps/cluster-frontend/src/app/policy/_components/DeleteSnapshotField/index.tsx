"usc client";

import { NumberField } from "@/components/NumberInputField";
import {
  RadioGroupField,
  RadioGroupOption,
} from "@/components/RadioGroupField";
import { SelectField, SelectFieldOption } from "@/components/SelectField";
import { showFieldError } from "@/utils/form";
import { FormikErrors, FormikTouched } from "formik";
import { ChangeEvent, FC, FocusEvent, useCallback } from "react";
import {
  deleteSnapshotOptions,
  FormInputs,
  recurringOptions,
} from "../../form";

export interface DeleteSnapshotFieldProps {
  deleteSnapshot: RadioGroupOption;
  deleteSnapshotCount: number;
  deleteSnapshotRecurrence: SelectFieldOption;
  touched: FormikTouched<FormInputs>;
  errors: FormikErrors<FormInputs>;
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean
  ) => Promise<void> | Promise<FormikErrors<FormInputs>>;
}

export const DeleteSnapshotField: FC<DeleteSnapshotFieldProps> = ({
  deleteSnapshot,
  deleteSnapshotCount,
  deleteSnapshotRecurrence,
  touched,
  errors,
  setFieldValue,
}) => {
  const handleCountChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      if (
        /^\d{0,2}$/.test(value) &&
        Number(value) <= 99 &&
        Number(value) >= 1
      ) {
        setFieldValue("deleteSnapshotCount", value);
      }
    },
    [setFieldValue]
  );

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement, Element>) => {
      const { value } = event.target;

      if (value.length === 1) {
        setFieldValue("deleteSnapshotCount", `0${value}`);
      } else if (value === "") {
        setFieldValue("deleteSnapshotCount", "01");
      }
    },
    [setFieldValue]
  );

  const onDeleteSnapshotOptionSelect = useCallback(
    (option: RadioGroupOption) => {
      setFieldValue("deleteSnapshot", option);
    },
    [setFieldValue]
  );

  const onDeleteSnapshotRecurrenceOptionSelect = useCallback(
    (option: SelectFieldOption) => {
      setFieldValue("deleteSnapshotRecurrence", option);
    },
    [setFieldValue]
  );

  return (
    <div>
      <div className="flex items-center">
        <RadioGroupField
          selectedOption={deleteSnapshot}
          onChange={onDeleteSnapshotOptionSelect}
          options={deleteSnapshotOptions}
        />

        <NumberField
          id="deleteSnapshotCount"
          value={deleteSnapshotCount}
          onChange={handleCountChange}
          onBlur={handleBlur}
          className="w-[46px] ml-2"
          maxLength={2}
          min="0"
          max="99"
        />

        <SelectField
          id="recurringOptions"
          options={recurringOptions}
          innerClassName="h-9"
          containerClassName="ml-2"
          selectedOption={deleteSnapshotRecurrence}
          fieldClassName="w-[126px] text-lg bg-[#424B5366]"
          setSelectedOption={onDeleteSnapshotRecurrenceOptionSelect}
        />
      </div>

      {showFieldError(touched.deleteSnapshot, errors.deleteSnapshot) && (
        <span>
          {showFieldError(touched.deleteSnapshot, errors.deleteSnapshot)}
        </span>
      )}
    </div>
  );
};
