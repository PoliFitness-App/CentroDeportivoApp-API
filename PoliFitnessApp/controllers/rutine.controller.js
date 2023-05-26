
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
            image,
            ageRange,
            routineType,
            bmiRange,
            waistToHipRatioRange,
            difficulty,
            calories,
            routineTime,
            steps
        } = req.body;

        const rutine = new Rutine({
            title: title,
            description: description,
            image: image,
            ageRange: ageRange,
            routineType: routineType,
            bmiRange: bmiRange,
            waistToHipRatioRange: waistToHipRatioRange,
            difficulty: difficulty,
            calories: calories,
            routineTime: routineTime,
            steps: steps
        });

        _rutine = await Rutine.findOne({ title: title});

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

// FIND ALL RUTINES

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


// FIND RUTINE BY CATEGORY   - TO  DO "AUN FALTA"

controller.findPostsByCategory = async (req, res) => {                                                      
    try {
        const { identifier } = req.params;

        const posts = await Post.find({ category: identifier, hidden: false });

        return res.status(200).json({ posts });
    } catch (error) {
        debug({ error });
        return res.status(500).json({ error: "Error interno de servidor" });
    }
}

// FIND RUTINE BY ID  

controller.findRutineOneById = async (req, res) => {
    try {
        const { identifier } = req.params;

        const rutine = await Rutine
            .findOne({ _id: identifier, hidden: false })

        if (!post) {
            return res.status(404).json({ error: "Rutina no encontrada" });
        }

        return res.status(200).json(rutine);
    } catch (error) {
        debug({ error });
        return res.status(500).json({ error: "Error interno de servidor" });
    }
}

// DELETE RUTINE BY ID 

controller.deleteRutineById = async (req, res) => {
    try {
        const { identifier } = req.params;

        const rutine = await Rutine
            .deleteOne({ _id: identifier })

        if (!rutine) {
            return res.status(404).json({ error: "Rutina no encontrada" });
        }

        return res.status(200).json({ Done: "Rutina eleminada correctamente!" });
    } catch (error) {
        debug({ error });
        return res.status(500).json({ error: "Error interno de servidor" });
    }
}

// GET RUTINE BY TAGS - TO DO "AUN FALTA"

controller.getRoutineByTags = async (req, res) => {
    try {
      // Obtener los parámetros de búsqueda desde la consulta de la URL
      const {
        ageMin,
        ageMax,
        routineType,
        bmiMin,
        bmiMax,
        iccMin,
        iccMax,
        difficulty,
        calories,
        routineTime,
      } = req.query;
  
      // Construir el filtro de búsqueda
      const filter = {
        ageRange: { $gte: ageMin, $lte: ageMax },
        routineType,
        bmiRange: { $gte: bmiMin, $lte: bmiMax },
        waistToHipRatioRange: { $gte: iccMin, $lte: iccMax },
        difficulty,
        calories,
        routineTime,
      };
  
      // Buscar la rutina que cumpla con los criterios especificados
      const routine = await Routine.findOne(filter);
  
      // Responder con la rutina encontrada
      res.status(200).json(routine);
    } catch (error) {
      // Manejo de errores
      res.status(500).json({ error: 'Ha ocurrido un error al obtener la rutina.' });
    }
  }

//GET RUTINE BY APPROACH


//GET ROUTINE BY LEVEL


//GET RUTINE BY -CHANGE-


module.exports = controller;