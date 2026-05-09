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

export const createJobRequirementService = async ({
  userId,
  job_title,
  location,
  is_remote,
  is_intern,
  is_fresher,
}) => {
  const jobReqId = `jid_${uuidv4()}`;

  const requirement = await createJobRequirement({
    jobReqId,
    userId,
    job_title,
    location,
    is_remote,
    is_intern,
    is_fresher,
  });

  await appendJobReqToUser({
    userId,
    jobReqId,
  });

  console.log("Scraping on Hold for Development Purposes");
  // runScrapeForJob(jobReqId)
  //   .catch((err) =>
  //     console.error(
  //       "❌ Scrape failed:",
  //       err
  //     )
  //   );

  return requirement;
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
