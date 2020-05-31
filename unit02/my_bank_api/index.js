import express from 'express';
import fs from 'fs';
// import winston from 'winston';

let app = express();
let port = 3000;

app.use(express.json());

let file = './accounts.json';

app.post('/account', (req, res) => {
  let account = req.body;

  fs.readFile(file, 'utf8', (err, fd) => {
    if (!err) {
      try {
        let json = JSON.parse(fd);
        account = {
          id: json.nextId++,
          ...account,
        };
        json.accounts.push(account);

        fs.writeFile(file, JSON.stringify(json), (err) => {
          if (err) {
            res.status(400).send({ error: err.message });
          } else {
            res.send({ id: account.id });
          }
        });
      } catch (error) {
        console.log(error);
        res.status(400).send({ error: err.message });
      }
    } else {
      res.status(400).send({ error: err.message });
    }
  });
});

app.listen(port, () => {
  try {
    fs.readFile(file, 'utf8', (err, _) => {
      if (err) {
        const initJson = {
          nextId: 1,
          accounts: [],
        };

        fs.writeFile(file, JSON.stringify(initJson), (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});
