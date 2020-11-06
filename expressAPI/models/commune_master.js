"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class commune_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  commune_master.init(
    {
      Name: DataTypes.STRING,
      Id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Commune_Master",
      tableName: "commune_master",
      updatedAt: false,
      createdAt: false,
    }
  );
  return commune_master;
};
