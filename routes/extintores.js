
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


//MANEJO DEL GET DE UN EXTINTOR DE LA BASE DE DATOS EXTINTORES:
router.get('/', async (req, res) => {
    const { key, value } = req.query;
    console.log(key, value);
    switch(key){
        case '_id':
            try {
                const extintor = await Extintor.findOne({[key]:value});
                if (!extintor) {
                return res.status(404).json({ message: 'Extintor no encontrado', error: error.message });
                }
                res.json(extintor);
            } catch (error) {
                res.status(500).json({ message: 'Error obteniendo extintores', error: error.message });
            };
            break;
        
    }
});


//MANEJO DEL POST PARA NUEVO ESTINTOR DE LA BASE DE DATOS EXTINTORES:
router.post('/add', async (req, res) => {
    try {
        const nuevoExtintor = new Extintor(req.body);
        const guardado = await nuevoExtintor.save();
        res.status(201).json(guardado);
    } catch (error) {
        res.status(500).json({ message: 'Error guardando extintor', error });
    }
});


// MANEJO DE LA EDICION DE UN EXTINTOR EN LA BASE DE DATOS EXTINTORES:
router.put('/edit/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        const extintorActualizado = await Extintor.findOneAndUpdate({_id}, req.body, { new: true });
        if (!extintorActualizado) {
            return res.status(404).json({ message: 'Extintor no encontrado', error: error.message });
        }
        res.json(extintorActualizado);
    } catch (error) {
        res.status(500).json({ message: 'Error actualizando extintor', error: error.message });
    }
});


// MANEJO DE LA ELIMINACION DE UN EXTINTOR DE LA BASE DE DATOS EXTINTORES:
router.delete('/:_id', async (req, res) => {
    try {
        const { id_extintor } = req.params;
        const extintorEliminado = await Extintor.findOneAndDelete({_id});
        if (!extintorEliminado) {
            return res.status(404).json({ message: 'Extintor no encontrado', error: error.message });
        }
        res.json({ message: 'Extintor eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error eliminando extintor', error: error.message });
    }
});






module.exports = router;










