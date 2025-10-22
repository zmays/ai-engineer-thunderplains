import { tool } from "ai";
import { z } from "zod";
import { prisma } from "../db/prisma";

export const storeMemory = tool({
  description: "Store a memory/fact about Carl or the owner.",
  inputSchema: z.object({
    content: z.string().min(1),
    category: z.enum(["owner_pref", "dog_fact", "observation"]),
    tags: z.array(z.string()).optional(),
    source: z.string().optional(),
    imagePath: z.string().optional(),
  }),
  execute: async ({ content, category, tags, source, imagePath }) => {
    const created = await prisma.memory.create({
      data: { content, category, tags: tags ?? [], source, imagePath },
      select: { id: true },
    });
    return created;
  },
});
