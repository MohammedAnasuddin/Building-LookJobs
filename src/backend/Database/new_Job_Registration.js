import pool from './db_setup.js';
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";
import scrapeJobs from '../Scrapers/scraperService.js'






export const addNewJob = async (userId, jobData) => {
    const formattedDateTime = moment().format("YYYY-MM-DD HH:mm:ss"); 
    const jobId = `job_${uuidv4()}`; // Generate unique job_id


    console.log("Added on: ",formattedDateTime)

    try {
        await pool.query('BEGIN'); // Start transaction
    
       

        // Example: "20-Mar-2025 14:30:45"
    
        // 1️⃣ Insert job requirements
        const jobQuery = `
        INSERT INTO job_requirements (job_id, job_added_date, job_title, location, can_remote, is_fresher, will_intern)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    await pool.query(jobQuery, [
        jobId,
        formattedDateTime,  // ✅ Use JavaScript Date object here (PostgreSQL will store it correctly)
        jobData.job_title,
        jobData.location,
        jobData.canRemote,
        jobData.isFresher,
        jobData.willIntern
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
    
        console.log(`✅ Job added successfully with job_id: ${jobId} on ${formattedDateTime}`);
        
        //Scraping the jobs for the first time
        await scrapeJobs(jobId);


        return { success: true, jobId };

        
    } catch (error) {
        await pool.query('ROLLBACK'); // Rollback transaction on error
        console.error("❌ Error adding job:", error);
        return { success: false, error };
    }
};
