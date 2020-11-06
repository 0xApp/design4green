"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class region_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  region_master.init(
    {
      Name: DataTypes.STRING,
      Id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Region_Master",
      tableName: "region_master",
      updatedAt: false,
      createdAt: false,
    }
  );
  return region_master;
};
