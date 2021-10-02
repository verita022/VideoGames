const { default: axios } = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Gender } = require('../db');

const GenresApi = async () => {
    const apiUrl = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const result = await apiUrl.data.results;
    return result;
}

async function getAllGenres (req, res){
    const genresAll = await GenresApi();
    const genresMap = await genresAll.map(el => {return {name : el.name} })

    try{
        const genresDB = await Gender.findAll()
        if(genresDB.length > 0){
            res.json(genresDB);
        }
        else{
            const genresToDB = await Gender.bulkCreate(genresMap);
            res.json(genresToDB);
        }
        
    }catch(error){
        res.jason({error});
        console.log(error)
    }

   
}

module.exports = {
    getAllGenres
} 