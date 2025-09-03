import { RequestHandler } from "express";
import { logger } from "infrastructure/pino";
import {
  CreateConversationArgs,
  createConversation,
} from "services/conversations";
import { getConversationById } from "services/conversations/getConversationById";
import { streamMessage, StreamMessageArgs } from "services/messages";

type StreamMessageReqBody = StreamMessageArgs;

export const streamMessageHandler: RequestHandler<
  unknown,
  unknown,
  StreamMessageReqBody
> = async (req, res) => {
  const data = await streamMessage(req.body);
  res.status(200).json(data);
};

type CreateConversationReqBody = CreateConversationArgs;

export const createConversationHandler: RequestHandler<
  unknown,
  unknown,
  CreateConversationReqBody
> = async (req, res) => {
  const conversation = await createConversation(req.body);
  res.status(200).json(conversation);
};

type GetConversationByIdReqParams = {
  conversationId: string;
};

export const getConversationByIdHandler: RequestHandler<
  GetConversationByIdReqParams
> = async (req, res) => {
  const conversationId = req.params.conversationId;
  logger.info("Get conversation by id %s", conversationId);

  const conversation = await getConversationById(conversationId);
  res.status(200).json(conversation);
};
