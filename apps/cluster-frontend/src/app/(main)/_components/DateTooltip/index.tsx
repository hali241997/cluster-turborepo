import { IOPSItem, ThroughputItem } from "@/redux/cluster/slice";
import { toReadableFormat } from "@/utils/dateTime";
import { FC } from "react";

export interface DateTooltipProps {
  active?: boolean;
  payload?: { payload: ThroughputItem | IOPSItem }[];
  coordinate?: { x: number; y: number };
}

export const DateTooltip: FC<DateTooltipProps> = ({
  active,
  payload,
  coordinate,
}) => {
  if (!active || !payload || !payload.length || !coordinate) return null;

  const { date } = payload[0].payload;

  return (
    <div
      className="absolute top-0 w-full -translate-x-1/2 -translate-y-full pointer-events-none"
      style={{ left: coordinate.x }}
    >
      <div className="text-xs text-white">{toReadableFormat(date)}</div>
    </div>
  );
};
