import React from "react";
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getAllGames } from '../../actions'
import classes from './NavBar.module.css';

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
            <button className={classes.homeButton} onClick={recharge} ><Link to='/Home' style={{ textDecoration: 'none' }}>Home</Link></button>
            <div><SearchBar/></div>
            <button className={classes.homeButton}><Link to='/createGame' style={{ textDecoration: 'none' }} >
                Create your Game
            </Link></button>

        </div>
    ) 

}
