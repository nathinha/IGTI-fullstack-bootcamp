import { app } from './app.js';
import { logger } from './util/logger.js';

const port = 3333;

app.listen(port, () => {
  logger.info('server is up');
});
