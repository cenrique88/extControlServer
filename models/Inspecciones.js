
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inspeccionesSchema = new mongoose.Schema({
    fecha_inspeccion: { type: Date, required: true },
    id_extintor: { type: String, required: true },
    cliente: {type: String, required: true},
    creada_por: { type: String, required: true},
    editada_por: {type: Schema.Types.Mixed, default: {}, required: true},
    cerrada_por: { type: String, default: null},
    fecha_cierre: { type: Date, default: null},
    estado: { type: String, required: true},
    estado_anterior: {type: Schema.Types.Mixed, default: {}, required: true},
    verificacion: {type: String, required: true},
    observaciones: {type: String, default: ''},

});

module.exports = mongoose.model('Inspecciones', inspeccionesSchema);