import { Entry } from '../types';
import { useStateValue } from "../state";

import FavoriteIcon from '@mui/icons-material/Favorite';
import WorkIcon from '@mui/icons-material/Work';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HealingIcon from '@mui/icons-material/Healing';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface PropType {
  entry: Entry;
}

interface HealthPropType {
  rating: 0 | 1 | 2 | 3,
}

const entryStyle ={
  borderStyle: 'solid',
  borderWidth: '1px',
  borderRadius: '5px',
  padding: '10px'
};

const HealthRating = (props : HealthPropType) => {
  if (props.rating === 0) {
    return <FavoriteIcon color='success'/>;
  } else if (props.rating === 1) {
    return <FavoriteIcon color='info' />;
  } else if (props.rating === 2) {
    return <FavoriteIcon color='warning' />;
  } else if (props.rating === 3) {
    return <FavoriteIcon color='error' />;
  } else {
    return <></>;
  }
};

const EntryContent = (props: PropType) => {
  const [{ diagnoses },] = useStateValue();


  switch (props.entry.type) {
    case 'HealthCheck':
      return (
        <div style={entryStyle}>
          <p>{props.entry.date} <MedicalServicesIcon style={{fontSize: 'medium'}}/></p>
          <p style={{fontStyle: 'italic'}}>{props.entry.description} </p>
          <HealthRating rating={props.entry.healthCheckRating}/>
          {props.entry.diagnosisCodes ?
          <ul>
            {props.entry.diagnosisCodes.map((diagnose) => <li key={diagnose}>{diagnose} {diagnoses[diagnose] ? diagnoses[diagnose].name : null}</li>)}
          </ul>:
          null}
          <p>Diagnose by {props.entry.specialist}</p>
        </div>
      );
    case 'Hospital':
      return (
        <div style={entryStyle}>
          <p style={{marginBottom: '5px'}}>{props.entry.date} <HealingIcon style={{fontSize: 'medium'}}/></p>
          <p style={{fontStyle: 'italic', marginTop: '5px'}}>{props.entry.description} </p>
          {props.entry.diagnosisCodes ?
          <ul>
          {props.entry.diagnosisCodes.map((diagnose) => <li key={diagnose}>{diagnose} {diagnoses[diagnose] ? diagnoses[diagnose].name : null}</li>)}
          </ul>:
          null}
          <p>Diagnose by {props.entry.specialist}</p>
        </div>
      );
    case 'OccupationalHealthcare':
      return (
        <div style={entryStyle}>
          <p>{props.entry.date} <WorkIcon style={{fontSize: 'medium'}}/> {props.entry.employerName}</p>
          <p style={{fontStyle: 'italic'}}>{props.entry.description} </p>
          {props.entry.diagnosisCodes ?
          <ul>
            {props.entry.diagnosisCodes.map((diagnose) => <li key={diagnose}>{diagnose} {diagnoses[diagnose] ? diagnoses[diagnose].name : null}</li>)}
          </ul>:
          null}
          <p>Diagnose by {props.entry.specialist}</p>
        </div>
      );
    default:
      return assertNever(props.entry);
  }
};

export default EntryContent;