// Require Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan')


const Project = require('./models/project');

// get .env variables
require('dotenv').config()
const { PORT = 3001, DATABASE_URL } = process.env;

// Initialize the App
const app = express()

// Connect and Configure MongoDB
mongoose.connect(process.env.DATABASE_URL)

mongoose.connection
    .on('open', () => console.log('Connected to MongoDB'))
    .on('close', () => console.log('Disconnected from MongoDB'))
    .on('error', () => console.log('An error occurred: ', error))

// Mount Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/projects', async (req, res) => {
    try {
        res.json(await Project.find({}))
    } catch (error) {
        res.status(400).json(error)
    }
})

app.post('/projects', async (req, res) => {
    try {
        res.json(await Project.create(req.body))
    } catch (error) {
        res.status(400).json(error)
    }
})

app.delete('/projects/:id', async (req, res) => {
    try {
        res.json(await Project.findByIdAndDelete(req.params.id))
    } catch (error) {
        res.status(400).json(error)
    }
})

app.put('/projects/:id', async (req, res) => {
    try {
        res.json(await Project.findByIdAndUpdate(req.params.id, req.body, { new: true }))
    } catch (error) {
        res.status(400).json(error)
    }
})

// Tell the app to listen
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))