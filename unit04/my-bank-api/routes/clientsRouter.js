import express from 'express';
import { getAverageBalance, getLowestBalance, getHighestBalance, setPrivateBranch } from '../controllers/clients.js';

export const clientsRouter = express.Router();

clientsRouter.get('/average/:branch', async (req, res) => {
  const branch = parseInt(req.params.branch);
  try {
    const average = await getAverageBalance(branch);
    res.send(average);
  }
  catch (err) {
    res.status(err.statusCode).send({ error: err.message });
  }
});

clientsRouter.get('/lowest/:qty', async (req, res) => {
  const qty = parseInt(req.params.qty);
  try {
    const lowestBalance = await getLowestBalance(qty);
    res.send(lowestBalance);
  }
  catch (err) {
    res.status(err.statusCode).send({ error: err.message });
  }
});

clientsRouter.get('/highest/:qty', async (req, res) => {
  const qty = parseInt(req.params.qty);
  try {
    const highestBalance = await getHighestBalance(qty);
    res.send(highestBalance);
  }
  catch (err) {
    res.status(err.statusCode).send({ error: err.message });
  }
});

clientsRouter.patch('/private', async (_, res) => {
  try {
    const privates = await setPrivateBranch();
    res.send(privates);
  }
  catch (err) {
    res.status(err.statusCode).send({ error: err.message });
  }
});