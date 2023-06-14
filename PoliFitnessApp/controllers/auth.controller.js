const User = require("../models/User.model");
const debug = require("debug")("app:auth-controller");
const ROLES = require("../data/roles.constants.json");

const { createToken, verifyToken } = require("../utils/jwt.tools");

const controller = {};

/*
* USER REGISTER
*/

controller.register = async (req, res) => {
  try {

   // REQ.BODY = USER DATA

    const { username, lastname, email, password, imc, icc, gender, birthday, weight, height,waistP,hipP, approach } = req.body;

    // VALIDATE USER 

    const user = await User.findOne({ $or: [{ username: username }, { email: email }] });

    // IF USER EXISTS

    if (user) {
      return res.status(409).json({ error: "Este usuario ya existe" });
    }

    /*
    * IF USER DOESN'T EXIST
    * 1. CREATE NEW USER
    * 2. SAVE NEW USER
    * 3. RETURN SUCCESS MESSAGE
    */

    const newUser = new User({
      username: username,
      lastname: lastname,
      email: email,
      password: password,
      imc: imc,
      icc: icc,
      gender: gender,
      birthday: birthday,
      weight: weight,
      height: height,
      waistP: waistP,
      hipP: hipP,
      approach: approach,
      roles: [ROLES.USER]
    })

    await newUser.save();

    return res.status(201).json({ message: "Usuario creado con éxito!" })
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Error inesperado" })
  }
}

/*
* LOG IN USER
*/

controller.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    //Paso 01: Verificar si el usuario existe
    const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] });

    if (!user) {
      return res.status(404).json({ error: "El usuario no existe" });
    }

    //Paso 02: Comparar las contraseñas
    if (!user.comparePassword(password)) {
      return res.status(401).json({ error: "Contraseña no coincide" });
    }

    //Paso 03: Loggearlo
    const token = createToken(user._id);
    user.tokens = [token, ...user.tokens.filter(_token => verifyToken(_token)).splice(0, 4)];

    await user.save();

    //Paso 04: Registrar los tokens de usuario

    return res.status(200).json({ token: token });
  } catch (error) {
    debug(error);
    return res.status(500).json({ error: "Error inesperado" })
  }
}

/*
* WHO AM I
*/

controller.whoami = async (req, res) => {
  try {
    const { _id, username, email, roles, lastname, imc, icc, gender, birthday, weight, height,waistP,hipP, approach } = req.user;
    return res.status(200).json({ _id, username, email, roles, lastname, imc, icc, gender , birthday, weight, height,waistP,hipP, approach});
  } catch (error) {
    debug(error);
    return res.status(500).json({ error: "Error inesperado" })
  }
}

/*
* SET USER DATA
*/

controller.updateUserData = async (req, res) => {
    try {
        const { _id, weight, height, waistP, hipP} = req.body;

        // FIND USER BY ID

        const user = await User.findOne({ _id: _id });

        // IF USER DOESN'T EXIST

        if (!user) {
            return res.status(404).json({ error: "El usuario no existe" });
        }

        // IF USER EXISTS
        // UPDATE USER DATA

        user.weight = weight
        user.height = height
        user.waistP = waistP
        user.hipP = hipP

        // SAVE USER

        await user.save();
        
        return res.status(200).json({_id, weight, height, waistP, hipP,message: "Datos actualizados con éxito!"});

    } catch (error) {
        debug(error);
        return res.status(500).json({ error: "Error inesperado" })
    }
}


/*
*  SET IMC AND ICC
*/

controller.updateIccImc = async (req, res) => {
  try {
      const { _id, icc, imc} = req.body;

      // FIND USER BY ID

      const user = await User.findOne({ _id: _id });

      // IF USER DOESN'T EXIST

      if (!user) {
        return res.status(404).json({ error: "El usuario no existe" });
      }

      // IF USER EXISTS
      // UPDATE USER DATA

      user.icc = icc
      user.imc = imc

      // SAVE USER

      await user.save();

      return res.status(200).json({ message: "Datos actualizados con éxito!" });

  } catch (error) {
    debug(error);
    return res.status(500).json({ error: "Error inesperado" })
  }
}



module.exports = controller;