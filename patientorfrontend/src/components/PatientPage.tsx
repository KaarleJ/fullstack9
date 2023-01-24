/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import { Entry, Patient, NewEntry } from "../types";
import { updatePatient } from '../state';
import { FormValues } from './AddEntryForm';

import  { AddEntryModal, AddHealthModal, AddOccupationalModal } from './AddModal';

import { Button, Typography, Box } from "@material-ui/core";
import EntryContent from './EntryContent';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import axios from 'axios';


const parseValues = (values: FormValues) : NewEntry  => {
  switch (values.type) {
    case 'Hospital':
      return {
        type: 'Hospital',
        description: values.description as string,
        date: values.date as string,
        specialist: values.specialist as string,
        diagnosisCodes: values.diagnosisCodes ? values.diagnosisCodes as string[] : undefined,
        discharge: {
          date: values.dischargeDate as string,
          criteria: values.dischargeCriteria as string
        },
      };
    case 'HealthCheck':
      return {
        type: 'HealthCheck',
        description: values.description as string,
        date: values.date as string,
        specialist: values.specialist as string,
        diagnosisCodes: values.diagnosisCodes ? values.diagnosisCodes as string[] : undefined,
        healthCheckRating: values.healthCheckRating as number,
      };
    case 'OccupationalHealthcare':
      return {
        type: 'OccupationalHealthcare',
        description: values.description as string,
        date: values.date as string,
        specialist: values.specialist as string,
        diagnosisCodes: values.diagnosisCodes ? values.diagnosisCodes as string[] : undefined,
        employerName: values.employerName as string,
        sickLeave: {
          startDate: values.leaveStart as string,
          endDate: values.leaveEnd as string
        }
      };
  }
};

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();

  const [hospitalOpen, setHospitalOpen] = useState<boolean>(false);
  const [healthOpen, setHealthOpen] = useState<boolean>(false);
  const [occupationalOpen, setOccupationalOpen] = useState<boolean>(false);
  const [ error, setError] = useState<string>();

  const openHospital = (): void => setHospitalOpen(true);
  const openHealth = (): void => setHealthOpen(true);
  const openOccupational = (): void => setOccupationalOpen(true);

  const closeModal = (): void => {
    setHospitalOpen(false);
    setHealthOpen(false);
    setOccupationalOpen(false);
    setError(undefined);
  };

  if (!id) {
    return <div>Cannot get /api/patients/${id}</div>;
  }


  const submitNewEntry = async (values: FormValues) => {
    const entryValues = parseValues(values);
    console.log(entryValues);
    try {
      const patient = patients[id];
      const { data: Entry} = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        entryValues
      );
      if (Entry && patient.entries) {
        patient.entries.push(Entry);
        dispatch(updatePatient(patient));
      }
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const [{ patients }, dispatch] = useStateValue();

  useEffect(() => {
    const fetchPatientList = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);

  const patient = patients[id];

  if (!patient) {
    return (
      <div>
        loading
      </div>
    );
  }

  return (
    <div className='App'>
      <Box>
        <Typography align="left" variant="h3">
          {patient.name} {patient.gender === "male" ? <MaleIcon/> : <FemaleIcon/>}
        </Typography>
        <Typography align="left" variant="h6">
          ssn: {patient.ssn} <br/>
          occupation: {patient.occupation}
        </Typography>
        <Typography align="left" variant="h5">
          entries:
        </Typography>
      </Box>
      {patient.entries && patient.entries.length > 0 ?
      (patient.entries.map((entry) => <EntryContent key={entry.id} entry={entry}/>)) :
      <div>No entries</div>
      }
      <Button variant="contained" onClick={() => openHospital()}>
        Add Hospital Entry
      </Button>
      <AddEntryModal
        modalOpen={hospitalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openHealth()}>
        Add Healthcheck Entry
      </Button>
      <AddHealthModal
        modalOpen={healthOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openOccupational()}>
        Add Occupational Healthcare Entry
      </Button>
      <AddOccupationalModal
        modalOpen={occupationalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
    </div>
  );
};

export default PatientPage;