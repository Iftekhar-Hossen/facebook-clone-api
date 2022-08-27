const mongoose = require("mongoose");

const nameSchema = new mongoose.Schema({
    name: {
        type: String,
    },
});

const name = mongoose.model("Name", nameSchema);
module.exports = name;
