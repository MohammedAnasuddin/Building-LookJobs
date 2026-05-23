import { passesHardFilters } from "./hardFilters.js";

import { classifyJob } from "../ai/groq/classifyJob.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const GROQ_DELAY_MS = 2500;

export const filterRelevantJobs = async (jobs, requirements) => {
  const relevant = [];

  for (const job of jobs) {
    // =========================
    // HARD FILTERS
    // =========================

    const passed = passesHardFilters(job, requirements);

    if (!passed) {
      continue;
    }

    // =========================
    // AI FILTER
    // =========================

    const isRelevant = await classifyJob({
      job,
      requirements,
    });

    if (isRelevant) {
      relevant.push(job);
    }

    // =========================
    // RATE LIMIT SAFETY
    // =========================

    await delay(GROQ_DELAY_MS);
  }

  return relevant;
};
