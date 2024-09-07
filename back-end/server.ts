import app from './src/app';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT_APP || 3000;

app.listen(port, () => {
    console.log('app run on port 3000');
});
