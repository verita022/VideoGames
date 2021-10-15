import React from "react";
import { Link } from 'react-router-dom';
import { getAllGames } from "../../actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import classes from './LandingPage.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGamepad } from '@fortawesome/free-solid-svg-icons';

export default function LandingPage(){

    const dispatch= useDispatch();

    useEffect(()=>{
        dispatch(getAllGames())
    }, [dispatch]);

    return (
        <div className={classes.wellcomeButton}>
            <h1>Your video games portal  <FontAwesomeIcon icon={faGamepad} style={{ color: 'aqua', fontSize: '30px' }}/></h1>
            <Link to='/Home'>
                <button className={classes.landingButton}>START</button>
            </Link>
        </div>
    )
}