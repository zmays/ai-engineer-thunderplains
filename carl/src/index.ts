import "dotenv/config";
import { carlAgent } from "./agent";
import { logger } from "./utils/logger";
import * as fs from "fs";
import { ModelMessage } from "ai";
import { braintrustLogger } from "./braintrust/initLogger";

function parseArgs() {
  const args = process.argv.slice(2);
  let text = "";
  let imagePath: string | undefined;
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--image") {
      imagePath = args[++i];
    } else {
      text += (text ? " " : "") + a;
    }
  }
  if (!text) {
    console.error('Usage: pnpm carl "<update text>" [--image /path]');
    process.exit(1);
  }
  return { text, imagePath };
}

async function main() {
  const { text, imagePath } = parseArgs();
  const input = imagePath ? `${text}\n\n[Image provided: ${imagePath}]` : text;
  const messages: ModelMessage[] = [
    { role: "user", content: input },
    ...(imagePath
      ? [
          {
            role: "user" as const,
            content: [
              {
                type: "image" as const,
                image: fs.readFileSync(imagePath).toString("base64"),
              },
            ],
          },
        ]
      : []),
  ];
  const result = await carlAgent(messages);

  fs.writeFileSync("carl/response.json", JSON.stringify(result, null, 2));

  await braintrustLogger.flush();
}

main().catch((err) => {
  logger.error(err);
  process.exit(1);
});
