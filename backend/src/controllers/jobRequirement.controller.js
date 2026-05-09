import {
    getUserJobRequirementsService,
    createJobRequirementService,
    deleteJobRequirementService,
} from "../services/jobRequirement.service.js";



export const getUserJobRequirements =
  async (req, res) => {
    try {
      const userId = req.user.sub;

      const requirements =
        await getUserJobRequirementsService(
          userId
        );

      return res.status(200).json({
        success: true,
        data: requirements,
      });
    } catch (error) {
      console.error(
        "❌ Error fetching job requirements:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch job requirements",
      });
    }
  };




export const createJobRequirementController =
  async (req, res) => {
    try {
      const userId = req.user.sub;

      const {
        job_title,
        location,
        is_remote,
        is_intern,
        is_fresher,
      } = req.body;

      const requirement =
        await createJobRequirementService({
          userId,
          job_title,
          location,
          is_remote,
          is_intern,
          is_fresher,
        });

      return res.status(201).json({
        success: true,
        data: requirement,
      });
    } catch (error) {
      console.error(
        "❌ Error creating requirement:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to create requirement",
      });
    }
  };




export const deleteJobRequirementController =
  async (req, res) => {
    try {
      const userId = req.user.sub;

      const { id } = req.params;

      const deleted =
        await deleteJobRequirementService({
          userId,
          jobReqId: id,
        });

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message:
            "Requirement not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: deleted,
      });
    } catch (error) {
      console.error(
        "❌ Error deleting requirement:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to delete requirement",
      });
    }
  };

