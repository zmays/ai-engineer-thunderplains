import { stepCountIs, ModelMessage } from "ai";
import { storeMemory } from "./tools/storeMemory";
import { retrieveMemories } from "./tools/retrieveMemories";
import { getCurrentTime } from "./tools/getCurrentTime";
import { chewyAddToCart } from "./tools/chewyAddToCart";
import { emailVet } from "./tools/emailVet";
import { openai } from "@ai-sdk/openai";
import { registry } from "./registry";
import * as fs from "fs";
import path from "path";
import { wrapAISDK } from "braintrust";
import * as ai from "ai";

const sytemPrompt = fs.readFileSync(
  path.resolve(process.cwd(), "carl/system-prompt.txt"),
  "utf8"
);

const { generateText } = wrapAISDK(ai);

export function carlAgent(messages: ModelMessage[]) {
  return generateText({
    messages: [{ role: "system" as const, content: sytemPrompt }, ...messages],
    model: registry.languageModel("openai:gpt-5"),
    tools: {
      storeMemory,
      retrieveMemories,
      webSearch: openai.tools.webSearch({
        searchContextSize: "high",
        userLocation: {
          type: "approximate",
          city: "Oklahoma City",
          region: "Oklahoma",
        },
      }),
      getCurrentTime,
      chewyAddToCart,
      emailVet,
    },
    stopWhen: stepCountIs(20),
  });
}
