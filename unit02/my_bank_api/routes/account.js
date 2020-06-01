import express from 'express';
import fs from 'fs';

export var router = express.Router();

router.post('/', (req, res) => {
  let account = req.body;

  fs.readFile(gFileName, gFileEnc, (err, fd) => {
    try {
      let json = JSON.parse(fd);
      account = {
        id: json.nextId++,
        ...account,
      };
      json.accounts.push(account);

      fs.writeFile(gFileName, JSON.stringify(json), (err) => {
        try {
          res.send({ id: account.id });
        } catch {
          res.status(500).send({ error: err.message });
        }
      });
    } catch (error) {
      res.status(500).send({ error: err.message });
    }
  });
});

router.get('/', (_, res) => {
  fs.readFile(gFileName, gFileEnc, (err, data) => {
    try {
      let json = JSON.parse(data);
      delete json.nextId;
      res.send(json);
    } catch {
      res.status(500).send({ error: err.message });
    }
  });
});

router.get('/:id', (req, res) => {
  let status = 200;
  let id = parseInt(req.params.id);

  fs.readFile(gFileName, gFileEnc, (err, data) => {
    try {
      if (err) throw err;

      if (isNaN(id)) {
        status = 400;
        throw new Error('Invalid parameter');
      }

      let json = JSON.parse(data);
      const account = json.accounts.find((account) => account.id === id);
      if (account) {
        res.send(account);
      } else {
        status = 404;
        throw new Error('ID not found');
      }
    } catch (err) {
      if (status == 200) status = 500;
      res.status(status).send({ error: err.message });
    }
  });
});
