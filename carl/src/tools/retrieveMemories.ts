import { tool } from "ai";
import { z } from "zod";
import { prisma } from "../db/prisma";

export const retrieveMemories = tool({
  description: "Retrieve stored memories/facts with optional filters.",
  inputSchema: z.object({
    query: z.string().optional(),
    tags: z.array(z.string()).optional(),
    category: z.enum(["owner_pref", "dog_fact", "observation"]).optional(),
    limit: z.number().int().positive().max(50).optional(),
  }),
  execute: async ({ query, tags, category, limit }) => {
    const memories = await prisma.memory.findMany({
      where: {
        AND: [
          query ? { content: { contains: query, mode: "insensitive" } } : {},
          tags && tags.length > 0 ? { tags: { hasSome: tags } } : {},
          category ? { category } : {},
        ],
      },
      orderBy: { createdAt: "desc" },
      take: limit ?? 10,
    });
    return { memories };
  },
});
