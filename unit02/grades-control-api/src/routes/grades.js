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

// updates grade information
gradesRouter.put('/:id', async (req, res) => {
  let status = 200;
  let params = req.body;

  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    status = 400;
    throw new Error(`PUT /grades - invalid identifier - id: ${id}`);
  }

  try {
    let json = await read();

    let gradeIdx = json.grades.findIndex((grade) => grade.id === id);
    if (gradeIdx < 0) {
      status = 404;
      throw new Error(`PUT /grades - grade not found - id: ${id}`);
    }

    params = {
      id: id,
      ...params,
      timestamp: new Date().toISOString(),
    };
    json.grades[gradeIdx] = params;
    await write(json);

    logger.info(`PUT /grades - grade updated - id: ${id}`);
    return res.json({ id: id });
  } catch (err) {
    if (status == 200) status = 500;
    logger.error(err);
    res.status(status).send({ error: err.message });
  }
});

// deletes grade
gradesRouter.delete('/:id', async (req, res) => {
  let status = 200;

  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    status = 400;
    throw new Error(`DELETE /grades - invalid identifier - id: ${id}`);
  }

  try {
    let json = await read();
    const grade = json.grades.find((grade) => grade.id === id);
    if (!grade) {
      status = 404;
      throw new Error(`DELETE /grades - grade not found - id: ${id}`);
    }

    const grades = json.grades.filter((grade) => grade.id !== id);
    json.grades = grades;
    await write(json);

    logger.info(`DELETE /grades - grade deleted - id: ${id}`);
    return res.end();
  } catch (err) {
    if (status == 200) status = 500;
    logger.error(err);
    res.status(status).send({ error: err.message });
  }
});

// returns grade information
gradesRouter.get('/:id', async (req, res) => {
  let status = 200;

  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    status = 400;
    throw new Error(`GET /grades - invalid identifier - id: ${id}`);
  }

  try {
    const json = await read();
    const grade = json.grades.find((grade) => grade.id === id);
    if (!grade) {
      status = 404;
      throw new Error(`GET /grades - grade not found - id: ${id}`);
    } else {
      logger.info(`GET /grades - grade info returned - id: ${id}`);
      res.send(grade);
    }
  } catch (err) {
    if (status == 200) status = 500;
    logger.error(err);
    res.status(status).send({ error: err.message });
  }
});
