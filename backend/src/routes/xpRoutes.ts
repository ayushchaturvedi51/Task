import express from "express";

const app = express.Router();

// Middleware for the distributor

app.post("/awards", async (req, res) => {
  const data = req.body.data;
    const {userId , xpPoints  } = data;
    
});
