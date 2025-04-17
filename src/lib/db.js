// Archivo integrado que maneja las conexiones tanto para MySQL como para MongoDB
import mysql from 'mysql2/promise';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Initialize dotenv to load environment variables
dotenv.config();

// === MySQL Connection (Original Project) ===
let mysqlConnection;
export const connectToMySQL = async () => {
    if (!mysqlConnection) {
        try {
            mysqlConnection = await mysql.createConnection({
                host: process.env.DATABASE_HOST,
                user: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASS,
                database: process.env.DATABASE_NAME,
            });
            console.log('MySQL database connected successfully');
        } catch (error) {
            console.error('MySQL database connection error:', error);
            throw error; // Re-throw to allow handling by caller
        }
    }
    return mysqlConnection;
};

export const disconnectMySQL = async () => {
    if (mysqlConnection) {
        await mysqlConnection.end();
        mysqlConnection = null;
        console.log('MySQL database disconnected');
    }
};

// === MongoDB Connection (Admin Project) ===
const mongoConnection = {};

export const connectToMongo = async () => {
    try {
        if (mongoConnection.isConnected) return;
        const db = await mongoose.connect(process.env.MONGO);
        mongoConnection.isConnected = db.connections[0].readyState;
        console.log('MongoDB database connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw new Error(error);
    }
};

// Compatibility function to maintain existing code
export const connect = connectToMySQL;
export const disconnect = disconnectMySQL;
export const connectToDB = connectToMongo;