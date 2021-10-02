const { Router } = require('express');
const { getAllVidegamesDB, getAllVidegames, getById, postVideogame, putVideoGame, deleteVideogame } = require('../controllers/Videogame')
const router = Router();

router.get('/db', getAllVidegamesDB )

router.get('/', getAllVidegames)

router.get('/:id', getById)

router.post('/', postVideogame)

router.put('/:id', putVideoGame)

router.delete('/:id', deleteVideogame)


module.exports = router;