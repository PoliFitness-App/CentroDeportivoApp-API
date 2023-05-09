const express = require("express");
const router = express.Router();

// AUN EN PROCESO...

// const ROLES = require("../../data/roles.constants.json");

// RUTINE CONTROLORES

const rutineController = require("../../controllers/rutine.controller");


// VALIDATORS

const rutineValidators = require("../../validators/rutine.validators");
const runValidations = require("../../validators/index.middleware");

// RUTAS

// FIND ALL RUTINES

router.get("/", rutineController.findAllRutines);

// CREATE RUTINES

router.post("/createRutine",
    rutineController.createRutine);

// GET RUTINE BY TAGS -- TO  DO "AUN FALTA"

// TO DO FITLTROS PARA LAS RUTINAS

//router.get("/category", postController.findPostsByCategory);

// FIND RUTINE BY ID

router.get("/getRutine",
    rutineValidators.findRutineByIdValidator,
    runValidations,
    rutineController.findRutineOneById);

// DELETE RUTINE BY ID

router.delete("/deleteRutine",
    rutineValidators.findRutineByIdValidator,
    runValidations,
    rutineController.deleteRutineById);


module.exports = router;