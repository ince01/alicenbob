import { RequestHandler } from "express";
import {
  CreateConversationArgs,
  createConversation,
} from "services/conversations";
import { SpeechToTextModel, streamMessage } from "services/messages";

type StreamMessageReqBody = CreateConversationArgs;

export const streamMessageHandler: RequestHandler<
  unknown,
  unknown,
  StreamMessageReqBody
> = async (_req, res) => {
  const response = await fetch(
    "https://storage.googleapis.com/eleven-public-cdn/audio/marketing/nicole.mp3"
  );

  const audioBlob = new Blob([await response.arrayBuffer()], {
    type: "audio/mp3",
  });

  const data = await streamMessage({
    model: SpeechToTextModel.ElevenLabsScribeV1,
    audioBlob: audioBlob,
  });

  res.status(200).json({ data });
};

export const createConversationHandler: RequestHandler<
  unknown,
  unknown,
  CreateConversationArgs
> = async (req, res) => {
  const conversation = await createConversation(req.body);
  res.status(200).json(conversation);
};
