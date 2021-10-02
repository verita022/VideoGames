const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Videogame, Gender } = require('../db')
const { Sequelize } = require('sequelize');


const VideogamesApi = async () => {
    const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
    const result = await apiUrl.data.results.map(el => {
        return {
            id: el.id,
            name: el.name,
            genres: el.genres.map(el => el.name),
            background_image: el.background_image

        }
    })
    return result;
}

const VideogamesDataBase = async () => {
    return await Videogame.findAll({
        include: {
            model: Gender,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }

    });

}

async function getAllVidegamesDB(req, res){
    const { name } = req.query;
    const dbGames = await VideogamesDataBase();
    if (name) {
        normName = name.toLowerCase()
        const dbFilter = await dbGames.filter(el => el.name.toLowerCase().includes(normName))
        res.send(dbFilter);
    }
    else {
        res.send(dbGames)
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

async function getById (req, res){
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

}

async function postVideogame (req, res){
    const { name, background_image, description, released, rating, platforms, gender } = req.body;
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
            platforms: platforms

        })
        if (gender) {
            const genderDb = await Gender.findAll({
                where: {
                    name: gender,
                },

                attributes: [
                    'id'
                ],

            })
            newGame.addGender(genderDb)
        }
        return res.json(newGame);
    }
    catch (error) {
        send.status(404).json({ error })
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
    const {id} = req.params;
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
    getById,
    postVideogame,
    putVideoGame,
    deleteVideogame
}