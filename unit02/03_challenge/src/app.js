import express from 'express';
import { gradesRouter } from './routes/grades.js';

export const app = express();

app.use(express.json());
app.use('/grades', gradesRouter);
