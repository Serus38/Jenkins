const { Schema, model } = require('mongoose')

const EtapaSchema = Schema({
    nombre: { type: String, required: true },
    fechaCreacion: { type: Date, required: true },
    fechaActualizacion: { type: Date, required: true }
});

module.exports = model('Etapa', EtapaSchema);
