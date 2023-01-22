import { ContentType} from '../types';
import Part from './Part';

const Content = (props : ContentType ) => {
  return (
    <div>
      {props.content.map((part) => (
        <div key={part.name}><Part content={part}/></div>
      ))}
    </div>
  )
}

export default Content;