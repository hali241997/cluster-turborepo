import axios, { AxiosInstance } from "axios";

// creating axios instance
const axiosClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return client;
};

export default axiosClient;
