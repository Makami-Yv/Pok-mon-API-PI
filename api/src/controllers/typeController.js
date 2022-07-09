const { Type } = require('../db');
const axios = require('axios');

const getAllTypes = async () => {
    try {
        const typesApi = await axios.get(`https://pokeapi.co/api/v2/type`);
        let createdTypes = await Promise.all(typesApi.data.results?.map(ty => Type.findOrCreate({where:{name: ty.name}}))); //Guardamos los types en la DB
        
        if(createdTypes) {
            const typeDB = await Type.findAll()
            getType = typeDB.map(ty => ty.dataValues.name)
            return getType
        }

    } catch (e) {
        console.error(e)
        throw new Error (e);
    }
}

module.exports = getAllTypes;