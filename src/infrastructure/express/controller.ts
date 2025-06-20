import { RequestHandler } from "express";
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

export const getConversationByIdHandler: RequestHandler = async (req, res) => {
  const conversationId = req.params.conversationId;
  const conversation = await getConversationById(conversationId);
  res.status(200).json(conversation);
};
