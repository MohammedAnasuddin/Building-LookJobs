import { getJobRequirementsByUserId } from "../db/get_job_requirements.js";
import { createJobRequirement } from "../db/create_job_requirement.js";
import { appendJobReqToUser } from "../db/append_job_req_to_user.js";
import { deleteJobRequirement } from "../db/delete_job_requirement.js";
import { runScrapeForJob } from "../scrapers/userScraper.js";
import { removeJobReqFromUser } from "../db/remove_job_req_from_user.js";

export const getUserJobRequirementsService = async (userId) => {
  return await getJobRequirementsByUserId(userId);
};

import { v4 as uuidv4 } from "uuid";
const requirements =
  await getJobRequirementsByUserId(userId);

if (requirements.length >3 ) {
  throw new Error(
    "Maximum 3 job requirements allowed"
  );
}

export const createJobRequirementService =
  async ({
    userId,
    job_title,
    location,
    is_remote,
    is_intern,
    is_fresher,
  }) => {

    const jobReqId =
      `jid_${uuidv4()}`;

    // =========================
    // CREATE REQUIREMENT
    // =========================

    const requirement =
      await createJobRequirement({
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

    runScrapeForJob(jobReqId)
      .catch((err) =>
        console.error(
          `❌ Scrape failed for ${jobReqId}:`,
          err
        )
      );

    // =========================
    // RETURN REQUIREMENT
    // =========================

    return {
      ...requirement,

      scrape_status:
        requirement.scrape_status ||
        "pending",
    };
  };



export const deleteJobRequirementService =
  async ({
    userId,
    jobReqId,
  }) => {

    // 🔥 delete requirement
    const deleted =
      await deleteJobRequirement({
        userId,
        jobReqId,
      });

    // ❌ not found / not owner
    if (!deleted) {
      return null;
    }

    // 🔥 maintain cache consistency
    await removeJobReqFromUser({
      userId,
      jobReqId,
    });

    return deleted;
  };
