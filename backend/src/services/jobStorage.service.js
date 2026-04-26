import pool from "../db/db_setup.js";
import moment from "moment";

const scrapeDate = moment().utc().format("YYYY-MM-DD");

/**
 * Store results (JSONB + dedup index)
 */
export async function storeResults(jobId, jobs) {
  if (!jobs || jobs.length === 0) return;

  // 🔹 1. Upsert JSONB results
  const upsertResultsQuery = `
    INSERT INTO public.job_scrape_results (job_id, jobs_by_date)
    VALUES ($1, jsonb_build_object($2::text, $3::jsonb))
    ON CONFLICT (job_id)
    DO UPDATE SET
      jobs_by_date = public.job_scrape_results.jobs_by_date ||
                     jsonb_build_object($2::text, $3::jsonb),
      updated_at = NOW();
  `;

  await pool.query(upsertResultsQuery, [
    jobId,
    scrapeDate,
    JSON.stringify(jobs),
  ]);

  // 🔹 2. Dedup index
  const upsertIndexQuery = `
    INSERT INTO public.job_seen_index
      (platform_job_id, job_id, source, title, company, location, url, first_seen, last_seen, seen_count, is_active)
    VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW(), 1, true)
    ON CONFLICT (platform_job_id)
    DO UPDATE SET
      last_seen = NOW(),
      seen_count = public.job_seen_index.seen_count + 1,
      is_active = true,
      url = EXCLUDED.url;
  `;

  for (const job of jobs) {
    await pool.query(upsertIndexQuery, [
      job.job_id,
      jobId,
      job.source,
      job.job_title,
      job.job_provider,
      job.job_location,
      job.job_URL,
    ]);
  }
}