'use strict';
module.exports = (sequelize, DataTypes) => {
  var Player = sequelize.define('Player', {
    name: DataTypes.STRING,
    score: DataTypes.INTEGER
  }, {});
  Player.associate = function(models) {
    // associations can be defined here
  };
  return Player;
};