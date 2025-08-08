# Cloutline

AI Reels Hook Generator (React + Vite + Tailwind + Firebase + Serverless OpenAI)

## Setup (local)
1. `git clone <repo>`
2. `cd cloutline`
3. `npm install`
4. Create `.env` with any local vars you need (do NOT put OpenAI key in client).
5. `npm run dev`

## Deploy
- Push repo to GitHub.
- Import repository into Vercel.
- In Vercel project settings → Environment Variables add:
  - `OPENAI_API_KEY` = your OpenAI secret
- Deploy. The serverless function `api/generate.js` will use the env var.

## Notes
- Fill your Firebase web config in `src/firebase.js`.
- Do NOT put OpenAI key in frontend code.
