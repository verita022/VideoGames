const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    background_image:{
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    released:{
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.INTEGER
    },
    platforms: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  },
  {
    timestamps: false
  });
  
};

//https://api.rawg.io/api/games?key=5cab1f54cde1497eac352f4b5c48db23