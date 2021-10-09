import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { searchGamesByName } from '../../actions'
import classes from './NavBar.module.css'


export default function SearchByName(){

    const allGames = useSelector((state) => state.detail)
    const allGamesSearch = allGames.flat()
    const detailGame = useSelector((state) => state.detail)
    const genresGame = useSelector((state) => state.genres)
    
    const dispatch = useDispatch()
    const history = useHistory()
    

    const [name, setName] = useState('');

    function handleNameChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
     e.preventDefault()
        if(name !== ''){
          dispatch(searchGamesByName(name));
          setName('');
          if(allGamesSearch.length < 14 || detailGame.length > 0 || genresGame.length > 0){
            history.push('/Home')
          }
          
        }
     }
   

    return(
        <div>
            <div className={classes.searchBar}>
            <input className={classes.seachInput} type="text" value={name} placeholder='Search...'  onChange={ e => handleNameChange(e)}></input>
            <button className={classes.searchButton} type='submit' onClick={handleSubmit}>Search</button>
            </div>
            
        </div>
    )
}