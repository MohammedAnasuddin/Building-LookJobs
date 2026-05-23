import dotenv from "dotenv";

dotenv.config();

import { buildRelevancePrompt } from "../prompts/relevance.prompt.js";

const GROQ_API_KEY = process.env.GROQ_API_KEY;

const GROQ_MODEL = "llama-3.1-8b-instant";

export const classifyJob = async ({ job, requirements }) => {
  try {
    const messages = buildRelevancePrompt({
      job,
      requirements,
    });

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,

          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          model: GROQ_MODEL,

          temperature: 0,

          max_tokens: 5,

          messages,
        }),
      },
    );

    const data = await response.json();

    const raw = data?.choices?.[0]?.message?.content?.trim()?.toLowerCase();

    const isRelevant = raw === "true";

    console.log(
      `[AI] ${job.job_title} → ${isRelevant ? "✅ relevant" : "❌ irrelevant"}`,
    );

    return isRelevant;
  } catch (err) {
    console.error("❌ AI classify error:", err.message);

    // fail open
    return true;
  }
};
