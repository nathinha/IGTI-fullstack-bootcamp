import express from 'express';
import accountModel from '../models/account.js';
import { getBalance, credit, withdraw, transfer } from '../controllers/accounts.js';

export const accountRouter = express.Router();

const WITHDRAW_TAX = 1;
const TRANSFER_TAX = 1;

accountRouter.get('/balance', async (req, res) => {
  let { agencia, conta } = req.body;
  try {
    const balance = await getBalance(agencia, conta);
    res.send(balance);
  } catch (err) {
    res.status(err.statusCode).send({ error: err.message });
  }
});

accountRouter.patch('/deposit', async (req, res) => {
  let { agencia, conta, value } = req.body;
  try {
    const balance = await credit(agencia, conta, value);
    res.send(balance);
  } catch (err) {
    res.status(err.statusCode).send({ error: err.message });
  }
});

accountRouter.patch('/withdraw', async (req, res) => {
  let { agencia, conta, value } = req.body;
  try {
    const balance = await withdraw(agencia, conta, value);
    res.send(balance);
  } catch (err) {
    res.status(err.statusCode).send({ error: err.message });
  }
});

accountRouter.patch('/transfer', async (req, res) => {
  let { origin, destination, value } = req.body;
  try {
    const balance = await transfer(origin, destination, value);
    res.send(balance);
  } catch (err) {
    res.status(err.statusCode).send({ error: err.message });
  }
});