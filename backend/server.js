const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db.js"); // Ensure this path is correct
const productRoutes = require("./routes/product.route.js"); // Ensure this path is correct
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsMiddleware = cors();
app.use(corsMiddleware);
app.use(express.json());
app.use(cors());  // Ensure you can handle cross-origin requests

// Connect to Database
connectDB();

// API Routes
app.use("/api/products", productRoutes);

// Serve Frontend in Production
if (process.env.NODE_ENV === "production") {
    const staticPath = path.join(__dirname, "../frontend/dist"); // Adjusted to reflect correct path
    app.use(express.static(staticPath));

    app.get("*", (req, res) => {
        const indexPath = path.resolve(__dirname, "../frontend", "dist", "index.html"); // Adjusted to reflect correct path
        res.sendFile(indexPath);
    });
}

// Start Server
const serverMessage = `Server started at http://localhost:${PORT}`;
app.listen(PORT, () => {
    console.log(serverMessage);
});

