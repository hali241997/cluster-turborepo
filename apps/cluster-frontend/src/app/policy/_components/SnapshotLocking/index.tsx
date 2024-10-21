import { CheckboxField } from "@/components/CheckboxField";
import { RadioGroupOption } from "@/components/RadioGroupField";
import { Skeleton } from "@/components/Skeleton";
import { showFieldError } from "@/utils/form";
import { FormikErrors, FormikTouched } from "formik";
import { ChangeEvent, FC, useCallback } from "react";
import { FormInputs } from "../../form";

export interface SnapshotLockingProps {
  isLoading: boolean;
  enableLockedSnapshot: boolean;
  deleteSnapshot: RadioGroupOption;
  touched: FormikTouched<FormInputs>;
  errors: FormikErrors<FormInputs>;
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean
  ) => Promise<void> | Promise<FormikErrors<FormInputs>>;
}

export const SnapshotLocking: FC<SnapshotLockingProps> = ({
  isLoading,
  enableLockedSnapshot,
  deleteSnapshot,
  touched,
  errors,
  setFieldValue,
}) => {
  const handleLockedSnapshotChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setFieldValue("enableLockedSnapshot", event.target.checked);
    },
    [setFieldValue]
  );

  return (
    <div className="mb-[42px]">
      <div className="text-lg text-whiteSecondary">Snapshot Locking</div>
      <div className="text-base text-whiteTertiary mt-[3px] mb-[6px]">
        Locked snapshots cannot be deleted before the deletion schedule expires.
        For this feature to be available, snapshots must be set to automatically
        delete.
      </div>

      {isLoading ? (
        <Skeleton className="h-9 w-[300px]" />
      ) : (
        <CheckboxField
          id="enableLockedSnapshot"
          label="Enable locked snapshots"
          checked={enableLockedSnapshot}
          onChange={handleLockedSnapshotChange}
          disabled={deleteSnapshot.value === "never"}
          error={showFieldError(
            touched.enableLockedSnapshot,
            errors.enableLockedSnapshot
          )}
        />
      )}
    </div>
  );
};
