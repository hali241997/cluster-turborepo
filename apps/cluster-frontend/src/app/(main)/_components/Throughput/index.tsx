"use client";

import { Skeleton } from "@/components/Skeleton";
import { useClusterState } from "@/redux/cluster/slice";
import { bytesToGbs, bytesToKbs } from "@/utils/conversion";
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

export interface ThroughputProps {
  isLoading: boolean;
}

export const Throughput: FC<ThroughputProps> = ({ isLoading }) => {
  const { throughputs } = useClusterState();

  const [hoveredData, setHoveredData] = useState<{
    readThroughput: number;
    writeThroughput: number;
  }>({
    readThroughput:
      throughputs.length > 0
        ? throughputs[throughputs.length - 1].readThroughput
        : 0,
    writeThroughput:
      throughputs.length > 0
        ? throughputs[throughputs.length - 1].writeThroughput
        : 0,
  });

  const handleMouseMove = useCallback((nextState: CategoricalChartState) => {
    if (nextState && nextState.activePayload) {
      const { payload } = nextState.activePayload[0];
      setHoveredData({
        readThroughput: payload.readThroughput,
        writeThroughput: payload.writeThroughput,
      });
    }
  }, []);

  return (
    <div className="w-full h-auto lg:h-[144px] flex flex-col lg:flex-row relative gap-4">
      {isLoading ? (
        <Skeleton className="h-[144px] flex-1" />
      ) : (
        <div className="flex-1">
          <div className="text-whiteSecondary text-h2 mb-3 ml-4">
            Throughput
          </div>
          <ResponsiveContainer width="100%" height={144}>
            <LineChart data={throughputs} onMouseMove={handleMouseMove}>
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
                domain={[0, 2 * 1024 ** 3]}
                ticks={[0, 1 * 1024 ** 3, 2 * 1024 ** 3]}
                tickFormatter={(value) => `${bytesToGbs(value)} GB/s`}
              />
              <Tooltip
                content={<DateTooltip />}
                wrapperStyle={{ width: "100px" }}
              />
              <Line
                dot={false}
                activeDot
                dataKey="readThroughput"
                stroke="#8E8ECD"
                strokeWidth={2}
              />
              <Line
                dot={false}
                activeDot
                dataKey="writeThroughput"
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
          <div className="text-lg text-[#858B90]">Throughput</div>

          <div className="w-auto lg:w-[160px] border-[#333B4480] border-[1px] bg-[#222C364D]">
            <div className="border-b-[#333B4480] border-b-[1px] px-3 py-2">
              <div className="text-h3 text-whiteTertiary">Read</div>
              <div className="text-lg text-[#8E8ECD]">
                {bytesToKbs(hoveredData.readThroughput, 1)}{" "}
                <span className="text-xs">KB/s</span>
              </div>
            </div>

            <div className="px-3 py-2">
              <div className="text-h3 text-whiteTertiary">Write</div>
              <div className="text-lg leading-5 text-bluePrimary">
                {bytesToKbs(hoveredData.writeThroughput, 1)}{" "}
                <span className="text-xs">KB/s</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
