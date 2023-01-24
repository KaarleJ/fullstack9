import patients from '../../data/patients';
import { NewEntry, NewPatient, Patient, PublicPatient, Entry } from '../types';
import { v1 as uuid } from 'uuid';
import { toNewPatient } from '../utils';

const getPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatient = (targetId: string): Patient | undefined => {
  const patient = patients.find((patient) => patient.id === targetId);
  
  if (!patient) {
    return;
  }

  return patient;

};

const addPatient = ( patient: NewPatient ): Patient => {
  const newPatient = toNewPatient(patient) as Patient;
  newPatient.id = uuid();
  newPatient.entries = [];
  patients.push(newPatient);
  return newPatient;
};

const addEntry = ( id: string, entry: NewEntry ): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry
  } as Entry;
  const patient = patients.find((patient) => patient.id === id);
  if (!patient) {
      throw new Error('No patient with specified id');
  }
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  addPatient,
  getPatient,
  addEntry
};