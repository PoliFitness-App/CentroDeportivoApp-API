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
            url,
            steps
        } = req.body;

        debug({title, description, approach, level, category, url, steps})

        const {_id: userId} = req.user;

        const rutine = new Rutine({
            title: title,
            description: description,
            approach: approach,
            level: level,
            category: category,
            url: url,
            user: userId,
            steps: steps
        });

        _rutine = await Rutine.findOne({title: title});

        if (_rutine) {
            return res.status(409).json({error: "Ya existe una rutina con ese titulo"});
        }

        const newRutine = await rutine.save();

        if (!newRutine) {
            return res.status(409).json({error: "Ocurrio un error al crear la rutina"});
        }

        return res.status(201).json(newRutine);
    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

/*
FIND ALL RUTINES
*/

controller.findAllRoutines = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Obtener el número de página de los parámetros de consulta
        const limit = parseInt(req.query.limit) || 10; // Establecer un límite de elementos por página (por defecto 10)

        const count = await Rutine.countDocuments(); // Obtener el número total de rutinas

        const routines = await Rutine.find()
            .skip((page - 1) * limit) // Saltar los documentos anteriores según la página y el límite
            .limit(limit); // Limitar el número de documentos por página

        const totalPages = Math.ceil(count / limit); // Calcular el número total de páginas

        return res.status(200).json({routines, totalPages, currentPage: page});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Error interno de servidor"});
    }
};

// AGREGAR FILTROS 

/*
FIND RUTINE BY CATEGORY  
*/

controller.findRoutineByCategory = async (req, res) => {
    try {
        const {category} = req.body;

        const routine = await Rutine.find({category: category, hidden: false});

        return res.status(200).json({routine});
    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

/*
FIND RUTINE BY ID  
*/

controller.findRutineOneById = async (req, res) => {
    try {
        const {identifier: postID} = req.params;

        const routine = await Rutine.findOne({_id: postID});

        if (!routine) {
            return res.status(404).json({error: "Rutina no encontrado"});
        }

        return res.status(200).json({routine})
    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

/*
  UPDATE RUTINE BY ID
*/

controller.toggleRoutineVisibility = async (req, res) => {
    try {
        const {identifier: postID} = req.params;

        //Paso 01: Obtenemos el post
        //Paso 02: Verificamos la pertenencia del post al usuario

        const routine = await Rutine.findOne({_id: postID});

        if (!routine) {
            return res.status(404).json({error: "Rutina no encontrada"});
        }
        //Paso 03: Modifico el valor

        routine.hidden = !routine.hidden;

        //Paso 04: Guardo los cambios

        await routine.save();

        return res.status(200).json({message: "Rutina eliminada correctamente"})
    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
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
        const routine = await Rutine.find({approach: approach, hidden: false});

        // Responder con la rutina encontrada
        res.status(200).json({routine});
    } catch (error) {
        // Manejo de errores
        res.status(500).json({error: 'Ha ocurrido un error al obtener la rutina.'});
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
        const routine = await Rutine.find({level: level, hidden: false});

        // Responder con la rutina encontrada
        res.status(200).json({routine});
    } catch (error) {
        // Manejo de errores
        res.status(500).json({error: 'Ha ocurrido un error al obtener la rutina.'});
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
        const routine = await Rutine.find({level: level, category: category, hidden: false});

        // Responder con la rutina encontrada
        res.status(200).json({routine});
    } catch (error) {
        // Manejo de errores
        res.status(500).json({error: 'Ha ocurrido un error al obtener la rutina.'});
    }
}


module.exports = controller;