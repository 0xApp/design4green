"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class intercommunalities_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  intercommunalities_master.init(
    {
      Name: DataTypes.STRING,
      Id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Intercommunalities_Master",
      tableName: "intercommunalities_master",
      updatedAt: false,
      createdAt: false,
    }
  );
  return intercommunalities_master;
};
