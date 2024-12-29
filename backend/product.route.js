const express = require("express");
const { createproduct, deleteproduct, getProducts, putproduct } = require("../controllers/product.controller.js");  // Ensure correct path

const router = express.Router();  // Initialize the router

// Define routes using const
router.get('/', getProducts);
router.post('/', createproduct);
router.put('/:id', putproduct);
router.delete('/:id', deleteproduct);

module.exports = router;  // Export router to use in server.js
