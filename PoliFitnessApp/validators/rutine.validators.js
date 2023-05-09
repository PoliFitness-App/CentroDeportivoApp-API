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

  body('image')
    .optional()
    .notEmpty().withMessage('Debes enviar una imagen')
    .isURL().withMessage('La imagen debe ser una URL'),

  // VALIDATE CATEGORY

  body('category').notEmpty().withMessage('La categoría no debe ser vacía'),

  // VALIDATE AGE RANGE

  body('ageRange.min').notEmpty().withMessage('El rango de edad mínimo no debe ser vacío'),
  body('ageRange.max').notEmpty().withMessage('El rango de edad máximo no debe ser vacío'),

  // VALIDATE ROUTINE TYPE

  body('routineType').notEmpty().withMessage('El tipo de rutina no debe ser vacío'),

  // VALIDATE BMI RANGE

  body('bmiRange.min')
    .notEmpty().withMessage('El rango de IMC mínimo no debe ser vacío')
    .isFloat({ min: 0, max: 1000 }).withMessage('El rango de IMC mínimo debe estar entre 0 y 1000'),
    
  body('bmiRange.max')
    .notEmpty().withMessage('El rango de IMC máximo no debe ser vacío')
    .isFloat({ min: 0, max: 1000 }).withMessage('El rango de IMC máximo debe estar entre 0 y 1000'),

  // VALIDATE WAIST TO HIP RATIO RANGE

  body('waistToHipRatioRange.min')
    .notEmpty().withMessage('El rango de ICC mínimo no debe ser vacío')
    .isFloat({ min: 0, max: 1000 }).withMessage('El rango de ICC mínimo debe estar entre 0 y 1000'),

  body('waistToHipRatioRange.max')
    .notEmpty().withMessage('El rango de ICC máximo no debe ser vacío')
    .isFloat({ min: 0, max: 1000 }).withMessage('El rango de ICC máximo debe estar entre 0 y 1000'),

  // VALIDATE DIFFICULTY

  body('difficulty').notEmpty().withMessage('La dificultad no debe ser vacía'),

  // VALIDATE CALORIES

  body('calories').notEmpty().withMessage('Las calorías no deben ser vacías'),

  // VALIDATE ROUTINE TIME
  body('routineTime').notEmpty().withMessage('El tiempo de rutina no debe ser vacío'),

]

validators.findRutineByIdValidator = [
  
  body("identifier")
    .notEmpty().withMessage("El id no debe de ir vacío")
    .isMongoId().withMessage("El id debe de ser de mongo")

]

module.exports = validators;