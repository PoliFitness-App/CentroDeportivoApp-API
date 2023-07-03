const express = require("express");
const router = express.Router();

const ROLES = require("../../data/roles.constants.json");

// RUTINE CONTROLORES

const routineController = require("../../controllers/rutine.controller");

// VALIDATORS

const routineValidators = require("../../validators/rutine.validators");
const runValidations = require("../../validators/index.middleware");

// RUTAS

/*
* FIND ALL RUTINES
*/

router.get("/", routineController.findAllRoutines);

/*
* AUTH MIDDLEWARES
*/

const { authentication, authorization } = require('../../middlewares/auth.middewares');

/*
* CREATE RUTINE
*/

router.post("/createRoutine",
    authentication,
    authorization(ROLES.ADMIN),
    routineValidators.createRutineValidator,
    runValidations,
    routineController.createRutine);

/*
* FIND RUTINE BY ID
*/

router.patch("/getRoutine/:identifier",
    routineValidators.findRutineByIdValidator,
    runValidations,
    routineController.findRutineOneById);

/*
* FIND RUTINE BY CATEGORY
*/

router.get("/getRoutineByCategory",
    routineValidators.findRoutineByCategoryValidator,
    runValidations,
    routineController.findRoutineByCategory);

/*
* DELETE RUTINE BY ID
*/

router.patch("/deleteRoutine/:identifier",
    authentication,
    authorization(ROLES.ADMIN),
    routineValidators.findRutineByIdValidator,
    runValidations,
    routineController.toggleRoutineVisibility);

/*
* GET RUTINE BY APROACH
*/

router.get("/getRoutineByAproach",
    routineValidators.getRoutineByApproachValidator,
    runValidations,
    routineController.getRoutineByApproach);

/*
* GET RUTINE BY LEVEL
*/

router.get("/getRoutineByLevel",
    routineValidators.getRoutineByLevelValidator,
    runValidations,
    routineController.getRoutineByLevel);

/*
* GET RUTINE BY LEVEL AND CATEGORY
*/

router.get("/getRoutineByLevelAndCategory",
    routineValidators.getRoutineByCategoryAndLevelValidator,
    runValidations,
    routineController.getRoutineByLevelAndCategory);

module.exports = router;