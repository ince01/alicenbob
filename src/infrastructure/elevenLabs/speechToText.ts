import { SpeechToTextPort } from "interfaces";
import { elevenlabsClient } from "./elevenLabsClient";

export const speechToText: SpeechToTextPort = async ({ model, audioBlob }) => {
  const transcription = await elevenlabsClient.speechToText.convert({
    file: audioBlob,
    modelId: model,
  });

  return transcription.text;
};
