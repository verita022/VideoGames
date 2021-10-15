import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { gameDetails, deleteGame, getAllGames, emptyDetails } from "../../actions";
import NavBar from '../NavBar/NavBar';
import classes from './GameDetail.module.css'
import swal from 'sweetalert';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';

export default function GameDetail(props){
    

    const id = props.location.pathname.split('/')[2];    
    const dispatch = useDispatch()
    const history = useHistory()
    
        useEffect(()=>{
            
            dispatch(gameDetails(id))
        }, [dispatch, id])
    
    
            
    let myGameDetail = useSelector(state => state.detail)
    
    

    function handleDelete(el, e){
        e.preventDefault()
        dispatch(deleteGame(el));
        dispatch(getAllGames());
        dispatch(emptyDetails())
        swal('The Game has been succesfully deleted')
        history.push('/Home')
    }

    
    return(
        <div >
            <NavBar/>
               
            <div key={myGameDetail.map(el => el.id )} className={classes.container}>
                <div className={classes.containerImage}>
                    <h2>{myGameDetail.map(el => el.name )}</h2>
                    <img className={classes.image} src={myGameDetail.map(el => el.background_image )} alt={myGameDetail.map(el => el.name )}/><br/>
                </div>
                
                <div className={classes.containerDescription}>
                        <div className={classes.specificDescription}>
                            <h3>Description:</h3><p className={classes.spanText}>{myGameDetail.map(el => el.description.replace(/<[^>]*>?/g," ") )}</p><br/>
                        </div>
                        <div>
                            
                            <h4><FontAwesomeIcon icon={faStar} style={{color: 'yellow'}}/> Rating : <FontAwesomeIcon icon={faStar} style={{color: 'yellow'}}/></h4>
                            <p className={classes.spanText}>{myGameDetail.map(el => el.rating )}</p><br/>
                            
                        </div>
                        <div className={classes.subDescription}>
                            <span><h4>Released: </h4><p className={classes.spanText}>{myGameDetail.map(el => el.released )}</p></span><br/>
                            <span><h4>Platforms: </h4><p className={classes.spanText}>{ myGameDetail.map(el => el.platforms )}</p></span><br/>
                            <span><h4>Genres: </h4><div className={classes.spanText}>{id.length < 8 ? myGameDetail.map(el => el.genres.map((el, index) => <div key={index}>{el}</div> )) : myGameDetail.map(el => el.genres.map(el => <div key={el.name}>{el.name}</div>))}</div></span><br/>
                        </div>
                        <div>{myGameDetail.map(el => el.createdInDb ? <button key={el.id} onClick={e => handleDelete(el.id, e)} className={classes.detailButton} >Delete</button> : null )}</div>
                        
                </div>
            </div>
           
        </div>
        

    ) 
}