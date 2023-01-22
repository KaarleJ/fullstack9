import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);
    return res.json(addedPatient);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).send(e.message);
    }
    return res.status(400);
  }
});

export default router;