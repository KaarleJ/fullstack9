import { PartType } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const Part = (props: PartType) => {
  switch (props.content.type) {
    case 'normal':
      return (
        <div>
          <b>{props.content.name} {props.content.exerciseCount}</b>
          <p style={{fontStyle: 'italic'}}>{props.content.description}</p>
        </div>
      )
    
    case 'groupProject':
      return (
        <div>
          <b>{props.content.name} {props.content.exerciseCount}</b>
          <p>project exercises {props.content.groupProjectCount}</p>
        </div>
      )

    case 'submission':
      return (
        <div>
          <b>{props.content.name} {props.content.exerciseCount}</b>
          <p style={{fontStyle: 'italic'}}>{props.content.description}</p>
          <p>{props.content.exerciseSubmissionLink}</p>
        </div>
      )
    
    case 'special':
      return (
        <div>
          <b>{props.content.name} {props.content.exerciseCount}</b>
          <p style={{fontStyle: 'italic'}}>{props.content.description}</p>
          required skills: {props.content.requirements.join(', ')}
        </div>
      )
    
    default:
      return assertNever(props.content);
  }
}

export default Part;