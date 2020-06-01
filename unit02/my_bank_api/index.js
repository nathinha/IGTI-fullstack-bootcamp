import express from 'express';
import fs from 'fs';
import { router as accountRouter } from './routes/account.js';
// import winston from 'winston';

let app = express();
let port = 3000;

app.use(express.json());
app.use('/account', accountRouter);

global.gFileName = './accounts.json';
global.gFileEnc = 'utf8';

app.listen(port, () => {
  try {
    fs.readFile(gFileName, gFileEnc, (err, _) => {
      if (err) {
        const initJson = {
          nextId: 1,
          accounts: [],
        };

        fs.writeFile(gFileName, JSON.stringify(initJson), (err) => {
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
