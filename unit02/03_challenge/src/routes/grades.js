import express from 'express';
import { logger } from '../util/logger.js';
import { read, write } from '../util/file.js';

export const gradesRouter = express.Router();

// adds new grade
gradesRouter.post('/', async (req, res) => {
  try {
    let json = await read();

    let grade = req.body;
    grade = {
      id: json.nextId++,
      ...grade,
      timestamp: new Date().toISOString(),
    };

    json.grades.push(grade);
    await write(json);

    logger.info(`POST /grades - new grade added - id: ${grade.id}`);
    return res.json({ id: grade.id });
  } catch (err) {
    logger.error(err);
    res.status(500).send({ error: err.message });
  }
});
