import { tool } from "ai";
import { z } from "zod";
import { logger } from "../utils/logger";

export const chewyAddToCart = tool({
  description: "Add an item to a shopping cart that will be reviewed by owner",
  inputSchema: z.object({
    item: z.string().min(1),
    qty: z.number().int().positive().optional(),
    notes: z.string().optional(),
  }),
  execute: async ({ item, qty, notes }) => {
    const cartItemId = `mock_${Date.now()}`;
    logger.info("Chewy cart (mock):", {
      item,
      qty: qty ?? 1,
      notes,
      cartItemId,
    });
    return { cartItemId };
  },
});
