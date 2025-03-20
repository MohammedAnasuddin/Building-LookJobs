import pool from './db_setup.js';
import { v4 as uuidv4 } from 'uuid';


export const addNewJob = async (userId, jobData) => {
    const jobId = `job_${uuidv4()}`; // Generate unique job_id

    try {
        await pool.query('BEGIN'); // Start transaction

        // 1️⃣ Insert job requirements
        const jobQuery = `
            INSERT INTO job_requirements (job_id, job_title, location, can_remote, is_fresher, will_intern)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        await pool.query(jobQuery, [
            jobId,
            jobData.job_title,
            jobData.location,
            jobData.canRemote,
            jobData.willIntern,
            jobData.isFresher
        ]);

        // 2️⃣ Add job_id to user's job list
        const userQuery = `
        UPDATE users
        SET jid_array = ARRAY_APPEND(jid_array, $1)
        WHERE user_id = $2
      `;
        await pool.query(userQuery, [jobId, userId]);

        // 3️⃣ Create an empty job_updates entry
        const updatesQuery = `INSERT INTO job_updates (job_id, updates) VALUES ($1, ARRAY[]::JSONB[])`;
        await pool.query(updatesQuery, [jobId]);

        await pool.query('COMMIT'); // Commit transaction

        console.log("✅Job added successfully with job_id:",jobId);
        return { success: true, jobId };
    } catch (error) {
        await pool.query('ROLLBACK'); // Rollback transaction on failure
        console.error("❌ Error adding job:", error);
        return { success: false, error };
    }
};
