const { default: axios } = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Genres } = require('../db');

const GenresApi = async () => {
    const apiUrl = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const result = await apiUrl.data.results;
    return result;
}

async function getAllGenres (req, res){
    const genresAll = await GenresApi();
    const genresMap = await genresAll.map(el => el)

    try{
        const genresDB = await Genres.findAll()
        if(genresDB.length > 0){
            res.json(genresDB.map(el => el.name));
        }
        else{
            const genresToDB = await Genres.bulkCreate(genresMap);
            res.json(genresToDB);
        }
        
    }catch(error){
        res.json({error});
        console.log(error)
    }

   
}

module.exports = {
    getAllGenres
} 