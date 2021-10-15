const initialState = {
    videoGames: [],
    allGames : [],
    detail: [],
    genres: [],
    
    
   
}

export default function rootReducer(state =initialState, action){
    switch (action.type){
        case 'GET_ALL_GAMES':
            
            return{
                ...state,
                videoGames: action.payload,
                allGames: action.payload
            }
        case 'GAME_DETAILS':
            return {
                ...state,
                detail: action.payload,
                
            }
        case 'EMPTY_DETAILS':
            return {
                ...state,
                detail: action.payload
            }

        case 'GET_GENRES':
            return {
                ...state,
                genres: action.payload
            }
        case 'CREATE_GAME':
            return {
                ...state
            }

        case 'SEARCH_GAMES_BY_NAME':

            return {
                ...state,
                videoGames: action.payload
            }
            
        case 'DELETE_GAME':
            
        return {
            ...state,
           
        }

        case 'GET_SOME_GAMES':
        let allGamesMix = state.allGames.flat();
        let gamesDbOrApi = action.payload === 'myGames' ? allGamesMix.filter(el => el.createdInDb === true) : allGamesMix.filter(el => el.createdInDb !== true);
            return {
                ...state,
                videoGames: action.payload === 'allGames' ? allGamesMix : gamesDbOrApi
             
            }

        case 'FILTER_BY_GENRE':
        let normalize = state.allGames.flat()
        let filterGenre = normalize.filter(el => el.genres.find(el => el.name === action.payload))
        
        return {
                ...state,
                videoGames: filterGenre
                
            }
            
        case 'ORDER_BY_RATING':
        let normalizeArray = state.allGames.flat()
        let orderRating = action.payload === 'menosRating' ? normalizeArray.sort((a ,b) => {return a.rating - b.rating}):  normalizeArray.sort((a ,b) => {return b.rating - a.rating})  

        return {
            ...state,
            videoGames: orderRating
        }

        case 'ORDER_ALPHABETICALLY':
        let normalAlpha = state.allGames.flat();
        let orderAlpha = action.payload === 'az'? normalAlpha.sort((a, b) => {
            if(a.name < b.name){
                return -1
            }
            if(a.name > b.name){
                return 1
            }
            return 0;

        }): normalAlpha.sort((a, b) => {
            if(a.name < b.name){
                return 1
            }
            if(a.name > b.name){
                return -1
            }

            return 0;
        });
        
        return ({
            ...state,
            videoGames: orderAlpha
        })  

        default:
            return state;
    }


}