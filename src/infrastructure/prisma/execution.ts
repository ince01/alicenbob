import {
  CreateExecutionPort,
  UpdateExecutionStatusPort,
} from "interfaces/persistence";

export const createExecution: CreateExecutionPort = async () => {
  return Math.random().toString();
};

export const updateExecutionStatus: UpdateExecutionStatusPort = async () => {};
