const mongoose = require("mongoose");  // Using 'require' for CommonJS, 'import' is not supported in this case

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;  // Using 'module.exports' to export the model in CommonJS
