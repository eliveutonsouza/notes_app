import mongoose, { Error } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function connect(): Promise<void> {
    const connectionUrl = process.env.CONNECTION_URL_PROD;

    if (!connectionUrl) {
        process.exit(-1);
    }

    try {
        await mongoose.connect(connectionUrl, {
            serverSelectionTimeoutMS: 50000,
            bufferCommands: false,
        });

        console.log('database connected');
    } catch (error) {
        throw new Error('failed to connect a database');
    }
}

export = connect;
