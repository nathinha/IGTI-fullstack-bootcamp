import express from 'express';
import { accountRouter } from './routes/accountRouter.js';
import connectDb from './utils/dbConnection.js';

const app = express();
const port = 3000;

// connect to database
connectDb();

app.use(express.json());

app.use('/account', accountRouter);

app.listen(port, () => {
  console.log('API started');
})