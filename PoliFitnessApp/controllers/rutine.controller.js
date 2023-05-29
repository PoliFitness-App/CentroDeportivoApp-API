
// IMPORTAR EL MODELO DE RUTINAS

const Rutine = require("../models/Rutine.model");

const debug = require("debug")("app:rutine-controller");

const controller = {};

// CREATE RUTINES 

controller.createRutine = async (req, res) => {

  try {
    const {
      title,
      description,
      approach,
      level,
      category,
      url
    } = req.body;

    const rutine = new Rutine({
      title: title,
      description: description,
      approach: approach,
      level: level,
      category: category,
      url: url
    });

    _rutine = await Rutine.findOne({ title: title });

    if (_rutine) {
      return res.status(409).json({ error: "Ya existe una rutina con ese titulo" });
    }

    const newRutine = await rutine.save();

    if (!newRutine) {
      return res.status(409).json({ error: "Ocurrio un error al crear la rutina" });
    }

    return res.status(201).json(newRutine);
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Error interno de servidor" });
  }
}

/*
FIND ALL RUTINES
*/

controller.findAllRutines = async (req, res) => {
  try {
    const rutines =
      await Rutine
        .find()

    return res.status(200).json({ rutines });
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Error interno de servidor" });
  }
}

// AGREGAR FILTROS 

/*
FIND RUTINE BY CATEGORY  
*/

controller.findRoutineByCategory = async (req, res) => {
  try {
    const { category } = req.body;

    const routine = await Rutine.find({ category: category });

    return res.status(200).json({ routine });
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Error interno de servidor" });
  }
}

/*
FIND RUTINE BY ID  
*/

controller.findRutineOneById = async (req, res) => {
  try {
    const { id } = req.body;

    const rutine = await Rutine
      .findOne({ _id: id })

    if (!rutine) {
      return res.status(404).json({ error: "Rutina no encontrada" });
    }

    return res.status(200).json(rutine);
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Error interno de servidor" });
  }
}

/*
DELETE RUTINE BY ID 
*/

controller.deleteRutineById = async (req, res) => {
  try {
    const { id } = req.body;

    const rutine = await Rutine
      .deleteOne({ _id: id })

    if (!rutine) {
      return res.status(404).json({ error: "Rutina no encontrada" });
    }

    return res.status(200).json({ Done: "Rutina eleminada correctamente!" });
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Error interno de servidor" });
  }
}

/*
GET RUTINE BY APPROACH
*/

controller.getRoutineByApproach = async (req, res) => {
  try {
    // Obtener los parámetros de búsqueda desde la consulta de la URL
    const {
      approach
    } = req.body;

    // Buscar la rutina en base al approach(enfoque)
    const routine = await Rutine.find({ approach: approach });

    // Responder con la rutina encontrada
    res.status(200).json({routine});
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ error: 'Ha ocurrido un error al obtener la rutina.' });
  }
}

/*
GET ROUTINE BY LEVEL
*/

controller.getRoutineByLevel = async (req, res) => {
  try {
    // Obtener los parámetros de búsqueda desde la consulta de la URL
    const {
      level
    } = req.body;

    // Buscar la rutina en base al nivel
    const routine = await Rutine.find({ level: level });

    // Responder con la rutina encontrada
    res.status(200).json({routine});
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ error: 'Ha ocurrido un error al obtener la rutina.' });
  }
}

/*
GET RUTINE BY CHANGE
*/

controller.getRoutineByLevelAndCategory = async (req, res) => {
  try {
    // Obtener los parámetros de búsqueda desde la consulta de la URL
    const {
      level,
      category
    } = req.body;

    // Buscar la rutina en base al nivel y categoria
    const routine = await Rutine.find({ level: level, category: category });

    // Responder con la rutina encontrada
    res.status(200).json({routine});
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ error: 'Ha ocurrido un error al obtener la rutina.' });
  }
}


module.exports = controller;