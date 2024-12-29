// product.controller.js
const Product = require("./product.model.js");  // Adjust path if necessary

// Function to get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length === 0) {
            return res.status(404).json({ success: false, message: "No products found" });
        }
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ success: false, message: "Failed to fetch products" });
    }
};

// Function to create a new product
const createproduct = async (req, res) => {
    const product = req.body;
    const newProduct = new Product(product);
    try {
        const savedProduct = await newProduct.save();
        res.status(201).json({ success: true, data: savedProduct });
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ success: false, message: "Failed to save product", error });
    }
};

// Function to update a product
const putproduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    try {
        const updatedData = await Product.findByIdAndUpdate(id, product, { new: true });
        if (!updatedData) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, data: updatedData });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ success: false, message: "Failed to update product", error });
    }
};

// Function to delete a product
const deleteproduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ success: false, message: "Failed to delete product", error });
    }
};

// Exporting the functions using module.exports
module.exports = { getProducts, createproduct, putproduct, deleteproduct };
