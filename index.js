/*
 * import modules *
 */
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { readdirSync } = require("fs");

/*
 * mongodb schema import *
 */
const Name = require("./models/Name");

/*
 * dotenv configaration *
 */
dotenv.config();

/*
 * middleware setup *
 */
app.use(cors());
app.use(express.json());

/*
 * dynamic routes setup *
 */
readdirSync("./routes").map((f) => app.use("/", require("./routes/" + f)));

/*
 * mongodb connection *
 */
mongoose.connect(process.env.DATABASE, () => {
    console.log("Database connected.");
});

/*
 * Port listing *
 */
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listing on port ${port}`));

app.post("/name", async (req, res) => {
    let name = new Name(req.body);
    name.save().then(() => {
        res.send("name created");
    });
});
