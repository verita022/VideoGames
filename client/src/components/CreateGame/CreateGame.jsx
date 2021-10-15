import React from 'react';
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getGenres, createGame, getAllGames } from '../../actions';
import swal from 'sweetalert';
import classes from './CreateGame.module.css';
import NavBar from '../NavBar/NavBar';



function validate(input){
    let error = {};
    if(!input.name){
        error.name = ' * You must set a Name for your game';
    }
    if(!input.description){
        error.description = ' * A description is required';
    }
    if(!input.platforms){
        error.platforms = ' * Please select a platform';
    }
    return error;
}



export default function CreateGame(){
    const dispatch = useDispatch()
    const history = useHistory()

    const genres = useSelector((state) => state.genres)

    let platformsArray = [ 'PC','PlayStation 5','PlayStation 4', 'Xbox One', 'Xbox Series S/X',  'Nintendo Switch', 'iOS', 'Android',
        'Nintendo 3DS', 'Nintendo DS', 'Nintendo DSi', 'macOS', 'Linux', 'Xbox 360', 'Xbox',  'PlayStation 3', 'PlayStation 2', 'PlayStation', 
        'PS Vita', 'PSP', 'Wii U', 'Wii', 'GameCube', 'Nintendo 64', 'Game Boy Advance', 'Game Boy Color', 'Game Boy', 'SNES', 'NES',
        'Classic Macintosh', 'Apple II', 'Commodore', 'Atari 7800',  'Atari 5200', 'Atari 2600',  'Atari Flashback', 'Atari 8-bit', 
        'Atari ST', 'Atari Lynx', 'Atari XEGS', 'Genesis',' SEGA Saturn', 'SEGA CD', 'SEGA 32X', 'SEGA Master System', 'Dreamcast',
        '3DO','Jaguar', 'Game Gear', 'Neo Geo'];

    const [input, setInput] = useState({
        name:'',
        background_image: '',
        description: '',
        released: '',
        rating: '',
        platforms: [],
        genres: []
    })

    const [error, setError] = useState({})

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setError(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    function handleSelectGenre(e){
        setInput({
            ...input,
            genres : [...input.genres, e.target.value]
        })
    }

    function handleSelectPlatforms(e){
        setInput({
            ...input,
            platforms : [...input.platforms, e.target.value]
        })
    } 

    function handleSubmit(e){
        e.preventDefault()
        if(!input.name || !input.description || !input.platforms){
          return swal('Name, Description and Platform fields cant be empty')
        }
        else{
            dispatch(getAllGames())
            dispatch(createGame(input))
            swal('Game Succesfully Created!')
                setInput({
                    name:'',
                    background_image: '',
                    description: '',
                    released: '',
                    rating: '',
                    platforms: [],
                    genres: []
                })
                history.push('/Home')
        }   
       
    }

    function handleDeleteGenre(el){
        setInput({
            ...input,
            genres: input.genres.filter(gen => gen !== el )
        })

    }

    function handleDeletePlatform(el){
        setInput({
            ...input,
            platforms : input.platforms.filter(pl => pl !== el)
        })
    }

    useEffect(() => {
        dispatch(getGenres()) 
     }, [dispatch])

    return(
        <div>
           <NavBar/>
           
            <h1>Create your Game</h1>
            <form className={classes.formConteiner} onSubmit={e => handleSubmit(e)}>
                <div className={classes.descConteiner}>
                    <div>
                        <label >Name: <input className={classes.inputButton} onChange={handleChange} type='text' value={input.name} name='name'/>
                        <p className={error.name && classes.danger}>{error.name}</p></label>                   
                    </div>
                    <div>
                        <label >Image: <input className={classes.inputButton} onChange={handleChange} type='text' value={input.background_image} name='background_image'/></label>                   
                    </div>
                    <div>
                        <label >Description: <input className={classes.inputButton} style={{ height: '60px' }} onChange={handleChange} type='text' value={input.description} name='description'/>
                        <p className={error.description && classes.danger}>{error.description}</p></label>                    
                    </div>
                    <div>
                        <label >Released: <input className={classes.inputButton} onChange={handleChange} type='text' value={input.released} name='released'/></label>
                    </div>
                    <div>
                        <label >Rating: <input className={classes.inputButton} onChange={handleChange} type='number' value={input.rating} name='rating'/></label>                   
                    </div>
                    <div>
                        <label >Platforms: <select className={classes.inputButton} onChange={handleSelectPlatforms} name='platforms'><option></option>
                            {platformsArray.map((el) => (<option  key={el[el.length - 3] + el.charCodeAt() + el[el.length - 1]} value={el}>{el}</option>))}
                        </select>
                        <p className={error.platforms && classes.danger}>{error.platforms}</p></label>                    
                        <div className={classes.selection}>{input.platforms.map((el, index) => <div key={index}><button onClick={() => handleDeletePlatform(el)}>x</button><p>{el}</p></div>)}</div>
                                                      
                    </div>
                    <div>
                        <label>Genres: <select className={classes.inputButton} onChange={handleSelectGenre}><option></option>
                            {genres.map((el) => (<option key={el.id} value={el.name}>{el}</option>))}
                        </select>
                        <div className={classes.selection}>{input.genres.map((el, index) => <div key={index}><button onClick={() => handleDeleteGenre(el)}>x</button><p>{el}</p></div> )}</div></label>                  
                    </div>
                    <button className={classes.createButton} style={{ width: '240px' }} type='submit'>Create Game</button>
                 </div>
                
                
            </form>
            
        </div>
    )

}

