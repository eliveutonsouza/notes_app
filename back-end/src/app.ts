import express, { Request, Response } from 'express';
import db from './database/connection';
const app = express();

db();
app.get('/', (req: Request, res: Response) => {
    res.send('it works :)');
});

export = app;
