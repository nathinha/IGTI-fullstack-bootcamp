import express from 'express';
import { promises as fs } from 'fs';
import { router as accountRouter } from './routes/account.js';
// import winston from 'winston';

let app = express();
let port = 3000;

app.use(express.json());
app.use('/account', accountRouter);

global.gFileName = './accounts.json';
global.gFileEnc = 'utf8';

app.listen(port, () => {
  fs.readFile(gFileName, gFileEnc).catch(() => {
    const initJson = {
      nextId: 1,
      accounts: [],
    };
    fs.writeFile(gFileName, JSON.stringify(initJson)).catch((err) => {
      console.log(err);
    });
  });
});
