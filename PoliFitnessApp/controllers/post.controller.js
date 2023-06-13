const Post = require("../models/Post.model");
const debug = require("debug")("app:post-controller");

const controller = {};

/*
* CREATE POST
*/

controller.createPost = async (req, res) => {
  try {
    const { title, description, image, category } = req.body;
    const { _id: userId } = req.user;

    const post = new Post({
      title: title,
      description: description,
      image: image,
      category: category,
      user: userId
    });

    _post = await Post.findOne({ title: title, hidden: false });

    if (_post) {
      return res.status(409).json({ error: "Ya existe una noticia con ese titulo" });
    }

    const newPost = await post.save();

    if (!newPost) {
      return res.status(409).json({ error: "Ocurrio un error al crear la notica" });
    }

    return res.status(201).json(newPost);
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Error interno de servidor" });
  }
}

/*
* FIND ALL POST
*/

controller.findAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Obtener el número de página de los parámetros de consulta
    const limit = parseInt(req.query.limit) || 10; // Establecer un límite de elementos por página (por defecto 10)

    const count = await Post.countDocuments({ hidden: false }); // Obtener el número total de publicaciones no ocultas

    const posts = await Post.find({ hidden: false })
        .skip((page - 1) * limit) // Saltar los documentos anteriores según la página y el límite
        .limit(limit); // Limitar el número de documentos por página

    const totalPages = Math.ceil(count / limit); // Calcular el número total de páginas

    return res.status(200).json({ posts, totalPages, currentPage: page });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno de servidor" });
  }
};


// FIND POST BY CATEGORY

controller.findPostsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const posts = await Post.find({ _category: category, hidden: false });

    return res.status(200).json({ posts });
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Error interno de servidor" });
  }
}

/*
* FIND POST BY ID
*/

controller.findOneById = async (req, res) => {
  try {
    const { identifier: postID } = req.params;

    const post = await Post.findOne({ _id: postID });

    if (!post) {
      return res.status(404).json({ error: "Noticia no encontrado" });
    }

    return res.status(200).json({post});
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Error interno de servidor" });
  }
}

/*
* DELETE POST BY ID
*/

controller.togglePostVisibility = async (req, res) => {
  try {
    const { identifier: postID } = req.params;

    //Paso 01: Obtenemos el post
    //Paso 02: Verificamos la pertenencia del post al usuario

    const post = await Post.findOne({ _id: postID });

    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    //Paso 03: Modifico el valor

    post.hidden = !post.hidden;

    //Paso 04: Guardo los cambios

    await post.save();

    return res.status(200).json({ message: "Noticia eliminada correctamente" })
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Error interno de servidor" });
  }
}


module.exports = controller;