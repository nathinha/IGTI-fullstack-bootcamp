import { promises as fs } from 'fs';
import appRoot from 'app-root-path';

const folderRoot = `${appRoot}/data`;
const folderStates = `${folderRoot}/generated`;

const fileStates = `${folderRoot}/Estados.json`;
const fileCities = `${folderRoot}/Cidades.json`;
const encoding = 'utf8';

export async function prepareData() {
  try {
    await prepareFolder();

    const fdStates = await fs.readFile(fileStates, encoding);
    const fdCities = await fs.readFile(fileCities, encoding);

    let jsonStates = JSON.parse(fdStates);
    let jsonCities = JSON.parse(fdCities);

    for (const [_, state] of jsonStates.entries()) {
      let currentState = jsonCities.filter((city) => city.Estado === state.ID);
      currentState.sort((a, b) => {
        return a.Nome.localeCompare(b.Nome);
      });

      await fs.writeFile(
        `${folderStates}/${state.Sigla}.json`,
        JSON.stringify(currentState)
      );
    }
  } catch (err) {
    console.log(err);
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
