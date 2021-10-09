import React from 'react';
import classes from './Game.module.css';

export default function Game({ name, image, gender }){
    return(
        <div className={classes.game}>
            <img className={classes.images} src={image} alt={name}/>
            <h2 className={classes.h2}>{name}</h2>
            <span className={classes.genres}>{gender}</span>
        </div>
    )
}


