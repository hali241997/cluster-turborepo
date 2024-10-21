import { RadioGroupOption } from "@/components/RadioGroupField";
import { SelectFieldOption } from "@/components/SelectField";
import { ErrorMessages } from "@/utils/form";
import { boolean, number, object, string } from "yup";

export enum ScheduleEnum {
  daily = "daily",
  weekly = "weekly",
}

export enum DeleteSnapshotEnum {
  auto = "auto",
  never = "never",
}

export enum DeleteSnapshotRecurrenceEnum {
  days = "days",
  weeks = "weeks",
  months = "months",
  years = "years",
}

export const scheduleOptions: Array<SelectFieldOption> = [
  { label: "Daily", value: ScheduleEnum.daily },
  { label: "Weekly", value: ScheduleEnum.weekly },
];

export const deleteSnapshotOptions: Array<RadioGroupOption> = [
  { label: "Never", value: DeleteSnapshotEnum.never },
  { label: "Automatically after", value: DeleteSnapshotEnum.auto },
];

export const recurringOptions: Array<SelectFieldOption> = [
  { label: "day(s)", value: DeleteSnapshotRecurrenceEnum.days },
  { label: "week(s)", value: DeleteSnapshotRecurrenceEnum.weeks },
  { label: "month(s)", value: DeleteSnapshotRecurrenceEnum.months },
  { label: "year(s)", value: DeleteSnapshotRecurrenceEnum.years },
];

export interface FormInputs {
  policyName: string;
  applyToDirectory: string;
  scheduleType: SelectFieldOption;
  takeSnapshotAt: string;
  runningDays: SnapshotRunningDays;
  deleteSnapshot: RadioGroupOption;
  deleteSnapshotCount: number;
  deleteSnapshotRecurrence: SelectFieldOption;
  enableLockedSnapshot: boolean;
  enablePolicy: boolean;
}

export interface SnapshotRunningDays {
  everyDay: boolean;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

export const initialValues: FormInputs = {
  policyName: "",
  applyToDirectory: "",
  scheduleType: scheduleOptions[0],
  takeSnapshotAt: "00:00",
  runningDays: {
    everyDay: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  },
  deleteSnapshot: deleteSnapshotOptions[0],
  deleteSnapshotCount: 0,
  deleteSnapshotRecurrence: recurringOptions[0],
  enableLockedSnapshot: false,
  enablePolicy: false,
};

export const formValidation = object().shape({
  policyName: string().trim().required(ErrorMessages.required("Policy Name")),
  applyToDirectory: string()
    .trim()
    .required(ErrorMessages.required("Directory Name")),
  scheduleType: object().required(ErrorMessages.required("Schedule Type")),
  takeSnapshotAt: string().trim().required(ErrorMessages.required("Time")),
  runningDays: object().test(
    "at-least-one-checked",
    "This field is required",
    (obj) => obj && Object.values(obj).some((value) => value === true)
  ),
  deleteSnapshot: object().required(
    ErrorMessages.required("Snapshot Interval")
  ),
  deleteSnapshotCount: number().nullable(),
  deleteSnapshotRecurrence: object().nullable(),
  enableLockedSnapshot: boolean(),
  enablePolicy: boolean(),
});
