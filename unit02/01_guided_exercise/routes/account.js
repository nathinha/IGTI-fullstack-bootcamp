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

    gLogger.info(`POST /account - id[${account.id}] created`);
  } catch (err) {
    gLogger.error(`POST /account - ${err.message}`);
    res.status(500).send({ error: err.message });
  }
});

router.get('/', async (_, res) => {
  try {
    let fd = await fs.readFile(gFileName, gFileEnc);
    let json = JSON.parse(fd);
    delete json.nextId;
    res.send(json);
    gLogger.info(`GET /account - ${JSON.stringify(json)}`);
  } catch (err) {
    gLogger.error(`GET /account - ${err.message}`);
    res.status(500).send({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  let status = 200;
  const id = parseInt(req.params.id);

  try {
    let fd = await fs.readFile(gFileName, gFileEnc);
    if (isNaN(id)) {
      status = 400;
      throw new Error('Invalid account identifier');
    }

    const json = JSON.parse(fd);
    const account = json.accounts.find((account) => account.id === id);
    if (!account) {
      status = 404;
      throw new Error('Account not found');
    } else {
      gLogger.info(`GET /account/:id - ${JSON.stringify(account)}`);
      res.send(account);
    }
  } catch (err) {
    if (status == 200) status = 500;

    gLogger.error(`GET /account/:id - id[${id}] - ${err.message}`);
    res.status(status).send({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  let status = 200;
  const id = parseInt(req.params.id);

  try {
    let fd = await fs.readFile(gFileName, gFileEnc);
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

    gLogger.info(
      `DELETE /account/:id - id[${id}] - ${JSON.stringify(account)}`
    );
    res.end();
  } catch (err) {
    if (status == 200) status = 500;

    gLogger.error(`DELETE /account/:id - id[${id}] - ${err.message}`);
    res.status(status).send({ error: err.message });
  }
});

router.put('/', async (req, res) => {
  let status = 200;
  let params = req.body;

  try {
    let fd = await fs.readFile(gFileName, gFileEnc);
    let json = JSON.parse(fd);

    let accountIdx = json.accounts.findIndex(
      (account) => account.id === params.id
    );

    if (accountIdx < 0) {
      status = 404;
      throw new Error('Account not found');
    }

    json.accounts[accountIdx] = params;
    await fs.writeFile(gFileName, JSON.stringify(json));

    gLogger.info(
      `PUT /account - id[${accountIdx}] - ${JSON.stringify(params)}`
    );
    res.end();
  } catch (err) {
    if (status == 200) status = 500;

    gLogger.error(`PUT /account - id[${params.id}] - ${err.message}`);
    res.status(status).send({ error: err.message });
  }
});

router.patch('/transaction', async (req, res) => {
  let status = 200;
  let params = req.body;

  try {
    let fd = await fs.readFile(gFileName, gFileEnc);
    let json = JSON.parse(fd);
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

    gLogger.info(
      `PATCH /account - id[${accountIdx}] - ${JSON.stringify(
        json.accounts[accountIdx]
      )}`
    );
    res.end();
  } catch (err) {
    if (status == 200) status = 500;

    gLogger.error(`PATCH /account - id[${params.id}] - ${err.message}`);
    res.status(status).send({ error: err.message });
  }
});
