import { logger } from './util/logger.js';
import { app } from './app.js';
import { restore } from './util/file.js';

const port = 3333;

app.listen(port, async () => {
  try {
    await restore();
  } catch (err) {
    logger.error(err);
  }
});
