import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils';
import { NewEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  res.send(patientService.getPatient(req.params.id));
});

router.post('/:id/entries', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEntry = req.body as NewEntry;

    const addedEntry = patientService.addEntry(req.params.id, newEntry);
    return res.json(addedEntry);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).send(e.message);
    }
    return res.status(400);
  }
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