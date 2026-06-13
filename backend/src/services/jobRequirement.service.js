import { getJobRequirementsByUserId } from "../db/get_job_requirements.js";
import { createJobRequirement } from "../db/create_job_requirement.js";
import { appendJobReqToUser } from "../db/append_job_req_to_user.js";
import { deleteJobRequirement } from "../db/delete_job_requirement.js";
import { removeJobReqFromUser } from "../db/remove_job_req_from_user.js";

import { runScrapeForJob } from "../scrapers/userScraper.js";

import { v4 as uuidv4 } from "uuid";

import { MAX_REQUIREMENTS } from "../constants/requirementsLimit.js";

// =========================
// CONFIG
// =========================

// =========================
// GET USER REQUIREMENTS
// =========================

export const getUserJobRequirementsService = async (userId) => {
  return await getJobRequirementsByUserId(userId);
};

// =========================
// CREATE REQUIREMENT
// =========================

export const createJobRequirementService = async ({
  userId,
  job_title,
  location,
  is_remote,
  is_intern,
  is_fresher,
}) => {
  // =========================
  // USER LIMIT CHECK
  // =========================

  const requirements = await getJobRequirementsByUserId(userId);

  if (requirements.length >= MAX_REQUIREMENTS) {
    throw new Error("REQUIREMENT_LIMIT_REACHED");
  }

  // =========================
  // GENERATE REQUIREMENT ID
  // =========================

  const jobReqId = `jid_${uuidv4()}`;

  // =========================
  // CREATE REQUIREMENT
  // =========================

  const requirement = await createJobRequirement({
    jobReqId,
    userId,
    job_title,
    location,
    is_remote,
    is_intern,
    is_fresher,
  });

  // =========================
  // CACHE JID IN USER
  // =========================

  await appendJobReqToUser({
    userId,
    jobReqId,
  });

  // =========================
  // START ASYNC SCRAPE
  // =========================

  runScrapeForJob(jobReqId).catch((err) =>
    console.error(`❌ Scrape failed for ${jobReqId}:`, err),
  );

  // =========================
  // RETURN RESPONSE
  // =========================

  return {
    ...requirement,

    scrape_status: requirement.scrape_status ?? "pending",

    scrape_stage: requirement.scrape_stage ?? "pending",

    progress: requirement.progress ?? 0,
  };
};

// =========================
// DELETE REQUIREMENT
// =========================

export const deleteJobRequirementService = async ({ userId, jobReqId }) => {
  const deleted = await deleteJobRequirement({
    userId,
    jobReqId,
  });

  // Requirement not found
  // OR user doesn't own it

  if (!deleted) {
    return null;
  }

  // Maintain cache consistency

  await removeJobReqFromUser({
    userId,
    jobReqId,
  });

  return deleted;
};
