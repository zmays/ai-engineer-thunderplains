// https://ai-sdk.dev/docs/ai-sdk-core/provider-management
import { createProviderRegistry } from "ai";
import { openai } from "./openai";

const separator = ":";

const providers = {
  openai,
};

export const registry = createProviderRegistry(
  {
    ...providers,
  },
  { separator }
);
