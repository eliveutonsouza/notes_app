import app from './src/app';
import connect from './src/database/connection'; // Adjust the import path if necessary
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT_APP || 3000;

async function startServer() {
    try {
        await connect();
        app.listen(port, () => {
            console.log(`App running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
