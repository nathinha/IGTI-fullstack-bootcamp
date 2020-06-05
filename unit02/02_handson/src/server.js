import { app } from './app.js';
import { logger } from './util/logger.js';
import { prepareData } from './util/dataParser.js';

const port = 3333;

app.listen(port, async () => {
  try {
    await prepareData();
  } catch (err) {
    logger.error(err);
  }
  logger.info('server is up');
});
