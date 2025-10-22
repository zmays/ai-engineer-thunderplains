import { initLogger } from "braintrust";

export const braintrustLogger = initLogger({
  projectName: "thunderplains",
  apiKey: process.env.BRAINTRUST_API_KEY,
});
