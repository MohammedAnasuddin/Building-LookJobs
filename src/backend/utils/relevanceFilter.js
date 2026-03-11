import dotenv from "dotenv";
dotenv.config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = "llama-3.1-8b-instant";

// ─────────────────────────────────────────────
// Rate limit safe delay between Groq calls
// 6000 TPM limit / ~220 tokens per call = ~27 calls/min max
// We do 1 call per 2.5s to stay safely under limit
// ─────────────────────────────────────────────
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const GROQ_DELAY_MS = 2500;

// ─────────────────────────────────────────────
// SINGLE JOB RELEVANCE CHECK
// ─────────────────────────────────────────────
const checkRelevance = async (job, requirements) => {
  try {
    if (!GROQ_API_KEY) {
      console.error("❌ [Groq] GROQ_API_KEY missing — check .env");
      return true;
    }

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
          max_tokens: 5,
          temperature: 0,
          messages: [
            {
              role: "system",
              content: `You are a job relevance classifier. You must reply with only the word true or false. No explanation. No punctuation. Just: true or false`,
            },
            {
              role: "user",
              content: `User wants: "${requirements.job_title}" jobs in "${requirements.location}". Internship: ${requirements.will_intern ? "yes" : "no"}. Fresher: ${requirements.is_fresher ? "yes" : "no"}.
Job: "${job.job_title}" at "${job.job_provider}" in "${job.job_location || requirements.location}". Remote: ${job.Remote ? "yes" : "no"}.
Is this job relevant? Be generous — related tech roles, frameworks, and specializations count as relevant. Reply true or false only.`,
            },
          ],
        }),
      },
    );

    const data = await response.json();

    if (data.error) {
      // Rate limited — wait and return true (fail open)
      if (data.error.message?.includes("Rate limit")) {
        console.log(
          `   ⏳ [Groq] Rate limited — waiting 60s then continuing...`,
        );
        await delay(60000);
        return true; // fail open for this job
      }
      console.error(`   ❌ [Groq] Error: ${data.error.message}`);
      return true;
    }

    const raw = data.choices?.[0]?.message?.content?.trim().toLowerCase();
    const isRelevant = raw?.startsWith("true");
    console.log(
      `   [Groq] "${job.job_title}" → ${isRelevant ? "✅ relevant" : "❌ not relevant"}`,
    );
    return isRelevant;
  } catch (err) {
    console.error(`   ❌ [Groq] Request failed: ${err.message}`);
    return true;
  }
};

// ─────────────────────────────────────────────
// MAIN EXPORT — sequential with delay
// Replaces Promise.all to avoid rate limiting
// ─────────────────────────────────────────────
export const filterRelevantJobs = async (jobs, requirements) => {
  const relevant = [];

  for (const job of jobs) {
    const isRelevant = await checkRelevance(job, requirements);
    if (isRelevant) relevant.push(job);
    await delay(GROQ_DELAY_MS); // stay under 6000 TPM
  }

  return relevant;
};
