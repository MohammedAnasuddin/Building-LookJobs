import {
  getUserProfileService,
  registerUserService,
  getCurrentUserService,
} from "../services/user.service.js";

export const getUserProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await getUserProfileService(userId);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ message: "Profile fetch failed" });
  }
};

export const registerUser = async (req, res) => {
  const { userId, name, email } = req.body;

  if (!userId || !name || !email) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const result = await registerUserService(userId, name, email);

    if (result.success) {
      return res.status(201).json({
        message: "User registered successfully!",
        user: result.user,
      });
    }

    return res.status(500).json({
      message: "Failed to register user",
      error: result.error,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};



export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.sub;

    const user = await getCurrentUserService(userId);

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("❌ Error fetching current user:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
};