var express = require("express");
var router = express.Router();
const db = require("../models");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/master", async (req, res) => {
  try {
    const commune_master = await db.Commune_Master.findAll();
    const department_master = await db.Department_Master.findAll();
    const interCommune_master = await db.Intercommunalities_Master.findAll();
    const region_master = await db.Region_Master.findAll();

    return res.send({
      Commune_Master: commune_master,
      Department_Master: department_master,
      interCommune_master: interCommune_master,
      region_master: region_master,
    });
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
});

router.get("/datas", (req, res) => {
  return db.Fragility_Score.findAll()
    .then((contacts) => res.send(contacts))
    .catch((err) => {
      console.log("There was an error querying contacts", JSON.stringify(err));
      return res.send(err);
    });
});

router.post("/datas", async (req, res) => {
  const body = req.body;
  const criteria = body.criteria;
  const {
    region,
    department,
    intercommnality,
    commune,
    calcul,
    referencePoint,
    scoreMinValue,
    scoreMaxValue,
    pageIndex,
    pageSize,
  } = criteria;

  let data = [];
  let foundRegion;
  let foundDepartment;
  let foundIntercommnality;
  let foundCommune;
  let offset = pageIndex ? pageIndex : 0;
  let limit = pageSize ? pageSize : 100;

  let where = {};
  if (region) {
    foundRegion = await db.Region_Master.findOne({
      where: { Name: region.data },
    });

    if (foundRegion) {
      if (region.exclude) {
        where["LibRegion"] = { [Op.ne]: foundRegion.Id };
      } else {
        where["LibRegion"] = foundRegion.Id;
      }
    }
  }

  if (department) {
    foundDepartment = await db.Department_Master.findOne({
      where: { Name: department.data },
    });
    if (foundDepartment) {
      if (department.exclude) {
        where["LibDepartment"] = { [Op.ne]: foundDepartment.Id };
      } else {
        where["LibDepartment"] = foundDepartment.Id;
      }
    }
  }

  if (intercommnality) {
    foundIntercommnality = await db.Intercommunalities_Master.findOne({
      where: { Name: intercommnality.data },
    });
    if (foundIntercommnality) {
      if (intercommnality.exclude) {
        where["LibInterCommunality"] = { [Op.ne]: foundIntercommnality.Id };
      } else {
        where["LibInterCommunality"] = foundIntercommnality.Id;
      }
    }
  }

  if (commune) {
    foundCommune = await db.Commune_Master.findOne({
      where: { Name: commune.data },
    });

    if (foundCommune) {
      if (commune.exclude) {
        where["LibCommune"] = { [Op.ne]: foundCommune.Id };
      } else {
        where["LibCommune"] = foundCommune.Id;
      }
    }
  }

  if (scoreMinValue && scoreMaxValue) {
    where["ScoreGlobalRegion"] = {
      [Op.gte]: scoreMinValue,
      [Op.lte]: scoreMaxValue,
    };
  }

  if (scoreMinValue && !scoreMaxValue) {
    where["ScoreGlobalRegion"] = { [Op.gte]: scoreMaxValue };
  }

  if (scoreMaxValue && !scoreMinValue) {
    where["ScoreGlobalRegion"] = { [Op.lte]: scoreMaxValue };
  }

  if (calcul) {
    where["DonneesInfraCommunal"] = calcul ? 1 : 0;
  }

  let rankColumn;
  let columns = [];

  columns.push(["NomCom", "nomCom"]);
  columns.push(["CodeIris", "codeIris"]);
  columns.push(["NomIris", "nomIris"]);
  columns.push(["LibRegion", "libRegion"]);
  columns.push(["LibDepartment", "libDepartment"]);
  columns.push(["LibInterCommunality", "libInterCommunality"]);
  columns.push(["LibCommune", "libCommune"]);
  columns.push(["DonneesInfraCommunal", "donneesInfraCommunal"]);
  columns.push(["PopulationScore", "populationScore"]);

  if (
    referencePoint === "REGION" ||
    referencePoint === "ALL" ||
    referencePoint === ""
  ) {
    rankColumn = "ScoreGlobalRegion";
    columns.push(["ScoreGlobalRegion", "scoreGlobal"]);
    columns.push([
      "AccessAuxInterfaceNumberRegion",
      "accessAuxInterfaceNumber",
    ]);
    columns.push(["AccessInformationRegion", "accessInformation"]);
    columns.push(["GlobalAccessRegion", "globalAccess"]);
    columns.push(["GlobalCompetenceRegion", "globalCompetence"]);
    columns.push([
      "CompetenceAdministrativeRegion",
      "competenceAdministrative",
    ]);
    columns.push(["CompetenceSolarisRegion", "competenceSolaris"]);
  }

  if (referencePoint === "INTERCOMMUNALITE") {
    rankColumn = "ScoreGlobalInterCommunal";
    columns.push(["ScoreGlobalInterCommunal", "scoreGlobal"]);
    columns.push([
      "AccessAuxInterfaceNumberCommunal",
      "accessAuxInterfaceNumber",
    ]);
    columns.push(["AccessInformationCommunal", "accessInformation"]);
    columns.push(["GlobalAccessCommunal", "globalAccess"]);
    columns.push(["GlobalCompetenceCommunal", "globalCompetence"]);
    columns.push([
      "CompetenceAdministrativeCommunal",
      "competenceAdministrative",
    ]);
    columns.push(["CompetenceSolarisCommunal", "competenceSolaris"]);
  }

  if (referencePoint === "DEPARTMENT") {
    rankColumn = "ScoreGlobalDepartment";
    columns.push(["ScoreGlobalDepartment", "scoreGlobal"]);
    columns.push([
      "AccessAuxInterfaceNumberDepartment",
      "accessAuxInterfaceNumber",
    ]);
    columns.push(["AccessInformationDepartment", "accessInformation"]);
    columns.push(["GlobalAccessDepartment", "globalAccess"]);
    columns.push(["GlobalCompetenceDepartment", "globalCompetence"]);
    columns.push([
      "CompetenceAdministrativeDepartment",
      "competenceAdministrative",
    ]);
    columns.push(["CompetenceSolarisDepartment", "competenceSolaris"]);
  }

  data = await db.Fragility_Score.findAll({
    where: where,
    offset: offset * limit,
    limit: limit,
    attributes: [
      ...columns,
      [
        Sequelize.literal(`(RANK() OVER (ORDER BY ${rankColumn} DESC))`),
        "scoreRank",
      ],
    ],
  });

  const stats = await db.Fragility_Score.findAll({
    where: where,
    attributes: [
      [Sequelize.fn("count", Sequelize.col("id")), "count"],
      [Sequelize.fn("min", Sequelize.col(rankColumn)), "min"],
      [Sequelize.fn("max", Sequelize.col(rankColumn)), "max"],
    ],
    raw: true,
  });

  let response = {
    scores: data,
    totalRecords: stats[0].count,
    minScore: stats[0].min,
    maxScore: stats[0].max,
  };

  return res.send(response);
});

module.exports = router;
