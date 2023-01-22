import patients from '../../data/patients';
import { NewPatient, Patient, PublicPatient } from '../types';
import { v1 as uuid } from 'uuid';

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
  const newPatient = {
    id: uuid(),
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient,
  getPatient
};