import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  res.json({
    weight,
    height,
    bmi: calculateBmi(height,weight)
  });
});

app.post('/calculateExercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if ( !daily_exercises || !target) {
    return res.status(400).send({ error: 'missing parameters'});
  } else if (isNaN(Number(target))) {
    return res.status(400).send({ error: 'expected number value for key: target'});
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  daily_exercises.forEach((number: any) => {
    if (isNaN(Number(number))) {
      return res.status(400).send({ error: 'expected number value for each value in the daily_exercises array'});
    }
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(daily_exercises, Number(target));
  return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});