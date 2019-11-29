import React from 'react';

const pokemon = (props) => (
    <div>
        <article className="pokemon-tile">
            <div className="pokemon-header">
                <h1 className="pokemon-heading">{props.title.toUpperCase()}</h1>
                <h1 className="pokemon-heading">{`ID: ${props.id}`}</h1>
            </div>
            <img className="pokemon-image" src={props.img} />
        </article>
    </div>
);

export default pokemon;