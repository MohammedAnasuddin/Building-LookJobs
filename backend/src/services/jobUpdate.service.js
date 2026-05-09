import { getJobUpdates }
from "../db/get_job_updates.js";

export const getJobUpdatesService =
  async ({
    userId,
    jobReqId,
  }) => {

    return await getJobUpdates({
      userId,
      jobReqId,
    });
  };