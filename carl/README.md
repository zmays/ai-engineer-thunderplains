# Carl Wellbeing Agent (CLI)

Run a Node CLI agent that manages Carl's wellbeing using Vercel AI SDK Agents and Prisma-backed memory.

## Prereqs
- Postgres running (see root `package.json` db script)
- `OPENAI_API_KEY` in `.env`

## Env
Create `.env` in repo root:
```
DATABASE_URL=postgresql://postgres:testpass123@localhost:5432/ai?schema=public
OPENAI_API_KEY=sk-...
AI_MODEL=openai/gpt-5
TAVILY_API_KEY=tvly-... # optional
```

## Setup
```
pnpm run db:start
pnpm exec prisma generate
pnpm exec prisma migrate dev --name init
```

## Run
```
pnpm carl "I'm trying to take a nap with Carl..." --image /path/to/photo.jpg
```

Outputs final answer and shows step log.

References: Agents and Tools docs
- Agents: https://ai-sdk.dev/docs/agents/overview
- Tools: https://ai-sdk.dev/docs/foundations/tools
