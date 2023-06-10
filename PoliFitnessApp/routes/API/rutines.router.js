const express = require("express");
const router = express.Router();

const ROLES = require("../../data/roles.constants.json");

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
* AUTH MIDDLEWARES
*/

const { authentication, authorization } = require('../../middlewares/auth.middewares');

/*
* CREATE RUTINE
*/

router.post("/createRutine",
    authentication,
    authorization(ROLES.ADMIN),
    rutineValidators.createRutineValidator,
    runValidations,
    rutineController.createRutine);

/*
* FIND RUTINE BY ID
*/

router.patch("/getRutine:identifier",
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

router.patch("/deleteRoutine/:identifier",
    authentication,
    authorization(ROLES.ADMIN),
    rutineValidators.findRutineByIdValidator,
    runValidations,
    rutineController.toggleRoutineVisibility);

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