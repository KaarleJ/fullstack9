export interface Diagnose {
  code: string,
  name: string,
  latin?: string,
}

export enum Gender {
  Male = 'male',
  Female = 'female'
}

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[]
}

export type SecurePatient = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id' | 'entries'>;

export interface Patient {
  id: string,
  name: string,
  ssn: string,
  occupation: string,
  gender: Gender,
  dateOfBirth: string,
  entries: Entry[]
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface Discharge {
  date: string,
  criteria: string,
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge
}

interface SickLeave {
  startDate: string,
  endDate: string,
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare",
  employerName: string,
  sickLeave?: SickLeave
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type NewEntry = Omit<Entry, 'id'>;