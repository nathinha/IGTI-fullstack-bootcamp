import express from 'express';
import { deleteClient } from '../controllers/client.js';

export const clientRouter = express.Router();

clientRouter.delete('/delete', async (req, res) => {
  let { agencia, conta } = req.body;
  try {
    const accounts = await deleteClient(agencia, conta);
    res.send(accounts);
  }
  catch (err) {
    res.status(err.statusCode).send({ error: err.message });
  }
});