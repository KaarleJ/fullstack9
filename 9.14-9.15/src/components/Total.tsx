import { ContentType } from '../types';

const Total = (props : ContentType) => {
  return (
    <p>
      Number of exercises {' '} {props.content.reduce((carry, part) => carry + part.exerciseCount,0)}
    </p>
  )
}

export default Total;