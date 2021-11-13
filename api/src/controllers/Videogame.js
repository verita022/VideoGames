const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Videogame, Genres } = require('../db')
const { Sequelize } = require('sequelize');


//&page_size=50&page=1    


const VideogamesApi = async () => {
    /* let array = []

    let i = 0;

    while(i< 5){
        i = i + 1;
        const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`);
        const result = await apiUrl.data.results.map(el => {
            return {
                id: el.id,
                name: el.name,
                genres: el.genres.map(el => el),
                background_image: el.background_image,
                description: el.description,
                rating: el.rating,
                platforms: el.platforms

            }
        }) 
        array.push(result);
    }

    /* for(let i =1; i<=5; i++){
        const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`);
        const result = await apiUrl.data.results.map(el => {
            return {
                id: el.id,
                name: el.name,
                genres: el.genres.map(el => el),
                background_image: el.background_image,
                description: el.description,
                rating: el.rating,
                platforms: el.platforms

            }
        }) 
        array.push(result);
        */
        const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=50&page=1`);
        const result = await apiUrl.data.results.map(el => {
            return {
                id: el.id,
                name: el.name,
                genres: el.genres.map(el => el),
                background_image: el.background_image,
                description: el.description,
                rating: el.rating,
                platforms: el.platforms

            }
        }) 
    
    return result;
   
}

const VideogamesDataBase = async () => {
    const resultDB = await Videogame.findAll({
        include: {
            model: Genres,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }

    });
    
    return resultDB.reverse();  
}

async function getDetailById(req, res){
    const { id } = req.params
       
    try {
            if(id.length < 8){
                const gameDetailUrl =  await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
                const apiResults = await gameDetailUrl.data
                const apiObj = await {
                    name: apiResults.name,
                    background_image: apiResults.background_image,
                    description: apiResults.description,
                    released: apiResults.released,
                    rating: apiResults.rating,
                    platforms: apiResults.platforms.map(el => el.platform.name).join(' , '),
                    genres: apiResults.genres.map(el => el.name),
                }
                return res.send([apiObj])
            }
            else{
                const dbGames = await VideogamesDataBase();
                const dbFilter = await dbGames.filter(el => el.id == id);
                            
                return res.send(dbFilter);
            }
        }catch(error){
            res.json({error})
        }    
}




async function getAllVidegamesDB(req, res){
    const { name } = req.query;
    const dbGames = await VideogamesDataBase();
    if (name) {
        normName = name.toLowerCase()
        const dbFilter = await dbGames.filter(el => el.name.toLowerCase().includes(normName))
        res.status(200).send(dbFilter);
    }
    else {
        res.status(200).send(dbGames)
    }
}


async function getAllVidegames (req, res){
    const { name } = req.query;
    if (!name) {
        try {
            const apiResults = await VideogamesApi();
            const dbiResults = await VideogamesDataBase();
            return res.send(await Promise.all([dbiResults, apiResults]))

        } catch (error) {
            res.json({ error }),
                console.log(error)
        }
    }
    else {
        const normName = name.toLowerCase()
        try {
            const apiResults = await VideogamesApi();
            const dbGames = await VideogamesDataBase();

            const apiFilter = apiResults.filter(el => el.name.toLowerCase().includes(normName));
            const dbFilter = await dbGames.filter(el => el.name.toLowerCase().includes(normName))

            if (apiFilter && dbFilter.length < 1) {
                return res.send(apiFilter);
            }
            if (dbFilter && apiFilter.length < 1) {
                return res.send(dbFilter);
            }
            else {
                return res.send(await Promise.all([dbFilter, apiFilter]))
            }

        } catch (error) {
            res.json({ error })
            console.log(error)
        }
    }


}


async function postVideogame (req, res){
    const { name, background_image, description, released, rating, platforms, genres } = req.body;
    if (!name || !description || !platforms) {
        return res.status(404).send('Name, description and platforms fields cant be empty')
    }
    try {
        const newGame = await Videogame.create({
            id: uuidv4(),
            name: name,
            background_image: background_image,
            description: description,
            released: released,
            rating: rating,
            platforms: platforms.join(' , '),

        })
        if (genres) {
            const genresDb = await Genres.findAll({
                where: {
                    name: genres,
                },

                attributes: [
                    'id'
                ],

            })
            newGame.addGenres(genresDb)
        }
        return res.status(200).json(newGame);
    }
    catch (error) {
        res.status(404).json({ error })
        console.log(error);
    }

}

async function putVideoGame (req, res){
    const { id } = req.params
    const videogame = req.body
    try {
        const videoUp = await Videogame.update(videogame, {
            where: {
                id,
            },
        })
        return res.sendStatus(200);
    }
    catch(error){
        res.status(404).json({error});
        console.log(error)
    }

}

async function deleteVideogame (req, res){
    let {id} = req.params;
    try{
    const videoDestroy = await Videogame.destroy({
        where: {
            id,
        },
    })
    res.sendStatus(200);
    }
    catch(error){
        res.status(404).json({error});
        console.log(error)
    }
       
}


module.exports = {
    getAllVidegamesDB,
    getAllVidegames,
    postVideogame,
    putVideoGame,
    deleteVideogame,
    getDetailById
}






/* async function getById (req, res){
    const { id } = req.params
    const normId = parseInt(id);

    try {
        const apiResults = await VideogamesApi();
        const dbGames = await VideogamesDataBase();

        const apiFilter = apiResults.filter(el => el.id === normId);
        const dbFilter = await dbGames.filter(el => el.id == id);

        if (apiFilter && dbFilter.length < 1) {
            return res.send(apiFilter);
        }
        if (dbFilter && apiFilter.length < 1) {
            return res.send(dbFilter);
        }
        else {
            return res.send(await Promise.all([dbFilter, apiFilter]))
        }

    } catch (error) {
        res.json({ error })
        console.log(error)
    }

} */
