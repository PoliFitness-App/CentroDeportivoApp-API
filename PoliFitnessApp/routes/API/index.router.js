const express = require("express");
const router = express.Router();

//importar todos los enrutadores
const postRouter = require("./post.router");
const authRouter = require("./auth.router");
const rutineRouter = require("./rutines.router");

//Definir las rutas
router.use("/auth", authRouter);
router.use("/post", postRouter);
router.use("/rutine", rutineRouter);

module.exports = router;