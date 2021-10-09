import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from "react";
import { gameDetails } from "../../actions";
import NavBar from '../NavBar/NavBar';
import classes from './GameDetail.module.css'

export default function GameDetail(props){
    console.log(props)

    const id = props.location.pathname.split('/')[2];    
    const dispatch = useDispatch()
    
        useEffect(()=>{
            
            dispatch(gameDetails(id))
        }, [dispatch, id])
    
    
    
    let myGameDetail = useSelector(state => state.detail)
   
    console.log(myGameDetail)

    
    return(
        <div >
            <NavBar/>
               
            <div className={classes.container}>
            
            <div className={classes.containerImage}>
                <h2>{myGameDetail.map(el => el.name )}</h2>
                <img className={classes.image} src={myGameDetail.map(el => el.background_image )} alt={myGameDetail.map(el => el.name )}/><br/>
            </div>
            
            <div className={classes.containerDescription}>
                    <div className={classes.specificDescription}>
                        <h3>Description:</h3><p className={classes.spanText}>{myGameDetail.map(el => el.description.replace(/<[^>]*>?/g," ") )}</p><br/>
                    </div>
                    <div className={classes.subDescription}>
                        <span><h4>Released: </h4><p className={classes.spanText}>{myGameDetail.map(el => el.released )}</p></span><br/>
                        <span><h4>Platforms: </h4><p className={classes.spanText}>{ myGameDetail.map(el => <div>{el.platforms}</div> )}</p></span><br/>
                        <span><h4>Genres: </h4><p className={classes.spanText}>{id.length < 8 ? myGameDetail.map(el => el.genres.map(el => <div>{el}</div>)) : myGameDetail.map(el => el.genres.map(el => <div>{el.name}</div>))}</p></span><br/>
                    </div>
            </div>
            
            </div>
            {myGameDetail = []}
        </div>
        

    ) 
}