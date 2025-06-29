
const mongoose = require('mongoose');

const extintorSchema = new mongoose.Schema({
  id_extintor: { type: String, required: true },
  cliente: {type: String, required: true},
  ubicacion: { type: String, required: true },
  tipo_extintor: { type: String, required: true },
  clasificacion: { type: String, required: true },
  capacidad: { type: String, required: true },
  fecha_recarga: { type: Number, required: true },
  estado_extintor: { type: String, required: true },
  señalizacion: { type: String, required: true },
  soporte_nicho: { type: String, required: true },
  ultima_recarga: { type: Date, required: true },
  fecha_vencimiento: { type: Date, required: true },
  observaciones: { type: String },
});

module.exports = mongoose.model('Extintor', extintorSchema);