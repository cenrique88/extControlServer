

const express = require('express');
const router = express.Router();


const Inspecciones = require('../models/Inspecciones');


//MANEJO DEL GET DE LAS INSPECCIONES EN LA BASE DE DATOS INSPECCIONES
router.get('/', async (req, res) => {
    try {
        const inspeccion = await Inspecciones.find();
        res.json(inspeccion);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo Inspecciones', error: error.message });
    }
});


//MANEJO DEL GET DE UNA INSPECCIONES EN LA BASE DE DATOS INSPECCIONES
router.get('/:fecha_inspeccion', async (req, res) => {
    try {
        const { fecha_inspeccion } = req.params;
        const inspeccion = await Inspecciones.findOne({fecha_inspeccion});
        if (!inspeccion) {
            return res.status(404).json({ message: 'Inspeccion no Encontrada', error: error.message });
        }
        res.json(inspeccion);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo Inspeccion', error: error.message });
    }
});


//MANEJO DEL POST PARA LAS INSPECCIONES EN LA BASE DE DATOS INSPECCIONES 
router.post('/', async (req, res) => {
    try {
        const nuevaInspeccion = new Inspecciones(req.body);
        const saved = await nuevaInspeccion.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ message: 'Error guardando la Inspeccion', error: error.message });
    }
});


//MANEJO DE LA ELIMINACION DE UNA INSPECCIONES EN LA BASE DE DATOS INSPECCIONES 
router.delete('/:fecha_inspeccion', async (req, res) => {
    try {
        const { fecha_inspeccion } = req.params;
        const inspeccionEliminada = await Inspecciones.findOneAndDelete({fecha_inspeccion});
        if (!inspeccionEliminada) {
            return res.status(404).json({ message: 'Inspeccion no Encontrada', error: error.message });
        }
        res.json({ message: 'Inspeccion eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error eliminando Inspeccion', error: error.message });
    }
});








module.exports = router;










