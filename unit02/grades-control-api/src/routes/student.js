import express from 'express';
import { logger } from '../util/logger.js';
import { read } from '../util/file.js';

export const studentRouter = express.Router();

studentRouter.get('/', async (req, res) => {
  let status = 200;
  let params = req.body;

  try {
    const json = await read();

    const grades = json.grades.filter(
      (grade) =>
        grade.student === params.student && grade.subject === params.subject
    );

    if (!grades || !grades.length) {
      status = 404;
      throw new Error(
        `GET /student - grades not found - params: '${JSON.stringify(params)}'`
      );
    }

    const sum = grades.reduce((acc, cur) => acc + cur.value, 0);

    res.send({ sum: sum });
  } catch (err) {
    if (status == 200) status = 500;
    logger.error(err);
    res.status(status).send({ error: err.message });
  }
});
