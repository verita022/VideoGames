const { Router } = require('express');
const router = Router();
const { getAllGenres } = require('../controllers/Gender')


router.get('/', getAllGenres)

module.exports = router; 