import React from 'react';
import classes from './Home.module.css';


export default function Paginado({gamesPerPage, allGames, paginado}){
    const pageNumbers = [];

    for(let i =1; i<=Math.ceil(allGames/gamesPerPage); i++){
        pageNumbers.push(i);
    }
    return(
        <div className={classes.paginado}>
            
                {pageNumbers && pageNumbers.map(
                   number => {return <ul key={number}><button className={classes.pagButton} onClick={() =>{paginado(number)}}>{number}</button></ul>}
                )}
            
        </div>
    )
    
}