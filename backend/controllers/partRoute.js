const express = require("express");
const partRoute = express.Router();
const { partModel } = require("../Models/particepentdetail");

// GET route to fetch all participants
partRoute.get("/", async (req, res) => {
    try {
        const participants = await partModel.find();
        res.status(200).json(participants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET route to fetch a specific participant by register number
partRoute.get("/:registernumber", async (req, res) => {
    try {
        const participant = await partModel.findOne({ 
            registernumber: req.params.registernumber 
        });
        
        if (!participant) {
            return res.status(404).json({ error: "Participant not found" });
        }
        
        res.status(200).json(participant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT route to update present status by register number
partRoute.put("/update/:registernumber", async (req, res) => {
    try {
        const { registernumber } = req.params;
        const { present } = req.body;

        // Validate if present status is provided
        if (present === undefined) {
            return res.status(400).json({ error: "Present status is required" });
        }

        // Find and update the participant
        const updatedParticipant = await partModel.findOneAndUpdate(
            { registernumber },
            { present },
            { new: true } // This option returns the updated document
        );

        if (!updatedParticipant) {
            return res.status(404).json({ error: "Participant not found" });
        }

        res.status(200).json(updatedParticipant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST route to create new participant
partRoute.post("/create", async (req, res) => {
    try {
        const { name, registernumber } = req.body;
        
        // Validate required fields
        if (!name || !registernumber) {
            return res.status(400).json({ error: "Name and register number are required" });
        }

        // Create new participant
        const newParticipant = new partModel({
            name,
            registernumber
        });

        // Save to database
        const savedParticipant = await newParticipant.save();
        res.status(201).json(savedParticipant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = { partRoute };