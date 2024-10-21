import { FormikErrors, FormikTouched } from "formik";

// validation error messages
export const ErrorMessages = {
  required: (field: string) => `${field} is required`,
  invalid: (field: string) => `${field} is invalid`,
};

// show error on field after it has been touched and has an error
export const showFieldError = (
  touched:
    | boolean
    | FormikTouched<unknown>
    | FormikTouched<unknown>[]
    | undefined,
  error:
    | string
    | string[]
    | FormikErrors<unknown>
    | FormikErrors<unknown>[]
    | undefined
): string | undefined => {
  if (typeof touched !== "boolean") return undefined;
  if (touched && typeof error === "string") return error;
  return undefined;
};
