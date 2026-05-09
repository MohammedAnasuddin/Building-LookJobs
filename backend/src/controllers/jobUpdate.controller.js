import { getJobUpdatesService } from "../services/jobUpdate.service.js";

export const getJobUpdatesController = async (req, res) => {
  try {
    const userId = req.user.sub;

    const { id } = req.params;

    const updates = await getJobUpdatesService({
      userId,
      jobReqId: id,
    });

    return res.status(200).json({
      success: false,
      data: updates,
    });
  } catch (error) {
    console.error("❌ Error fetching updates:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch updates",
    });
  }
};
