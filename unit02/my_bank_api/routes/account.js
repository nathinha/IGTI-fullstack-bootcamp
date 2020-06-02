import express from 'express';
import fs from 'fs';

export var router = express.Router();

router.post('/', (req, res) => {
  let account = req.body;

  fs.readFile(gFileName, gFileEnc, (err, fd) => {
    try {
      if (err) throw err;

      let json = JSON.parse(fd);
      account = {
        id: json.nextId++,
        ...account,
      };
      json.accounts.push(account);

      fs.writeFile(gFileName, JSON.stringify(json), (err) => {
        try {
          if (err) throw err;

          res.send({ id: account.id });
        } catch (error) {
          res.status(500).send({ error: error.message });
        }
      });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });
});

router.get('/', (_, res) => {
  fs.readFile(gFileName, gFileEnc, (err, data) => {
    try {
      if (err) throw err;

      let json = JSON.parse(data);
      delete json.nextId;
      res.send(json);
    } catch (error) {
      res.status(500).send({ error: error.message });
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
    } catch (error) {
      if (status == 200) status = 500;
      res.status(status).send({ error: error.message });
    }
  });
});

router.delete('/:id', (req, res) => {
  let status = 200;

  fs.readFile(gFileName, gFileEnc, (err, data) => {
    try {
      if (err) throw err;

      let id = parseInt(req.params.id);
      if (isNaN(id)) {
        status = 400;
        throw new Error('Invalid parameter');
      }

      let json = JSON.parse(data);
      let accounts = json.accounts.filter((account) => account.id !== id);
      json.accounts = accounts;
      fs.writeFile(gFileName, JSON.stringify(json), (err) => {
        try {
          if (err) throw err;
          res.end();
        } catch (error) {
          res.status(500).send({ error: error.message });
        }
      });
    } catch (error) {
      if (status == 200) status = 500;
      res.status(status).send({ error: error.message });
    }
  });
});

router.put('/', (req, res) => {
  let newData = req.body;

  fs.readFile(gFileName, gFileEnc, (err, fd) => {
    try {
      if (err) throw err;

      let json = JSON.parse(fd);
      let accountIdx = json.accounts.findIndex(
        (account) => account.id === newData.id
      );

      json.accounts[accountIdx] = newData;

      fs.writeFile(gFileName, JSON.stringify(json), (err) => {
        try {
          if (err) throw err;

          res.end();
        } catch (error) {
          res.status(500).send({ error: error.message });
        }
      });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });
});

router.post('/transaction', (req, res) => {
  let params = req.body;
  let status = 200;

  fs.readFile(gFileName, gFileEnc, (err, fd) => {
    try {
      if (err) throw err;

      let json = JSON.parse(fd);
      let accountIdx = json.accounts.findIndex(
        (account) => account.id === params.id
      );

      if (
        params.value < 0 &&
        json.accounts[accountIdx].balance + params.value < 0
      ) {
        throw new Error('Insuficient funds');
      }

      json.accounts[accountIdx].balance += params.value;

      fs.writeFile(gFileName, JSON.stringify(json), (err) => {
        try {
          if (err) throw err;
          res.end();
        } catch (error) {
          res.status(500).send({ error: error.message });
        }
      });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });
});
