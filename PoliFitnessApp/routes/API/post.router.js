const express = require("express");
const router = express.Router();

const ROLES = require("../../data/roles.constants.json");

/*
* POST CONTROLLERS
 */

const postController = require("../../controllers/post.controller")

/*
* POST VALIDATORS
*/

const postValidators = require("../../validators/post.validators");
const runValidations = require("../../validators/index.middleware");

/*
* AUTH MIDDLEWARES
*/

const { authentication, authorization } = require('../../middlewares/auth.middewares');

/*
* POST ROUTES
*/

/*
* FIND ALL POST's
*/

router.get("/", postController.findAllPosts);

/*
* CREATE POST
*/

router.post("/createPost",
    authentication,
    authorization(ROLES.ADMIN),
    postValidators.createPostValidator,
    runValidations,
    postController.createPost);

/*
* FIND POST BY CATEGORY
*/
  
router.get("/getPostByCategory", 
    postValidators.findPostByCategoryValidator,
    runValidations,
    postController.findPostsByCategory);

/*
* FIND POST BY ID
*/

router.patch("/getPost/:identifier",
    postValidators.findPostByIdValidator,
    runValidations,
    postController.findOneById);

/*
* DELETE POST BY ID
*/

router.patch("/deletePost/:identifier",
    authentication,
    authorization(ROLES.ADMIN),
    postValidators.deletePostByIdValidator,
    runValidations,
    postController.togglePostVisibility);

module.exports = router;