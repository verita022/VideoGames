import React from "react";
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getAllGames } from '../../actions'
import classes from './NavBar.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGamepad } from '@fortawesome/free-solid-svg-icons';

export default function NavBar(props){
console.log()

    const dispatch = useDispatch();
    const allGames = useSelector((state) => state.videoGames )


    function recharge(){
        if(allGames.length < 14){
            dispatch(getAllGames())
        }
    }

    return(
        <div className={classes.navBar}>
            <Link to='/Home' style={{ textDecoration: 'none' }}><button className={classes.homeButton} onClick={recharge} >Home  <FontAwesomeIcon icon={faGamepad} style={{ color: 'aqua', fontSize: '20px' }}/></button></Link>
            <div><SearchBar/></div>
            <Link to='/createGame' style={{ textDecoration: 'none' }} ><button className={classes.homeButton}>
                Create your Game
            </button></Link>

        </div>
    ) 

}
