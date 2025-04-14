import type { CallOptions } from "hardhat-deploy/types";

export const GAS: CallOptions = {
  maxFeePerGas: "100000000000", // 100 gwei
  maxPriorityFeePerGas: "1000000000",
};
