import express from 'express';
import { promises as fs } from 'fs';

export var router = express.Router();

router.post('/', async (req, res) => {
  try {
    let fd = await fs.readFile(gFileName, gFileEnc);

    let json = JSON.parse(fd);

    let account = req.body;
    account = {
      id: json.nextId++,
      ...account,
    };
    json.accounts.push(account);

    await fs.writeFile(gFileName, JSON.stringify(json));
    res.send({ id: account.id });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get('/', async (_, res) => {
  try {
    let fd = await fs.readFile(gFileName, gFileEnc);
    let json = JSON.parse(fd);
    delete json.nextId;
    res.send(json);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  let status = 200;

  try {
    let fd = await fs.readFile(gFileName, gFileEnc);
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      status = 400;
      throw new Error('Invalid account identifier');
    }

    const json = JSON.parse(fd);
    const account = json.accounts.find((account) => account.id === id);
    if (account) {
      res.send(account);
    } else {
      status = 404;
      throw new Error('Account not found');
    }
  } catch (err) {
    if (status == 200) status = 500;
    res.status(status).send({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  let status = 200;

  try {
    let fd = await fs.readFile(gFileName, gFileEnc);
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      status = 400;
      throw new Error('Invalid account identifier');
    }

    let json = JSON.parse(fd);
    const account = json.accounts.find((account) => account.id === id);
    if (!account) {
      status = 404;
      throw new Error('Account not found');
    }

    const accounts = json.accounts.filter((account) => account.id !== id);
    json.accounts = accounts;
    await fs.writeFile(gFileName, JSON.stringify(json));
    res.end();
  } catch (err) {
    if (status == 200) status = 500;
    res.status(status).send({ error: err.message });
  }
});

router.put('/', async (req, res) => {
  let status = 200;
  let newData = req.body;

  try {
    let fd = await fs.readFile(gFileName, gFileEnc);
    let json = JSON.parse(fd);
    let accountIdx = json.accounts.findIndex(
      (account) => account.id === newData.id
    );

    if (accountIdx < 0) {
      status = 404;
      throw new Error('Account not found');
    }

    json.accounts[accountIdx] = newData;

    await fs.writeFile(gFileName, JSON.stringify(json));
    res.end();
  } catch (err) {
    if (status == 200) status = 500;
    res.status(status).send({ error: err.message });
  }
});

router.patch('/transaction', async (req, res) => {
  let status = 200;

  try {
    let fd = await fs.readFile(gFileName, gFileEnc);
    let json = JSON.parse(fd);
    let params = req.body;
    let accountIdx = json.accounts.findIndex(
      (account) => account.id === params.id
    );

    if (accountIdx === -1) {
      status = 404;
      throw new Error('Account not found');
    }

    if (
      params.value < 0 &&
      json.accounts[accountIdx].balance + params.value < 0
    ) {
      status = 400;
      throw new Error('Insuficient funds');
    }
    json.accounts[accountIdx].balance += params.value;
    await fs.writeFile(gFileName, JSON.stringify(json));
    res.end();
  } catch (err) {
    if (status == 200) status = 500;
    res.status(status).send({ error: err.message });
  }
});
