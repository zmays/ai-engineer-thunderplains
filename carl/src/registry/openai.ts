import type { OpenAIResponsesProviderOptions } from "@ai-sdk/openai";
import { createOpenAI } from "@ai-sdk/openai";
import {
  customProvider,
  defaultSettingsMiddleware,
  wrapLanguageModel,
} from "ai";
import { braintrustLogger } from "../braintrust/initLogger";

const baseOpenai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const openai = customProvider({
  languageModels: {
    "gpt-5": wrapLanguageModel({
      model: baseOpenai("gpt-5"),
      middleware: [
        defaultSettingsMiddleware({
          settings: {
            providerOptions: {
              openai: {
                store: false,
                reasoningEffort: "medium",
                reasoningSummary: "auto",
              } satisfies OpenAIResponsesProviderOptions,
            },
          },
        }),
      ],
    }),
  },
});
