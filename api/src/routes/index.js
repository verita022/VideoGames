const { Router } = require('express');
const VideogameRoutes = require('./Videogame');
const GenderRoutes = require('./Gender');


const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', VideogameRoutes);
router.use('/genres', GenderRoutes);



module.exports = router;
