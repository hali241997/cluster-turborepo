import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export interface ClusterData {
  date: string;
  readIops: number;
  writeIops: number;
  readThroughput: number;
  writeThroughput: number;
}

export interface IOPSItem {
  date: string;
  readIops: number;
  writeIops: number;
}

export interface ThroughputItem {
  date: string;
  readThroughput: number;
  writeThroughput: number;
}

export interface ClusterInitialState {
  id: string;
  name: string;
  iops: IOPSItem[];
  throughputs: ThroughputItem[];
}

const initialState: ClusterInitialState = {
  id: "",
  name: "",
  iops: [],
  throughputs: [],
};

export const clusterSlice = createSlice({
  name: "cluster",
  initialState,
  reducers: {
    // used to update the iops and throughput array
    addCluster(
      state: ClusterInitialState,
      {
        payload,
      }: PayloadAction<{ id: string; name: string; data: ClusterData[] }>
    ) {
      state.id = payload.id;
      state.name = payload.name;

      const _iops: IOPSItem[] = payload.data.map((cluster) => ({
        date: cluster.date,
        readIops: cluster.readIops,
        writeIops: cluster.writeIops,
      }));
      state.iops = _iops;

      const _throughputs: ThroughputItem[] = payload.data.map((cluster) => ({
        date: cluster.date,
        readThroughput: cluster.readThroughput,
        writeThroughput: cluster.writeThroughput,
      }));
      state.throughputs = _throughputs;
    },
  },
});

// selector used to access the cluster reducer state
export const useClusterState = () =>
  useSelector((state: RootState) => state.cluster);

export const { addCluster } = clusterSlice.actions;

export default clusterSlice.reducer;
