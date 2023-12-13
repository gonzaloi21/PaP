'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Participant.init({
    number: DataTypes.INTEGER,
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    winner: {
      type: DataTypes.BOOLEAN,
      defaultValue: false},
    phone: DataTypes.STRING,
    prize: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    prize_name: DataTypes.STRING,
    brand: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Participant',
  });
  return Participant;
};