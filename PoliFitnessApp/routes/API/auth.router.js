const Express = require("express");
const router = Express.Router();

const authController = require("../../controllers/auth.controller");
const runValidations = require("../../validators/index.middleware");
const { registerValidator, updateRolValidator } = require("../../validators/auth.validators");
const { authentication } = require("../../middlewares/auth.middewares");

router.post("/signup",
  registerValidator,
  runValidations,
  authController.register
);

router.post("/signin", authController.login);

router.get("/whoami", authentication, authController.whoami);

router.post("/update",
    authentication,
    authController.updateUserData
);

router.post("/setRol",
    authentication,
    updateRolValidator,
    runValidations,
    authController.updateRol
);

router.get("/",
    authentication,
    authController.findAllUser
);

module.exports = router;