import express from 'express';
import { logger } from '../util/logger.js';
import { read } from '../util/file.js';

export const subjectRouter = express.Router();

subjectRouter.get('/avg', async (req, res) => {
  let status = 200;
  let params = req.body;

  try {
    const json = await read();

    const grades = json.grades.filter(
      (grade) => grade.type === params.type && grade.subject === params.subject
    );

    if (!grades || !grades.length) {
      status = 404;
      throw new Error(
        `GET /subject/avg - grades not found - params: '${JSON.stringify(
          params
        )}'`
      );
    }

    const sum = grades.reduce((acc, cur) => acc + cur.value, 0);
    const avg = sum / grades.length;

    res.send({ avg: avg });
  } catch (err) {
    if (status == 200) status = 500;
    logger.error(err);
    res.status(status).send({ error: err.message });
  }
});

subjectRouter.get('/top3', async (req, res) => {
  let status = 200;
  let params = req.body;

  try {
    const json = await read();

    const grades = json.grades.filter(
      (grade) => grade.type === params.type && grade.subject === params.subject
    );

    if (!grades || !grades.length) {
      status = 404;
      throw new Error(
        `GET /subject/avg - grades not found - params: '${JSON.stringify(
          params
        )}'`
      );
    }

    grades.sort((a, b) => b.value - a.value);

    let top3List = [];
    for (let idx = 0; idx < 3; idx++) {
      top3List.push(grades[idx]);
    }

    res.send(top3List);
  } catch (err) {
    if (status == 200) status = 500;
    logger.error(err);
    res.status(status).send({ error: err.message });
  }
});
