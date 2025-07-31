
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const extintorSchema = new mongoose.Schema({
  id_extintor: { type: String, required: true, },
  cliente: {type: String, required: true},
  ubicacion: { type: String, required: true },
  material: { type: String, required: true },
  sector: { type: String, required: true },
  tipo_extintor: { type: String, required: true },
  capacidad: { type: String, required: true },
  recarga_cada: { type: String, required: true},
  estado_extintor: { type: String, required: true },
  senalizacion: { type: String, required: true },
  soporte_nicho: { type: String, required: true },
  fecha_recarga: { type: String, required: true },
  fecha_vencimiento: { type: String, required: true },
  estado_vencimiento: { type: String },
  observaciones: { type: String },
});

module.exports = mongoose.model('Extintor', extintorSchema);