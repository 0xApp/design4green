var express = require("express");
var router = express.Router();
const db = require("../models");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/datas", (req, res) => {
  return db.Fragility_Score.findAll()
    .then((contacts) => res.send(contacts))
    .catch((err) => {
      console.log("There was an error querying contacts", JSON.stringify(err));
      return res.send(err);
    });
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
      where["LibRegion"] = foundRegion.Id;
    }
  }

  if (department) {
    foundDepartment = await db.Department_Master.findOne({
      where: { Name: department.data },
    });
    if (foundDepartment) {
      where["LibDepartment"] = foundDepartment.Id;
    }
  }

  if (intercommnality) {
    foundIntercommnality = await db.Intercommunalities_Master.findOne({
      where: { Name: intercommnality.data },
    });
    if (foundIntercommnality) {
      where["LibInterCommunality"] = foundIntercommnality.Id;
    }
  }

  if (commune) {
    foundCommune = await db.Commune_Master.findOne({
      where: { Name: commune.data },
    });
    if (foundCommune) {
      where["LibCommune"] = foundCommune.Id;
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

  let columns = [];

  columns.push("NomCom");
  columns.push("CodeIris");
  columns.push("NomIris");
  columns.push("LibRegion");
  columns.push("LibDepartment");
  columns.push("LibInterCommunality");
  columns.push("LibCommune");
  columns.push("DonneesInfraCommunal");
  columns.push("PopulationScore");

  if (referencePoint === "REGION" || referencePoint === "ALL") {
    columns.push(["ScoreGlobalRegion", "ScoreGlobale"]);
    columns.push([
      "AccessAuxInterfaceNumberRegion",
      "AccessAuxInterfaceNumber",
    ]);
    columns.push(["AccessInformationRegion", "AccessInformation"]);
    columns.push(["GlobalAccessRegion", "GlobalAccess"]);
    columns.push(["GlobalCompetenceRegion", "GlobalCompetence"]);
    columns.push([
      "CompetenceAdministrativeRegion",
      "CompetenceAdministrative",
    ]);
    columns.push(["CompetenceSolarisRegion", "CompetenceSolaris"]);
  }

  if (referencePoint === "INTERCOMMUNALITE") {
    columns.push(["ScoreGlobalInterCommunal", "ScoreGlobale"]);
    columns.push([
      "AccessAuxInterfaceNumberCommunal",
      "AccessAuxInterfaceNumber",
    ]);
    columns.push(["AccessInformationCommunal", "AccessInformation"]);
    columns.push(["GlobalAccessCommunal", "GlobalAccess"]);
    columns.push(["GlobalCompetenceCommunal", "GlobalCompetence"]);
    columns.push([
      "CompetenceAdministrativeCommunal",
      "CompetenceAdministrative",
    ]);
    columns.push(["CompetenceSolarisCommunal", "CompetenceSolaris"]);
  }

  if (referencePoint === "DEPARTMENT") {
    columns.push(["ScoreGlobalDepartment", "ScoreGlobale"]);
    columns.push([
      "AccessAuxInterfaceNumberDepartment",
      "AccessAuxInterfaceNumber",
    ]);
    columns.push(["AccessInformationDepartment", "AccessInformation"]);
    columns.push(["GlobalAccessDepartment", "GlobalAccess"]);
    columns.push(["GlobalCompetenceDepartment", "GlobalCompetence"]);
    columns.push([
      "CompetenceAdministrativeDepartment",
      "CompetenceAdministrative",
    ]);
    columns.push(["CompetenceSolarisDepartment", "CompetenceSolaris"]);
  }

  data = await db.Fragility_Score.findAll({
    where: where,
    offset: offset * limit,
    limit: limit,
    attributes: [
      ...columns,
      [
        Sequelize.literal("(RANK() OVER (ORDER BY ScoreGlobalRegion ASC))"),
        "rank",
      ],
    ],
  });

  return res.send(data);
  // return db.Fragility_Score.findAll()
  //   .then((contacts) => res.send(contacts))
  //   .catch((err) => {
  //     console.log("There was an error querying contacts", JSON.stringify(err));
  //     return res.send(err);
  //   });
});

module.exports = router;
