import { logger } from './util/logger.js';
import { prepareData } from './util/dataParser.js';
import {
  getTop5MoreCities,
  getTop5LessCities,
  getLongestCityName,
  getShortestCityName,
} from './util/dataHandler.js';

prepareData().then(async () => {
  logger.info('data prepared');
  getTop5MoreCities();
  getTop5LessCities();
  const longestCityName = await getLongestCityName();
  const shortestCityName = await getShortestCityName();

  logger.info(`${longestCityName.city}/${longestCityName.uf}`);
  logger.info(`${shortestCityName.city}/${shortestCityName.uf}`);
});
