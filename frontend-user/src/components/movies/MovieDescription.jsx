import { useState } from 'react';

function MovieDescription({ description }) {
    const[isExpanded, setIsExpanded] = useState(false);

    const ToggleExpanded = () =>  {
        setIsExpanded(!isExpanded)
    };

    return (
    <div>
        <p className={isExpanded ? '' : 'line-clamp-2'}>{description} </p>
        <button>
            {isExpanded ? 'Voir moins' : 'Voir plus'}
            </button>
    </div>
 );
}
export default MovieDescription;