import sql from "../configs/db.js";

export const getUserCreations = async (req, res) => {
  try {
    const { userId } = req.auth();

    const creations =
      await sql`SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC`;

    res.json({ success: true, creations });
  } catch (error) {
    console.error("Loading user creations failed", error);
    return res
      .status(500)
      .json({ success: false, message: "Unable to load your creations." });
  }
};

export const getPublishedCreations = async (req, res) => {
  try {
    const creations = await sql`
      SELECT * FROM creations WHERE publish = true ORDER BY created_at DESC`;

    res.json({ success: true, creations });
  } catch (error) {
    console.error("Loading published creations failed", error);
    return res
      .status(500)
      .json({ success: false, message: "Unable to load community creations." });
  }
};

export const toggleLikecreations = async (req, res) => {
  try {
    const { userId } = req.auth();

    const { id } = req.body ?? {};

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Creation ID is required." });
    }

    const userIdStr = String(userId);
    const [creation] = await sql`
      UPDATE creations
      SET likes = CASE
        WHEN ${userIdStr} = ANY(COALESCE(likes, ARRAY[]::text[]))
          THEN array_remove(COALESCE(likes, ARRAY[]::text[]), ${userIdStr})
        ELSE array_append(COALESCE(likes, ARRAY[]::text[]), ${userIdStr})
      END
      WHERE id = ${id} AND publish = true
      RETURNING likes
    `;

    if (!creation) {
      return res
        .status(404)
        .json({ success: false, message: "Published creation not found." });
    }

    const likes = creation.likes ?? [];
    const liked = likes.includes(userIdStr);

    return res.json({
      success: true,
      liked,
      likes,
      message: liked ? "Creation liked." : "Creation unliked.",
    });
  } catch (error) {
    console.error("Toggling creation like failed", error);
    return res
      .status(500)
      .json({ success: false, message: "Unable to update the like." });
  }
};
