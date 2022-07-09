// Importamos los controllers y dependencias necesarias
const { Router } = require("express");
const getAllTypes = require ('../controllers/typeController')

const typeRouter = Router();

// Configurar los routers

// GET para Todos los types
typeRouter.get('/', async (req, res) => {
    try {
        return res.status(200).send(await getAllTypes());
        
    } catch (e) {
        console.log(e);
        return res.status(400).send('Types Not fo')
    }
});

module.exports = typeRouter;