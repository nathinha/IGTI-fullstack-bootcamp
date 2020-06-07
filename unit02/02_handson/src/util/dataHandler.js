import { logger } from '../util/logger.js';
import { promises as fs } from 'fs';
import appRoot from 'app-root-path';
import { statesList, citiesList } from './dataParser.js';

const folderRoot = `${appRoot}/data/generated`;
const encoding = 'utf8';

export async function getNumOfCities(uf) {
  const fileState = `${folderRoot}/${uf}.json`;
  const cities = JSON.parse(await fs.readFile(fileState, encoding));

  return cities.length;
}

export function getTop5MoreCities() {
  try {
    statesList.sort((a, b) => b.cityQty - a.cityQty);

    let top5More = '';
    let top5MoreNumber = 0;
    for (let idx = 0; idx < 5; idx++) {
      top5More += `'${statesList[idx].Sigla}: ${statesList[idx].cityQty}',`;
      top5MoreNumber += parseInt(statesList[idx].cityQty);
    }

    logger.info(top5More);
    logger.info(`Total number of cities: ${top5MoreNumber}`);
  } catch (err) {
    logger.error(err);
  }
}

export function getTop5LessCities() {
  try {
    statesList.sort((a, b) => a.cityQty - b.cityQty);

    let top5Less = '';
    let top5LessNumber = 0;
    for (let idx = 0; idx < 5; idx++) {
      top5Less += `'${statesList[idx].Sigla}: ${statesList[idx].cityQty}',`;
      top5LessNumber += parseInt(statesList[idx].cityQty);
    }

    logger.info(top5Less);
    logger.info(`Total number of cities: ${top5LessNumber}`);
  } catch (err) {
    logger.error(err);
  }
}

export async function getLongestCityName() {
  try {
    let longestCityName = '';
    let longestCityNameList = [];
    for (let idx = 0; idx < statesList.length; idx++) {
      const cities = JSON.parse(
        await fs.readFile(
          `${folderRoot}/${statesList[idx].Sigla}.json`,
          encoding
        )
      );
      cities
        .sort((a, b) => a.Nome.localeCompare(b.Nome))
        .sort((a, b) => b.Nome.length - a.Nome.length);
      longestCityName += `'${cities[0].Nome}/${statesList[idx].Sigla}',`;
      longestCityNameList.push({
        city: `${cities[0].Nome}`,
        uf: `${statesList[idx].Sigla}`,
      });
    }

    logger.info(longestCityName);

    longestCityNameList
      .sort((a, b) => a.city.localeCompare(b.city))
      .sort((a, b) => b.city.length - a.city.length);

    return longestCityNameList[0];
  } catch (err) {
    logger.error(err);
  }
}

export async function getShortestCityName() {
  try {
    let shortestCityName = '';
    let shortestCityNameList = [];
    for (let idx = 0; idx < statesList.length; idx++) {
      const cities = JSON.parse(
        await fs.readFile(
          `${folderRoot}/${statesList[idx].Sigla}.json`,
          encoding
        )
      );
      cities
        .sort((a, b) => a.Nome.localeCompare(b.Nome))
        .sort((a, b) => a.Nome.length - b.Nome.length);
      shortestCityName += `'${cities[0].Nome}/${statesList[idx].Sigla}',`;
      shortestCityNameList.push({
        city: `${cities[0].Nome}`,
        uf: `${statesList[idx].Sigla}`,
      });
    }

    logger.info(shortestCityName);

    shortestCityNameList
      .sort((a, b) => a.city.localeCompare(b.city))
      .sort((a, b) => a.city.length - b.city.length);

    return shortestCityNameList[0];
  } catch (err) {
    logger.error(err);
  }
}
