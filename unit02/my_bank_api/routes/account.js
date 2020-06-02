import express from 'express';
import { promises as fs } from 'fs';

export var router = express.Router();

router.post('/', (req, res) => {
  fs.readFile(gFileName, gFileEnc)
    .then((fd) => {
      let json = JSON.parse(fd);
      let account = req.body;
      account = {
        id: json.nextId++,
        ...account,
      };
      json.accounts.push(account);

      fs.writeFile(gFileName, JSON.stringify(json)).then((fd) => {
        res.send({ id: account.id });
      });
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
});

router.get('/', (_, res) => {
  fs.readFile(gFileName, gFileEnc)
    .then((fd) => {
      let json = JSON.parse(fd);
      delete json.nextId;
      res.send(json);
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
});

router.get('/:id', (req, res) => {
  let status = 200;

  fs.readFile(gFileName, gFileEnc)
    .then((fd) => {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        status = 400;
        throw new Error('Invalid parameter');
      }

      const json = JSON.parse(fd);
      const account = json.accounts.find((account) => account.id === id);
      if (account) {
        res.send(account);
      } else {
        status = 404;
        throw new Error('ID not found');
      }
    })
    .catch((err) => {
      if (status == 200) status = 500;
      res.status(status).send({ error: err.message });
    });
});

router.delete('/:id', (req, res) => {
  let status = 200;

  fs.readFile(gFileName, gFileEnc)
    .then((fd) => {
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
      fs.writeFile(gFileName, JSON.stringify(json)).then(() => {
        res.end();
      });
    })
    .catch((err) => {
      if (status == 200) status = 500;
      res.status(status).send({ error: err.message });
    });
});

router.put('/', (req, res) => {
  fs.readFile(gFileName, gFileEnc)
    .then((fd) => {
      let json = JSON.parse(fd);
      let accountIdx = json.accounts.findIndex(
        (account) => account.id === newData.id
      );

      let newData = req.body;
      json.accounts[accountIdx] = newData;

      fs.writeFile(gFileName, JSON.stringify(json)).then(() => {
        res.end();
      });
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
});

router.patch('/transaction', (req, res) => {
  let status = 200;

  fs.readFile(gFileName, gFileEnc)
    .then((fd) => {
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
      fs.writeFile(gFileName, JSON.stringify(json)).then(() => {
        res.end();
      });
    })
    .catch((err) => {
      if (status == 200) status = 500;
      res.status(status).send({ error: err.message });
    });
});
