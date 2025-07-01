
const express = require('express');
const router = express.Router();

const Extintor = require('../models/Extintor');


// MANEJO DEL GET DE LOS TODOS LOS EXTINTORES DE LA BASE DE DATOS:
router.get('/', async (req, res) => {
try {
    const extintores = await Extintor.find();
    res.json(extintores);
}   catch (error) {
    res.status(500).json({ message: 'Error obteniendo extintores', error: error.message });
}
});













