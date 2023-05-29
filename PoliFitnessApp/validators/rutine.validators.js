const { body, param } = require("express-validator");
const validators = {};

validators.createRutineValidator = [
  // VALIDATE TITLE

  body('title').notEmpty().withMessage('El título no debe ser vacío'),

  // VALIDATE DESCRIPTION

  body('description')
    .notEmpty().withMessage('La descripción no debe ser vacía')
    .isLength({ max: 280 }).withMessage('La descripción no debe superar los 280 caracteres'),

  // VALIDATE IMAGE

  body('url')
    .notEmpty().withMessage('Debes enviar una imagen')
    .isURL().withMessage('Debe ingresarse una URL de rutina'),

  // VALIDATE ROUTINE TYPE

  body('approach').notEmpty().withMessage('El enfoque de la rutina no debe ser vacío'),

  // VALIDATE DIFFICULTY

  body('level').notEmpty().withMessage('El nivel no debe ser vacía'),
]

/*
  VALIDATE ROUTINE ID
*/

validators.findRutineByIdValidator = [
  
  body("id")
    .notEmpty().withMessage("El id no debe de ir vacío")
    .isMongoId().withMessage("El id debe de ser de mongo")

]

/*
  VALIDATE CATEGORY
*/

validators.findRoutineByCategoryValidator = [
  body("category")
    .notEmpty().withMessage("La categoría no debe de ir vacía")
    .isString().withMessage("La categoría debe de ser un string")
]

/*
  VALIDATE APPROACH
*/

validators.getRoutineByApproachValidator = [
  body("approach")
    .notEmpty().withMessage("El enfoque no debe de ir vacío")
    .isString().withMessage("El enfoque debe de ser un string")
]

/*
  VALIDATE LEVEL
*/

validators.getRoutineByLevelValidator = [
  body("level")
    .notEmpty().withMessage("El nivel no debe de ir vacío")
    .isString().withMessage("El nivel debe de ser un string")
]

/*
  VALIDATE CATEGORY AND LEVEL
*/

validators.getRoutineByCategoryAndLevelValidator = [
  body("category")
    .notEmpty().withMessage("La categoría no debe de ir vacía")
    .isString().withMessage("La categoría debe de ser un string"),
  body("level")
    .notEmpty().withMessage("El nivel no debe de ir vacío")
    .isString().withMessage("El nivel debe de ser un string")
]

module.exports = validators;