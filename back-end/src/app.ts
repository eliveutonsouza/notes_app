import express from 'express';
import route from './routes/routes';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(route);

export = app;
