import { Router } from "express";
import {
  createConversationHandler,
  getConversationByIdHandler,
  streamMessageHandler,
} from "./controller";
import { _conversations, _messages } from "infrastructure/prisma";

const router = Router();

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
