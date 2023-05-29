const { body } = require("express-validator");
//nada 2

const validators = {};
const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,32})/

validators.registerValidator = [

  body("username")
    .notEmpty().withMessage("El username no puede ir vacío")
    .isLength({ min: 4, max: 32 }).withMessage("El username debe tener entre 4 y 32 caracteres"),

  body("email")
    .notEmpty().withMessage("El correo no debe de ir vacío")
    .isEmail().withMessage("Debes respetar el formato del correo"),

  body("password")
    .notEmpty().withMessage("La contraseña no puede ir vacía")
    .matches(passwordRegexp).withMessage("La contraseña debe de tener entre 8 y 32 chars, y al menos 1 M, 1 m y 1 #"),

  body("lastname")
    .notEmpty().withMessage("El lastname no puede ir vacío")
    .isLength({min:3, max:32}).withMessage("El lastname debe tener entre 3 y 32 caracteres"),

  body("imc")
    .notEmpty().withMessage("Debe agregarse un imc")
    .isFloat({ min: 5, max: 100 }).withMessage("Debe ingresarse un número flotante, debe ser mayor a 5 y menor a 100"),
  
  body("icc")
    .notEmpty().withMessage("Debe agregarse un icc")
    .isFloat().withMessage("Debe ingresarse un número flotante"),

  body("birthday")
    .notEmpty().withMessage("Debe agregarse una fecha de nacimiento"),

  body("weight")
    .notEmpty().withMessage("Debe ingresarse un peso")
    .isFloat({ min: 10, max: 300 }).withMessage("Debe ingresarse un número flotante, el peso mínimo es de 10kg y el peso máximo es 300kg"),

  body("waistP")
    .notEmpty().withMessage("debe ingresar el perímetro de cintura")
    .isFloat().withMessage("Debe ingresarse un número flotante"),

  body("hipP")
    .notEmpty().withMessage("Debe ingresar el perímetro de cadera")
    .isFloat().withMessage("Debe ingresarse un número flotante"),

  body("height")
    .notEmpty().withMessage("Debe ingresarse la altura")
    .isFloat().withMessage("Debe ingresarse un número flotante")
]

module.exports = validators;