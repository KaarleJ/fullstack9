import { NewPatient, Gender, Entry } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Missing value name or name is of incorrect type');
  }

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isSsn = (code: string): boolean => {
  if (code[6] !== '-' || !Number(code.substring(0, 6)) || !Number(code.substring(7,9))) {
    return false;
  }
  return true;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn) || !isSsn(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntry = (param: any): param is Entry => {
  if (param.type) {
    return true;
  } else {
    return false;
  }
};

const isEntries = (entries: Entry[]): boolean => {
  return entries.every(isEntry);
};

const parseEntries = (entries: unknown): Entry[] => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (!entries || !Array.isArray(entries) || !isEntries(entries)) {
    throw new Error('Incorrect or missing entries');
  }
  return entries as Entry[];
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: unknown};

const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation, entries} : Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseBirth(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: parseEntries(entries),
  };
  return newPatient;
};

export default toNewPatient;