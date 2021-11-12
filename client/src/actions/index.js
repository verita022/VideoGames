import axios from 'axios';

export function getAllGames(){
    return async function(dispatch){
       try{ 
           const allGames = await axios.get('/videogames')
           return dispatch({
               type: 'GET_ALL_GAMES',
               payload: allGames.data
           })
       }catch(error){
         console.log(error)
       }
    
    }

};

export function gameDetails(id){
    return async function(dispatch){
        try{
            const gameDetail = await axios.get('/videogames/' + id)
            return dispatch({
                type: 'GAME_DETAILS',
                payload: gameDetail.data
            })
        }
        catch(error){
            console.log(error)
        }
    }
}




export function getGenres(){
    return async function(dispatch){
        const allGenres = await axios.get('/genres')
        return dispatch({
            type: 'GET_GENRES',
            payload: allGenres.data
        })
    }
}



export function createGame(payload){
    return async function(dispatch){
        const postGame = await axios.post('/videogames', payload)
        return dispatch({
            type: 'CREATE_GAME',
            postGame
        })
    }
}

export function searchGamesByName(name){
    return async function(dispatch){
       try{
            const gameDetails = await axios.get('/videogames?name=' + name)
            return dispatch({
                type: 'SEARCH_GAMES_BY_NAME',
                payload: gameDetails.data
            })
        }catch(error){
            console.log(error);
        }
    }
}

export function deleteGame(id){
    return async function(dispatch){
        try{
            const deleteG = await axios.delete('/videogames/' + id)
            return dispatch({
                type: 'DELETE_GAME',
                payload: deleteG.data
            })
        }
        catch(error){
            console.log(error);
        }
    }
}


export function emptyDetails(){
 return ({
     type: 'EMPTY_DETAILS',
     payload: []
 })   
}

export function getFromDBorApi(payload){
   return ({
        type: 'GET_SOME_GAMES',
        payload
    })
    
}


export function filterByGenre(payload){
    return ({
        type: 'FILTER_BY_GENRE',
        payload
    })

};

export function orderByRating(payload){
    return ({
        type: 'ORDER_BY_RATING',
        payload
    })
}

export function orderAlphabetically(payload){
    return ({
        type: 'ORDER_ALPHABETICALLY',
        payload
    })
}

