import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Initialize dotenv to load environment variables
dotenv.config();

let connection;
export const connect = async () => {
    if (!connection) {
        try {
            connection = await mysql.createConnection({
                host: process.env.DATABASE_HOST,
                user: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASS,
                database: process.env.DATABASE_NAME,
            });
            console.log('Database connected successfully');
        } catch (error) {
            console.error('Database connection error:', error);
            throw error; // Re-throw to allow handling by caller
        }
    }
    return connection;
}

// Optional: Add a function to close the connection
export const disconnect = async () => {
    if (connection) {
        await connection.end();
        connection = null;
        console.log('Database disconnected');
    }
}
