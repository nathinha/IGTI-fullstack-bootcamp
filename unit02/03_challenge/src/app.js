import express from 'express';
import { gradesRouter } from './routes/grades.js';
import { studentRouter } from './routes/student.js';

export const app = express();

app.use(express.json());
app.use('/grades', gradesRouter);
app.use('/student', studentRouter);
