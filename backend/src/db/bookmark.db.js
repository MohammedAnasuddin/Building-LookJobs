import pool from "./db_setup.js";

// =========================
// ADD BOOKMARK
// =========================

export const addBookmark = async ({ userId, jobUpdateId }) => {
  const result = await pool.query(
    `
    INSERT INTO bookmarks (
      user_id,
      job_update_id
    )
    VALUES ($1, $2)

    ON CONFLICT (user_id, job_update_id)
    DO NOTHING

    RETURNING *;
    `,
    [userId, jobUpdateId],
  );

  return result.rows[0];
};

// =========================
// REMOVE BOOKMARK
// =========================

export const removeBookmark = async ({ userId, jobUpdateId }) => {
  const result = await pool.query(
    `
    DELETE FROM bookmarks

    WHERE
      user_id = $1
      AND job_update_id = $2

    RETURNING *;
    `,
    [userId, jobUpdateId],
  );

  return result.rows[0];
};

// =========================
// GET BOOKMARKS
// =========================

export const getBookmarks = async (userId) => {
  const result = await pool.query(
    `
    SELECT
      b.id AS bookmark_id,

      jud.id,
      jud.job_title,
      jud.company,
      jud.job_provider,
      jud.job_location,
      jud.job_url,
      jud.added_on

    FROM bookmarks b

    JOIN job_update_details jud
    ON b.job_update_id = jud.id

    WHERE b.user_id = $1

    ORDER BY b.created_at DESC;
    `,
    [userId],
  );

  return result.rows;
};
