import pool from "../db/db_setup.js";

/**
 * Store filtered jobs
 * into:
 * - job_update_details
 * - job_seen_index
 */
export async function storeResults(
  jobReqId,
  jobs,
) {
  if (!jobs || jobs.length === 0) {
    return;
  }

  // =========================
  // INSERT FEED ENTRIES
  // =========================

  const insertUpdateQuery = `
    INSERT INTO job_update_details (
      job_req_id,
      job_title,
      company,
      job_provider,
      job_location,
      job_url,
      is_internship,
      is_remote,
      is_fresher
    )
    VALUES (
      $1, $2, $3, $4, $5,
      $6, $7, $8, $9
    )
  `;

  // =========================
  // DEDUP INDEX
  // =========================

  const upsertSeenQuery = `
    INSERT INTO job_seen_index (
      platform_job_id,
      job_req_id,
      source,
      title,
      company,
      location,
      url,
      first_seen,
      last_seen,
      seen_count,
      is_active
    )
    VALUES (
      $1, $2, $3, $4, $5,
      $6, $7,
      NOW(),
      NOW(),
      1,
      true
    )

    ON CONFLICT (platform_job_id)

    DO UPDATE SET
      last_seen = NOW(),
      seen_count =
        job_seen_index.seen_count + 1,
      is_active = true,
      url = EXCLUDED.url;
  `;

  // =========================
  // STORE JOBS
  // =========================

  for (const job of jobs) {

    // 🔹 insert feed entry
    await pool.query(insertUpdateQuery, [
      jobReqId,
      job.job_title,
      job.company || null,
      job.source || null,
      job.job_location || null,
      job.job_URL || null,
      job.is_internship || false,
      job.is_remote || false,
      job.is_fresher || false,
    ]);

    // 🔹 update dedup index
    await pool.query(upsertSeenQuery, [
      job.job_id,
      jobReqId,
      job.source || null,
      job.job_title || null,
      job.company || null,
      job.job_location || null,
      job.job_URL || null,
    ]);
  }

  console.log(
    `✅ Stored ${jobs.length} jobs for ${jobReqId}`,
  );
}