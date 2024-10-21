"use client";

import { SelectField, SelectFieldOption } from "@/components/SelectField";
import { useAxios } from "@/hooks/useAxios";
import { addCluster, ClusterData } from "@/redux/cluster/slice";
import { FC, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { IOPS } from "./_components/IOPS";
import { Throughput } from "./_components/Throughput";

const options: Array<SelectFieldOption> = [
  { value: "week", label: "Last 7 days" },
  { value: "month", label: "This Month" },
  { value: "year", label: "This Year" },
];

interface ClusterResponse {
  id: string;
  name: string;
  data: ClusterData[];
}

const PerfomanceMetrics: FC = () => {
  const dispatch = useDispatch();

  const { isLoading, request } = useAxios<ClusterResponse>();

  const [selectedOption, setSelectedOption] = useState<SelectFieldOption>({
    value: "week",
    label: "Last 7 days",
  });

  const handleOptionSelect = useCallback((option: SelectFieldOption) => {
    setSelectedOption(option);
  }, []);

  const getAllClusterData = useCallback(async () => {
    const response = await request({
      url: "/getTimeSeries",
      method: "GET",
      params: { timezone: selectedOption.value },
    });

    if (response.success && response.success.status === 200) {
      const { data } = response.success;
      dispatch(addCluster({ id: data.id, name: data.name, data: data.data }));
    } else if (response.error) {
      const { data } = response.error;
      toast.error(data);
    }
  }, [dispatch, request, selectedOption.value]);

  useEffect(() => {
    getAllClusterData();
  }, [getAllClusterData]);

  return (
    <div className="py-3 px-4">
      <div className="flex items-center justify-between mb-6">
        <div className="text-h1">Performance Metrics</div>

        <SelectField
          id="interval"
          containerClassName="w-[150px] h-6"
          options={options}
          selectedOption={selectedOption}
          setSelectedOption={handleOptionSelect}
        />
      </div>

      <div className="flex flex-col gap-14 lg:gap-[70px]">
        <IOPS isLoading={isLoading} />

        <Throughput isLoading={isLoading} />
      </div>
    </div>
  );
};

export default PerfomanceMetrics;
