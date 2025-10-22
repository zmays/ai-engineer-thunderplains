import { tool } from "ai";
import z from "zod";

export const getCurrentTime = tool({
  description: "Get the current time in ISO and the local timezone.",
  inputSchema: z.object({}),
  execute: async () => {
    const now = new Date();
    return {
      iso: now.toISOString(),
      tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  },
});
