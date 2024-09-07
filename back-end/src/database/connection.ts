import mongoose, { Error } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
async function connect(): Promise<void> {
    const connectionUrl = process.env.CONNECTION_URL_LOCAL;

    if (!connectionUrl) {
        process.exit(-1);
    }

    try {
        await mongoose.connect(connectionUrl);
        console.log('database Connected');
    } catch (error) {
        console.log(error);
        throw new Error('Failed to connect database');
    }
}

export = connect;
