const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sprite: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {isUrl: true},
      defaultValue: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/MissingNo.png/320px-MissingNo.png"
    },
    hp: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    attack: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    defense: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    esp_attack: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    esp_defense: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    speed: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    height: {
      type: DataTypes.DECIMAL,
    },
    weight: {
      type: DataTypes.DECIMAL,
    },
  },  { timestamps: false } );
};
