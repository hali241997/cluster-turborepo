"use client";

import { CheckboxField } from "@/components/CheckboxField";
import { SelectField, SelectFieldOption } from "@/components/SelectField";
import { Skeleton } from "@/components/Skeleton";
import { showFieldError } from "@/utils/form";
import { FormikErrors, FormikTouched } from "formik";
import { ChangeEvent, FC, useCallback } from "react";
import { RiQuestionFill } from "react-icons/ri";
import { FormInputs, scheduleOptions, SnapshotRunningDays } from "../../form";
import { DeleteSnapshotField } from "../DeleteSnapshotField";
import { TimeFormatField } from "../TimeFormatField";

export interface PolicyScheduleProps {
  isLoading: boolean;
  values: FormInputs;
  touched: FormikTouched<FormInputs>;
  errors: FormikErrors<FormInputs>;
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean
  ) => Promise<void> | Promise<FormikErrors<FormInputs>>;
}

export const PolicySchedule: FC<PolicyScheduleProps> = ({
  isLoading,
  values,
  touched,
  errors,
  setFieldValue,
}) => {
  const onScheduleTypeOptionSelect = useCallback(
    (option: SelectFieldOption) => {
      setFieldValue("scheduleType", option);
    },
    [setFieldValue]
  );

  const handleRunnDaysChange = useCallback(
    (key: keyof SnapshotRunningDays, checked: boolean) => {
      if (checked && key === "everyDay") {
        setFieldValue("runningDays.monday", false);
        setFieldValue("runningDays.tuesday", false);
        setFieldValue("runningDays.wednesday", false);
        setFieldValue("runningDays.thursday", false);
        setFieldValue("runningDays.friday", false);
        setFieldValue("runningDays.saturday", false);
        setFieldValue("runningDays.sunday", false);
      } else if (checked && key !== "everyDay") {
        setFieldValue("runningDays.everyDay", false);
      }
      setFieldValue(`runningDays.${key}`, checked);
    },
    [setFieldValue]
  );

  return (
    <div className="mb-11">
      <div className="text-lg mb-[6px]">
        Run Policy on the Following Schedule
      </div>

      {isLoading ? (
        <Skeleton className="h-[300px]" />
      ) : (
        <div className="bg-[#242C35] border-t-[#3D454DCC] border-t-[1px] px-6 py-9 space-y-[18px]">
          <div className="flex flex-1 flex-col lg:flex-row gap-1 lg:gap-6 lg:items-center">
            <div className="flex flex-[0.15] lg:justify-end">
              <div className="text-lg text-whiteSecondary">
                Select Schedule Type
              </div>
            </div>
            <div className="flex flex-[0.85]">
              <SelectField
                id="scheduleType"
                options={scheduleOptions}
                selectedOption={values.scheduleType}
                fieldClassName="w-[230px] text-lg bg-[#424B5366]"
                setSelectedOption={onScheduleTypeOptionSelect}
                error={showFieldError(
                  touched.scheduleType,
                  errors.scheduleType
                )}
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col lg:flex-row gap-1 lg:gap-6 lg:items-center">
            <div className="flex flex-[0.15] lg:justify-end">
              <div className="text-lg text-whiteSecondary">
                Set to Time Zone
              </div>
            </div>
            <div className="flex flex-[0.85] items-center text-lg text-whiteSecondary">
              America/Los Angeles
              <RiQuestionFill size={20} fill="#0298FF" className="ml-2" />
            </div>
          </div>

          <div className="flex flex-1 flex-col lg:flex-row gap-1 lg:gap-6 lg:items-center">
            <div className="flex flex-[0.15] lg:justify-end">
              <div className="text-lg text-whiteSecondary">
                Take a Snapshot at
              </div>
            </div>
            <div className="flex flex-[0.85]">
              <TimeFormatField
                takeSnapshotAt={values.takeSnapshotAt}
                setFieldValue={setFieldValue}
                error={showFieldError(
                  touched.takeSnapshotAt,
                  errors.takeSnapshotAt
                )}
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col lg:flex-row gap-1 lg:gap-6 lg:items-center">
            <div className="flex flex-[0.15] lg:justify-end">
              <div className="text-lg text-whiteSecondary">
                On the Following Day(s)
              </div>
            </div>
            <div className="flex flex-[0.85] flex-col">
              <div className="flex items-center gap-6">
                <CheckboxField
                  id="everyDay"
                  label="Every day"
                  checked={values.runningDays.everyDay}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleRunnDaysChange("everyDay", event.target.checked)
                  }
                />
                <CheckboxField
                  id="monday"
                  label="Mon"
                  checked={values.runningDays.monday}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleRunnDaysChange("monday", event.target.checked)
                  }
                />
                <CheckboxField
                  id="tuesday"
                  label="Tue"
                  checked={values.runningDays.tuesday}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleRunnDaysChange("tuesday", event.target.checked)
                  }
                />
                <CheckboxField
                  id="wednesday"
                  label="Wed"
                  checked={values.runningDays.wednesday}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleRunnDaysChange("wednesday", event.target.checked)
                  }
                />
                <CheckboxField
                  id="thursday"
                  label="Thur"
                  checked={values.runningDays.thursday}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleRunnDaysChange("thursday", event.target.checked)
                  }
                />
                <CheckboxField
                  id="friday"
                  label="Fri"
                  checked={values.runningDays.friday}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleRunnDaysChange("friday", event.target.checked)
                  }
                />
                <CheckboxField
                  id="saturday"
                  label="Sat"
                  checked={values.runningDays.saturday}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleRunnDaysChange("saturday", event.target.checked)
                  }
                />
                <CheckboxField
                  id="sunday"
                  label="Sun"
                  checked={values.runningDays.sunday}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleRunnDaysChange("sunday", event.target.checked)
                  }
                />
              </div>
              {errors.runningDays && (
                <span className="text-red-500 mt-2">
                  {errors.runningDays as string}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-1 flex-col lg:flex-row gap-1 lg:gap-6 lg:items-center">
            <div className="flex flex-[0.15] lg:justify-end">
              <div className="text-lg text-whiteSecondary">
                Delete Each Snapshot
              </div>
            </div>
            <div className="flex flex-[0.85]">
              <DeleteSnapshotField
                deleteSnapshot={values.deleteSnapshot}
                deleteSnapshotCount={values.deleteSnapshotCount}
                deleteSnapshotRecurrence={values.deleteSnapshotRecurrence}
                touched={touched}
                errors={errors}
                setFieldValue={setFieldValue}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
