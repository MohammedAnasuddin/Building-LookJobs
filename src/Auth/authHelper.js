import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

export const getUserIdFromAuth0 = async (authToken) => {
    try {
        const AUTH0_DOMAIN = process.env.VITE_AUTH0_DOMAIN; // Corrected env variable usage
        if (!AUTH0_DOMAIN) throw new Error("❌ Auth0 domain is not set in environment variables.");

        const response = await fetch(`https://${AUTH0_DOMAIN}/userinfo`, {
            headers: { Authorization: `Bearer ${authToken}` }
        });

        if (!response.ok) {
            throw new Error(`❌ Failed to fetch user info: ${response.statusText}`);
        }

        const userData = await response.json();
        return userData?.sub || null; // ✅ Ensure `sub` is always returned

    } catch (error) {
        console.error("❌ Error fetching user ID from Auth0:", error.message);
        return null;
    }
};
