import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { getAllGames, filterByGenre, orderByRating, orderAlphabetically, getFromDBorApi, emptyDetails } from "../../actions";
import { Link } from 'react-router-dom';
import Game from '../Game/Game'
import Paginado from "./paginado";
import NavBar from "../NavBar/NavBar";
import classes from './Home.module.css'

export default function Home(){
    const dispatch = useDispatch();
    const allVideoGames = useSelector((state) => state.videoGames)
    const allGames = allVideoGames.flat();

    useEffect(()=>{
        if(allGames.length < 1){
            dispatch(getAllGames())
        }
    }, [dispatch]);

    useEffect(()=>{
        dispatch(emptyDetails())
    }, [dispatch]);
   
    function handleGetFromDBorApi(e){
        dispatch(getFromDBorApi(e.target.value))
    }

    function handleFilter(e){
        dispatch(filterByGenre(e.target.value))
    }
    function handleOrderByRating(e){
        dispatch(orderByRating(e.target.value))
    }

    function handleOrderAlphabetically(e){
        dispatch(orderAlphabetically(e.target.value))
    }

    

    //Logica del Paginado
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage] = useState(15);
  
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame);
      
    const paginado = (pageNumber) =>{
          setCurrentPage(pageNumber);
      }  
    //Fin del paginado



    return (
        <div>
            <NavBar/>
            
            {/* <h2>What kind of game are you looking for...?</h2> */}
            <div className={classes.select}>
            
                <select className={classes.selectButton} onChange={e => handleOrderByRating(e)}>
                    <option>Order By Rating</option>
                    <option value='masRating'>+ Rating</option>
                    <option value='menosRating'>- Rating</option>
                </select>
                <select className={classes.selectButton} onChange={ e => handleOrderAlphabetically(e)}>
                    <option>Order By Name</option>
                    <option value='az'>A-Z</option>
                    <option value='za'>Z-A</option>
                </select>
                <select className={classes.selectButton} onChange={e => handleGetFromDBorApi(e)}>
                    <option>Your Games? or Our Games?</option>
                    <option value='allGames'>All Games</option>
                    <option value='myGames'>My Games</option>
                    <option value='apiGames'>Games from Web</option>
                </select>
                <select className={classes.selectButton} onChange={e => handleFilter(e)} >
                    <option>Genres</option>
                    <option value='Action'>Action</option>
                    <option value='Indie'>Indie</option>
                    <option value='Adventure'>Adventure</option>
                    <option value='RPG'>RPG</option>
                    <option value='Strategy'>Strategy</option>
                    <option value='Shooter'>Shooter</option>
                    <option value='Casual'>Casual</option>
                    <option value='Simulation'>Simulation</option>
                    <option value='Puzzle'>Puzzle</option>
                    <option value='Arcade'>Arcade</option>
                    <option value='Platformer'>Platformer</option>
                    <option value='Racing'>Racing</option>
                    <option value='Massively Multiplayer'>Massively Multiplayer</option>
                    <option value='Sports'>Sports</option>
                    <option value='Fighting'>Fighting</option>
                    <option value='Family'>Family</option>
                    <option value='Board Games'>Board Games</option>
                    <option value='Educational'>Educational</option>
                    <option value='Card'>Card</option>
                </select>
            </div>
            <div className={classes.allGames}>               
                {currentGames?.flat().map((el) => <Game name={<Link to={'/Home/' + el.id } style={{ textDecoration: 'none' }}>{el.name} </Link>} key={el.id} image={el.background_image} gender={el.genres.map(el => <div>{el.name}</div> )}/>)}
            </div>
            <div>
                {<Paginado gamesPerPage={gamesPerPage} allGames={allGames.length} paginado={paginado}/>}
            </div> 
        </div>
    )
}

//