const { Router } = require('express');
const { getDetailById, getAllVidegamesDB, getAllVidegames, postVideogame, putVideoGame, deleteVideogame } = require('../controllers/Videogame')
const router = Router();

router.get('/db', getAllVidegamesDB )

router.get('/', getAllVidegames)

router.get('/:id', getDetailById)

router.post('/', postVideogame)

router.put('/:id', putVideoGame)

router.delete('/:id', deleteVideogame)


module.exports = router;