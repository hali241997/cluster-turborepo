"use client";

import { Skeleton } from "@/components/Skeleton";
import { useClusterState } from "@/redux/cluster/slice";
import { toMonthYearFormat } from "@/utils/dateTime";
import { FC, useCallback, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CategoricalChartState } from "recharts/types/chart/types";
import { DateTooltip } from "../DateTooltip";

export interface IOPSProps {
  isLoading: boolean;
}

export const IOPS: FC<IOPSProps> = ({ isLoading }) => {
  const { iops } = useClusterState();

  const [hoveredData, setHoveredData] = useState<{
    readIops: number;
    writeIops: number;
  }>({
    readIops: iops.length > 0 ? iops[iops.length - 1].readIops : 0,
    writeIops: iops.length > 0 ? iops[iops.length - 1].writeIops : 0,
  });

  const handleMouseMove = useCallback((nextState: CategoricalChartState) => {
    if (nextState && nextState.activePayload) {
      const { payload } = nextState.activePayload[0];
      setHoveredData({
        readIops: payload.readIops,
        writeIops: payload.writeIops,
      });
    }
  }, []);

  return (
    <div className="w-full h-auto lg:h-[144px] flex flex-col lg:flex-row relative gap-4">
      {isLoading ? (
        <Skeleton className="h-[144px] flex-1" />
      ) : (
        <div className="flex-1">
          <div className="text-whiteSecondary text-h2 mb-3 ml-4">IOPS</div>
          <ResponsiveContainer width="100%" height={144}>
            <LineChart data={iops} onMouseMove={handleMouseMove}>
              <CartesianGrid vertical={false} stroke="#646B72" />
              <XAxis
                dataKey="date"
                style={{
                  fontWeight: 400,
                  fill: "#A6AAAE",
                  fontSize: "12px",
                  lineHeight: "16px",
                }}
                tickFormatter={(value) => toMonthYearFormat(value)}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                style={{
                  fontWeight: 400,
                  fill: "#A6AAAE",
                  fontSize: "12px",
                  lineHeight: "16px",
                }}
                ticks={[0, 50000, 100000]}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Tooltip
                content={<DateTooltip />}
                wrapperStyle={{ width: "100px" }}
              />
              <Line
                dot={false}
                activeDot
                dataKey="readIops"
                stroke="#AA7EDD"
                strokeWidth={2}
              />
              <Line
                dot={false}
                activeDot
                dataKey="writeIops"
                stroke="#00A3CA"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {isLoading ? (
        <Skeleton className="w-auto lg:w-[169px] h-[144px]" />
      ) : (
        <div>
          <div className="text-lg text-[#858B90]">IOPS</div>

          <div className="w-auto lg:w-[160px] border-[#333B4480] border-[1px] bg-[#222C364D]">
            <div className="border-b-[#333B4480] border-b-[1px] px-3 py-2">
              <div className="text-h3 text-whiteTertiary">Read</div>
              <div className="text-lg text-[#AA7EDD]">
                {(Number(hoveredData.readIops) / 1000).toFixed(1)}k{" "}
                <span className="text-xs">IOPS</span>
              </div>
            </div>

            <div className="px-3 py-2">
              <div className="text-h3 text-whiteTertiary">Write</div>
              <div className="text-lg leading-5 text-bluePrimary">
                {Number(hoveredData.writeIops).toFixed(1)}{" "}
                <span className="text-xs">IOPS</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
