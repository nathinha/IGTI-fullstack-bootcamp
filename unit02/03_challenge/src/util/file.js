import { logger } from '../util/logger.js';
import { promises as fs } from 'fs';
import appRoot from 'app-root-path';

let database = `${appRoot}/data/grades.json`;
let backup = `${appRoot}/data/grades-bkp.json`;

// restores original data or create new database with backup data
export async function restore() {
  try {
    let data = await fs.readFile(backup);
    await fs.writeFile(database, data);
  } catch (err) {
    await fs.writeFile(database, data);
  }
}

// reads file containing data, returns json
export async function read() {
  try {
    return JSON.parse(await fs.readFile(database));
  } catch (err) {
    logger.error(err);
  }
}

// converts json to string and writes to file,
export async function write(json) {
  try {
    await fs.writeFile(database, JSON.stringify(json));
  } catch (err) {
    logger.error(err);
  }
}
