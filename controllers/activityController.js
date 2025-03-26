import db from '../Module/db.js';

/**
 * Logs user activity in the `user_activity` table.
 * @param {number} userId - The ID of the user performing the action.
 * @param {string} actionType - The type of action (e.g., LOGIN, LOGOUT, UPDATE_PROFILE).
 * @param {string} activityType - The general category of the action.
 * @param {string} description - A brief description of the action.
 * @param {string} ipAddress - The IP address of the user.
 * @param {string} userAgent - The user agent (browser/device details).
 */
export const logUserActivity = async (userId, actionType, activityType, description, ipAddress, userAgent) => {
    try {
        const query = `
            INSERT INTO user_activity (user_id, action_type, activity_type, description, ip_address, user_agent, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, NOW())
        `;

        await db.query(query, [userId, actionType, activityType, description, ipAddress, userAgent]);
    } catch (error) {
        console.error("Error logging user activity:", error);
    }
};
