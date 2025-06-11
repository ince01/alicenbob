import { speechToText } from "infrastructure/elevenLabs";

export enum SpeechToTextModel {
  ElevenLabsScribeV1 = "scribe_v1",
  ElevenLabsScribeV1Experimental = "scribe_v1_experimental",
}

export type StreamMessageArgs = {
  model: SpeechToTextModel;
  audioBlob: Blob;
};

export const streamMessage = async ({
  model,
  audioBlob,
}: StreamMessageArgs) => {
  console.log("🚀 ~ streamMessage ~ model, speechBlob:", model, audioBlob);
  const transcript = await speechToText({ model, audioBlob });
  console.log("🚀 ~ transcript:", transcript);
  return transcript;
};
