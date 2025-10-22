import { tool } from "ai";
import { z } from "zod";
import { logger } from "../utils/logger";

export const emailVet = tool({
  description: "Email the vet with a subject and body.",
  inputSchema: z.object({
    subject: z.string().min(1),
    body: z.string().min(1),
  }),
  execute: async ({ subject, body }) => {
    logger.info("Email to vet (mock):", {
      to: "vet@example.com",
      subject,
      body,
    });
    return { queued: true };
  },
});
