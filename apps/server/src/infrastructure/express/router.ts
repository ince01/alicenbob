import { Router } from "express";
import {
  createConversationHandler,
  getConversationByIdHandler,
  streamMessageHandler,
} from "./controller";
import { _conversations, _messages } from "infrastructure/prisma";
import { logger } from "infrastructure/pino";

const router = Router();

router.use((req, _res, next) => {
  const logData = {
    user: {
      id: "123",
      name: "John Doe",
      email: "Vx2d0@example.com",
      token: "token",
      api_key: "api_key",
    },
  };

  logger.info(logData.user, "Test logger");
  logger.info(logData, "Test logger with nested data");

  next();
});

router.get("/conversations/:conversationId", getConversationByIdHandler);

router.post(
  "/conversations/:conversationId/messages/stream",
  streamMessageHandler
);

router.post("/conversations", createConversationHandler);

router.get("/", (_req, res) => {
  res.status(200).json({
    messages: _messages,
    conversations: _conversations,
  });
});

export default router;
