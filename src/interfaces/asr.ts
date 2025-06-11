export type SpeechToTextArgs = {
  model: string;
  audioBlob: Blob;
};

export interface SpeechToTextPort {
  (args: SpeechToTextArgs): Promise<string>;
}
