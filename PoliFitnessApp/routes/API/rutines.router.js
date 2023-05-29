const express = require("express");
const router = express.Router();

// RUTINE CONTROLORES

const rutineController = require("../../controllers/rutine.controller");

// VALIDATORS

const rutineValidators = require("../../validators/rutine.validators");
const runValidations = require("../../validators/index.middleware");

// RUTAS

/*
* FIND ALL RUTINES
*/

router.get("/", rutineController.findAllRutines);

/*
* CREATE RUTINE
*/

router.post("/createRutine",
    rutineValidators.createRutineValidator,
    runValidations,
    rutineController.createRutine);

/*
* FIND RUTINE BY ID
*/

router.get("/getRutine",
    rutineValidators.findRutineByIdValidator,
    runValidations,
    rutineController.findRutineOneById);

/*
* FIND RUTINE BY CATEGORY
*/

router.get("/getRutineByCategory",
    rutineValidators.findRoutineByCategoryValidator,
    runValidations,
    rutineController.findRoutineByCategory);

/*
* DELETE RUTINE BY ID
*/

router.patch("/deleteRutine:identifier",
    rutineValidators.findRutineByIdValidator,
    runValidations,
    rutineController.deleteRutineById);

/*
* GET RUTINE BY APROACH
*/

router.get("/getRutineByAproach",
    rutineValidators.getRoutineByApproachValidator,
    runValidations,
    rutineController.getRoutineByApproach);

/*
* GET RUTINE BY LEVEL
*/

router.get("/getRutineByLevel",
    rutineValidators.getRoutineByLevelValidator,
    runValidations,
    rutineController.getRoutineByLevel);

/*
* GET RUTINE BY LEVEL AND CATEGORY
*/

router.get("/getRutineByLevelAndCategory",
    rutineValidators.getRoutineByCategoryAndLevelValidator,
    runValidations,
    rutineController.getRoutineByLevelAndCategory);

module.exports = router;