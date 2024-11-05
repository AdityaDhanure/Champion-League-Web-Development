import React from 'react'

const MovieCard  = ({props}) => {
    return (
        <div class="movie">
        <div>
            <p>{props.Year}</p>
        </div>
        <div>
            <img
                src={props.Poster !== "N/A" ? props.Poster : 'https://placehold.co/400'}
                alt={props.Title}
            />
        </div>
        <div>
            <span>{props.Type}</span>
            <h3>{props.Title}</h3>
        </div>
    </div>
    )
  
}


export default MovieCard;