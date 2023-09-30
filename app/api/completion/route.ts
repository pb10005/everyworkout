import { HfInference, HfInferenceEndpoint } from '@huggingface/inference';
import { HuggingFaceStream, StreamingTextResponse } from 'ai';
import { env } from '../../../src/env/server.mjs';

type RequestProps = {
  prompt: string
}

// Create a new Hugging Face Inference instance
// const Hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

const endpointUrl = env.HUGGINGFACE_URL;
const Hf = new HfInferenceEndpoint(
  endpointUrl,
  env.HUGGINGFACE_API_KEY,
);

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await <Promise<RequestProps>>req.json();

  const BOS_TOKEN = "<s>";
  const B_INST = "[INST]";
  const E_INST = "[/INST]";
  const B_SYS = "<<SYS>>\n";
  const E_SYS = "\n<</SYS>>\n\n";
  const DEFAULT_SYSTEM_PROMPT = "あなたは専門的なウェイトトレーニングのインストラクターです。トレーニーの成長とモチベーション向上をサポートします。";
  const INSTRUCTION = "\n\n以上のトレーニーのワークアウト記録について、アドバイスとコメントをしてください。箇条書きのMarkdown形式で出力してください。";

  const text = `${BOS_TOKEN}${B_INST}${B_SYS}${DEFAULT_SYSTEM_PROMPT}${E_SYS}${prompt}${INSTRUCTION}${E_INST}\n`;
  const response = Hf.textGenerationStream({
    // model: 'OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5',
    inputs: text,
    parameters: {
      max_new_tokens: 256,
      do_sample: true,
      top_p: 0.9,
      truncate: 1000,
      repetition_penalty: 1,
      return_full_text: false
    },
  });

  // Convert the response into a friendly text-stream
  const stream = HuggingFaceStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}