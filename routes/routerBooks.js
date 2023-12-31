const express = require("express");
const book = require("../models/modelsBooks");

const router = express.Router();
const Joi = require("joi");

const bookSchema = Joi.object({
  title: Joi.string().required().label("Title"),
  author: Joi.string().required().label("Author"),
});

//Obtener todos los libros
router.get("/", async (req, res, next) => {
  try {
    const books = await book.find();
    res.json(books);
  } catch (err) {
    next(err);
  }
});

//Obtener libro por ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const books = await book.findById(id);
    if (!books){
      throw error;
    }

    res.json(books);
  } catch (err) {
    res.status(404).json({
      error: {
        message: `El libro con el id ${req.params.id} no existe`,
        code: 404,
      },
    });
  }
});

//cargar libro
router.post("/", async (req, res, next) => {
  try {
    const { value, error } = bookSchema.validate(req.body);
    if (error) {
      const err = new Error("Error de validación de datos");
      err.status = 400;
      throw err;
    }
    const newBook = new book(req.body);
    await newBook.save();
    res.json(newBook);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const books = await book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(books);
  } catch (err) {
    res.status(500).json({
      error: {
        message: `Error al actualizar el libro`,
        code: 500,
      },
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const books = await book.findByIdAndDelete(req.params.id);
    res.json({ message: "Libro eliminado correctamente" });
  } catch (err) {
    res.status(500).json({
      error: {
        message: `Error al eliminar el libro`,
        code: 500,
      },
    });
  }
});

module.exports = router;
