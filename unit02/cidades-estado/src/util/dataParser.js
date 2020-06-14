import { logger } from '../util/logger.js';
import { promises as fs } from 'fs';
import appRoot from 'app-root-path';

const folderRoot = `${appRoot}/data`;
const folderStates = `${folderRoot}/generated`;

export let statesList = [];
export let citiesList = [];

export async function prepareData() {
  try {
    await prepareFolder();

    statesList = JSON.parse(
      await fs.readFile(`${folderRoot}/Estados.json`, 'utf8')
    );
    citiesList = JSON.parse(
      await fs.readFile(`${folderRoot}/Cidades.json`, 'utf8')
    );

    for (let idx = 0; idx < statesList.length; idx++) {
      let current = citiesList.filter(
        (city) => city.Estado === statesList[idx].ID
      );
      await fs.writeFile(
        `${folderStates}/${statesList[idx].Sigla}.json`,
        JSON.stringify(current)
      );
      statesList[idx].cityQty = `${current.length}`;
    }
  } catch (err) {
    logger.error(err);
  }
}

async function prepareFolder() {
  try {
    await fs.readdir(`${folderStates}`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(`${folderStates}`);
    }
  }
}
