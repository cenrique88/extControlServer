
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const extintorSchema = new mongoose.Schema({
  id_extintor: { type: String, required: true, unique: true },
  cliente: {type: String, required: true},
  ubicacion: { type: String, required: true },
  tipo_extintor: { type: String, required: true },
  clasificacion: { type: String, required: true },
  capacidad: { type: String, required: true },
  recarga_cada: { type: Number, required: true},
  estado_extintor: { type: String, required: true },
  senalizacion: { type: String, required: true },
  soporte_nicho: { type: String, required: true },
  fecha_recarga: { type: Date, required: true },
  inspecciones_realizadas: {type: Schema.Types.Mixed, default: {}},
  observaciones: { type: String },
});

module.exports = mongoose.model('Extintor', extintorSchema);