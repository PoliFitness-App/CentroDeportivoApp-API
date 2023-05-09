const Post = require("../models/Post.model");
const debug = require("debug")("app:post-controller");

const controller = {};

// CREATE POST 

controller.createPost = async (req, res) => {
  try {
    const { title, description, image, category } = req.body;
    
    const post = new Post({
      title: title,
      description: description,
      image: image,
      category : category
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

// FIND ALL POST's

controller.findAllPosts = async (req, res) => {
  try {
    const posts =
      await Post
        .find({ hidden: false })

    return res.status(200).json({ posts });
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Error interno de servidor" });
  }
}

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

// FIND POST BY ID

controller.findOneById = async (req, res) => {
  try {
    const { identifier } = req.body;

    const post = await Post.findById(identifier)

    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    return res.status(200).json(post);
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Error interno de servidor" });
  }
}

// TOGGLE POST VISIBILITY

controller.togglePostVisibility = async (req, res) => {
  try {
    const { identifier: postId } = req.params;
    const { _id: userId } = req.user;

    //Paso 01: Obtenemos el post
    //Paso 02: Verificamos la pertenencia del post al usuario
    const post = await Post.findOne({ _id: postId});

    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    //Paso 03: Modifico el valor
    post.hidden = !post.hidden;

    //Paso 04: Guardo los cambios
    await post.save();

    return res.status(200).json({ message: "Noticia actualizada" })
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Error interno de servidor" });
  }
}

// DELETE POST BY ID 

controller.deletePostById = async (req, res) => {
    try {
      const { identifier } = req.body;
  
      const post = await Post
        .deleteOne({_id: identifier})
  
      if (!post) {
        return res.status(404).json({ error: "Noticia no encontrada" });
      }
  
      return res.status(200).json({ Done: "Noticia eleminada correctamente!" });
    } catch (error) {
      debug({ error });
      return res.status(500).json({ error: "Error interno de servidor" });
    }
  }


module.exports = controller;