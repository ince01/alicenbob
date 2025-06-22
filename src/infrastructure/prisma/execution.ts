import {
  CreateExecutionPort,
  UpdateExecutionStatusPort,
} from "ports/persistence";

export const createExecution: CreateExecutionPort = async () => {
  return Math.random().toString();
};

export const updateExecutionStatus: UpdateExecutionStatusPort = async () => {};
