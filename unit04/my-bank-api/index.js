import express from 'express';
import connectDb from './utils/dbConnection.js';
import { accountRouter } from './routes/accountRouter.js';
import { clientRouter } from './routes/clientRouter.js';
import { clientsRouter } from './routes/clientsRouter.js';

const app = express();
const port = 3000;

// connect to database
connectDb();

app.use(express.json());

app.use('/account', accountRouter);
app.use('/client', clientRouter);
app.use('/clients', clientsRouter);

app.listen(port, () => {
  console.log('API started');
})