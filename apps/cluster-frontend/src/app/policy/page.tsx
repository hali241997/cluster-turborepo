"use client";

import { Button } from "@/components/Button";
import { CheckboxField } from "@/components/CheckboxField";
import { DirectoryField } from "@/components/DirectoryField";
import { Skeleton } from "@/components/Skeleton";
import { TextField } from "@/components/TextField";
import Routes from "@/config/routes";
import { useAxios } from "@/hooks/useAxios";
import { showFieldError } from "@/utils/form";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { ChangeEvent, FC, useCallback, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { PolicySchedule } from "./_components/PolicySchedule";
import { SnapshotLocking } from "./_components/SnapshotLocking";
import {
  DeleteSnapshotEnum,
  deleteSnapshotOptions,
  DeleteSnapshotRecurrenceEnum,
  FormInputs,
  formValidation,
  initialValues,
  recurringOptions,
  ScheduleEnum,
  scheduleOptions,
  SnapshotRunningDays,
} from "./form";

interface Policy {
  name: string;
  directory: string;
  scheduleType: ScheduleEnum;
  takeSnapshotAt: string;
  runningDays: SnapshotRunningDays;
  deleteSnapshot: DeleteSnapshotEnum;
  deleteSnapshotCount: number;
  deleteSnapshotRecurrence: DeleteSnapshotRecurrenceEnum;
  enableLockedSnapshot: boolean;
  enablePolicy: boolean;
}

const Policy: FC = () => {
  const router = useRouter();

  const { isLoading: setPolicyIsLoading, request: setPolicyRequest } =
    useAxios();
  const { isLoading: getPolicyIsLoading, request: getPolicyRequest } =
    useAxios<Policy>();

  const isLoading = useMemo(
    () => setPolicyIsLoading || getPolicyIsLoading,
    [getPolicyIsLoading, setPolicyIsLoading]
  );

  const handleSubmit = useCallback(
    async (values: FormInputs) => {
      const response = await setPolicyRequest({
        url: "/setPolicy",
        method: "PUT",
        data: {
          name: values.policyName,
          directory: values.applyToDirectory,
          scheduleType: values.scheduleType.value,
          takeSnapshotAt: values.takeSnapshotAt,
          runningDays: values.runningDays,
          deleteSnapshot: values.deleteSnapshot.value,
          deleteSnapshotCount: values.deleteSnapshotCount,
          deleteSnapshotRecurrence: values.deleteSnapshotRecurrence.value,
          enableLockedSnapshot: values.enableLockedSnapshot,
          enablePolicy: values.enablePolicy,
        },
      });

      if (response.success) {
        const { status } = response.success;
        if (status === 201) {
          toast.success("New Policy Created");
        } else if (status === 200) {
          toast.success("Policy Updated");
        }
      } else {
        const { data } = response.error;
        toast.error(data);
      }
    },
    [setPolicyRequest]
  );

  const formik = useFormik({
    initialValues,
    validationSchema: formValidation,
    onSubmit: handleSubmit,
  });

  const getPolicy = useCallback(async () => {
    const response = await getPolicyRequest({
      url: "/getPolicy",
      method: "GET",
    });
    if (response.success && response.success.status === 200) {
      const { data } = response.success;

      const scheduleOptionsIndex = scheduleOptions.findIndex(
        (item) => item.value === data.scheduleType
      );
      const deleteSnapshotOptionsIndex = deleteSnapshotOptions.findIndex(
        (item) => item.value === data.deleteSnapshot
      );
      const recurringOptionsIndex = recurringOptions.findIndex(
        (item) => item.value === data.deleteSnapshotRecurrence
      );

      if (
        scheduleOptionsIndex > -1 &&
        deleteSnapshotOptionsIndex > -1 &&
        recurringOptionsIndex > -1
      ) {
        formik.setValues({
          policyName: data.name,
          applyToDirectory: data.directory,
          scheduleType: scheduleOptions[scheduleOptionsIndex],
          takeSnapshotAt: data.takeSnapshotAt,
          runningDays: data.runningDays,
          deleteSnapshot: deleteSnapshotOptions[deleteSnapshotOptionsIndex],
          deleteSnapshotCount: data.deleteSnapshotCount,
          deleteSnapshotRecurrence: recurringOptions[recurringOptionsIndex],
          enableLockedSnapshot: data.enableLockedSnapshot,
          enablePolicy: data.enablePolicy,
        });
      }
    } else if (response.error) {
      const { data } = response.error;
      toast.error(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getPolicyRequest]);

  useEffect(() => {
    getPolicy();
  }, [getPolicy]);

  const handleEnablePolicyChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      formik.setFieldValue("enablePolicy", event.target.checked);
    },
    [formik]
  );

  const handleCancelClick = useCallback(() => {
    router.push(Routes.home);
  }, [router]);

  return (
    <form action={() => formik.handleSubmit()}>
      <div className="py-3 pl-4">
        <div className="text-h1 text-[#F3F4F4] mb-5">Edit Snapshot Policy</div>

        <div className="w-auto lg:w-[793px] space-y-3 mb-3">
          {isLoading ? (
            <Skeleton className="h-[60px] rounded" />
          ) : (
            <TextField
              id="policyName"
              label="Policy Name"
              required
              value={formik.values.policyName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={showFieldError(
                formik.touched.policyName,
                formik.errors.policyName
              )}
            />
          )}

          {isLoading ? (
            <Skeleton className="h-[60px] rounded" />
          ) : (
            <DirectoryField
              id="applyToDirectory"
              label="Apply to Directory"
              required
              value={formik.values.applyToDirectory}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={showFieldError(
                formik.touched.applyToDirectory,
                formik.errors.applyToDirectory
              )}
            />
          )}
        </div>

        <PolicySchedule
          isLoading={isLoading}
          values={formik.values}
          touched={formik.touched}
          errors={formik.errors}
          setFieldValue={formik.setFieldValue}
        />

        <SnapshotLocking
          isLoading={isLoading}
          enableLockedSnapshot={formik.values.enableLockedSnapshot}
          deleteSnapshot={formik.values.deleteSnapshot}
          touched={formik.touched}
          errors={formik.errors}
          setFieldValue={formik.setFieldValue}
        />

        {isLoading ? (
          <Skeleton className="h-9 w-[300px]" />
        ) : (
          <CheckboxField
            id="enablePolicy"
            label="Enable policy"
            containerClassName="mb-[27px]"
            checked={formik.values.enablePolicy}
            onChange={handleEnablePolicyChange}
            error={showFieldError(
              formik.touched.enablePolicy,
              formik.errors.enablePolicy
            )}
          />
        )}

        <div className="space-x-[14px]">
          <Button type="submit" disabled={isLoading}>
            Save Policy
          </Button>
          <Button
            variant="ghost"
            disabled={isLoading}
            onClick={handleCancelClick}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Policy;
