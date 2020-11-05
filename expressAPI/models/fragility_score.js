"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Fragility_Score extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Fragility_Score.init(
    {
      NomCom: { allowNull: false, type: DataTypes.STRING },
      CodeIris: { allowNull: false, type: DataTypes.TEXT },
      NomIris: { allowNull: false, type: DataTypes.TEXT },
      LibRegion: { allowNull: false, type: DataTypes.INTEGER },
      LibDepartment: { allowNull: false, type: DataTypes.INTEGER },
      LibInterCommunality: { allowNull: false, type: DataTypes.INTEGER },
      LibCommune: { allowNull: false, type: DataTypes.INTEGER },
      DonneesInfraCommunal: { allowNull: false, type: DataTypes.INTEGER },
      PopulationScore: { allowNull: false, type: DataTypes.INTEGER },
      ScoreGlobalRegion: { allowNull: false, type: DataTypes.INTEGER },
      ScoreGlobalDepartment: { allowNull: false, type: DataTypes.INTEGER },
      ScoreGlobalInterCommunal: { allowNull: false, type: DataTypes.INTEGER },
      AccessAuxInterfaceNumberRegion: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      AccessAuxInterfaceNumberDepartment: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      AccessAuxInterfaceNumberCommunal: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      AccessInformationRegion: { allowNull: false, type: DataTypes.INTEGER },
      AccessInformationDepartment: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      AccessInformationCommunal: { allowNull: false, type: DataTypes.INTEGER },
      GlobalAccessRegion: { allowNull: false, type: DataTypes.INTEGER },
      GlobalAccessDepartment: { allowNull: false, type: DataTypes.INTEGER },
      GlobalAccessCommunal: { allowNull: false, type: DataTypes.INTEGER },
      GlobalCompetenceRegion: { allowNull: false, type: DataTypes.INTEGER },
      GlobalCompetenceDepartment: { allowNull: false, type: DataTypes.INTEGER },
      GlobalCompetenceCommunal: { allowNull: false, type: DataTypes.INTEGER },
      CompetenceAdministrativeRegion: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      CompetenceAdministrativeDepartment: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      CompetenceAdministrativeCommunal: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      CompetenceSolarisRegion: { allowNull: false, type: DataTypes.INTEGER },
      CompetenceSolarisDepartment: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      CompetenceSolarisCommunal: { allowNull: false, type: DataTypes.INTEGER },
    },
    {
      sequelize,
      modelName: "Fragility_Score",
      tableName: "fragility_score",
      updatedAt: false,
      createdAt: false,
    }
  );
  return Fragility_Score;
};
