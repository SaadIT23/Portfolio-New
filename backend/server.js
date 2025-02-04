require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("🔥 MongoDB Connected!"))
    .catch((err) => console.error("MongoDB Connection Error:", err));

// Define Mongoose Schema & Model
const contactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    service: String,
    message: String,
    createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);

app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// POST Route to Handle Form Submission
app.post("/api/contact", async (req, res) => {
    try {
        const { firstName, lastName, email, phone, service, message } = req.body;

        // Validate required fields
        if (!firstName || !email || !message) {
            return res.status(400).json({ error: "Required fields are missing." });
        }

        // Save to MongoDB
        const newContact = new Contact({ firstName, lastName, email, phone, service, message });
        await newContact.save();

        console.log("✅ New Contact Saved:", newContact);
        res.status(201).json({ success: true, message: "Message saved successfully!" });
    } catch (error) {
        console.error("Error saving contact:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
