const mongoose = require('mongoose')

const Schema = mongoose.Schema;

// Define Schema
const projectSchema = new Schema({
    name: String,
    description: String,
    link: String,
    thumbnail: String
}, { timestamps: true });

const project = mongoose.model("Project", projectSchema);

module.exports = project