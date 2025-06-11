import { Router } from "express";
import { createConversationHandler, streamMessageHandler } from "./controller";

const router = Router();

router.post(
  "/conversations/:conversationId/messages/stream",
  streamMessageHandler
);

router.post("/conversations", createConversationHandler);

export default router;
