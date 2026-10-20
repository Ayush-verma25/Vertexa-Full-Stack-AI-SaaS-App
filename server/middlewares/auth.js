import { clerkClient } from "@clerk/express";

// Middleware to check userId and hasPremiumPlan
export const auth = async (req, res, next) => {
  try {
    const { userId, has } = await req.auth();
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication is required." });
    }

    const hasPremiumPlan = await has({ plan: "premium" });
    const user = await clerkClient.users.getUser(userId);
    const storedFreeUsage = user.privateMetadata?.free_usage;
    const freeUsage = Number(storedFreeUsage) || 0;

    if (!hasPremiumPlan && storedFreeUsage !== freeUsage) {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: freeUsage,
        },
      });
    }

    req.free_usage = freeUsage;
    req.plan = hasPremiumPlan ? "premium" : "free";
    return next();
  } catch (error) {
    console.error("Authentication middleware failed", error);
    return res
      .status(500)
      .json({ success: false, message: "Unable to verify your account." });
  }
};
