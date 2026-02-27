import { useState } from 'react';

function MovieDescription({ description }) {
    const[isExpanded, setIsExpanded] = useState(false);

    const ToggleExpanded = () =>  {
        setIsExpanded(!isExpanded)
    };

    return (
    <div>
      <p className={isExpanded ? '' : 'line-clamp-2'}>{description}</p>
      <button 
        onClick={ToggleExpanded}
        className="text-primary hover:underline mt-2"
      >
        {isExpanded ? 'Voir moins' : 'Voir plus'}
      </button>
    </div>
 );
}
export default MovieDescription;