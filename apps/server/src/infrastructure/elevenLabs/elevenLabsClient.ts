import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

export const elevenlabsClient = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});
