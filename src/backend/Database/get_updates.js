import pool from './db_setup.js';

export const getJobUpdatesForUser = async (userId) => {
    try {
        console.log("📥 Inside fetching logic function");

        if (!userId) {
            console.error("❌ User ID not found. Authentication failed.");
            return { success: false, message: "User authentication failed." };
        }

        console.log(`✅ Authenticated user: ${userId}`);

        
        const userRes = await pool.query(
            'SELECT jid_array FROM users WHERE user_id = $1',
            [userId]
        );

        if (userRes.rows.length === 0) {
            console.warn(`❌ No user found with userId: ${userId}`);
            return { success: false, message: "User not found" };
        }

        const jidArray = userRes.rows[0].jid_array;

        if (!Array.isArray(jidArray) || jidArray.length === 0) {
            console.info("ℹ️ No job IDs found for this user.");
            return { success: true, jobUpdates: [] };
        }

        
        const updateRes = await pool.query(
          `SELECT job_id AS jid, title, description, updates
           FROM job_updates
           WHERE job_id = ANY($1::text[])`,  
          [jidArray]
        );
        

        return {
            success: true,
            jobUpdates: updateRes.rows
        };

    } catch (error) {
        console.error("❌ Error fetching job updates:", error.message);
        return { success: false, error: error.message };
    }
};
