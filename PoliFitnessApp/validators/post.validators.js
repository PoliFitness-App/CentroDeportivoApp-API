const { body, param } = require("express-validator");
const validators = {};

validators.createPostValidator = [

  // VALIDATE TITLE
  
  body("title")
    .notEmpty().withMessage("El título no debe de ser vacío"),


  // VALIDATE DESCRIPTION

  body("description")
    .notEmpty().withMessage("La descripción no debe de ser vacía")
    .isLength({ max: 280 }).withMessage("La descripción no debe superar los 180 caracteres"),
  

  // VALIDATE IMAGE

  body("image")
    .optional()
    .notEmpty().withMessage("Debes de enviar una imagen")
    .isURL().withMessage("La imagen debe de ser una URL"),

  // VALIDATE CATEGORY

  body("category")
    .notEmpty().withMessage("La categoría no debe de ser vacía")
];

validators.findPostByIdValidator = [
  
  body("identifier")
    .notEmpty().withMessage("El id no debe de ir vacío")
    .isMongoId().withMessage("El id debe de ser de mongo")

]

module.exports = validators;