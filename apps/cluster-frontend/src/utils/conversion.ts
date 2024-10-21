// used to convert bytes in giga bytes
export const bytesToGbs = (bytes: number, decimals: number = 0) => {
  return (bytes / 1024 ** 3).toFixed(decimals);
};

// used to convert bytes in kilo bytes
export const bytesToKbs = (bytes: number, decimals: number = 0) => {
  return (bytes / 1024).toFixed(decimals);
};
