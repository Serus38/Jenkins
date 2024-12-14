const { Schema, model } = require('mongoose')

const TipoProyectoSchema = Schema({
    nombre: { type: String, required: true },
    fechaCreacion: { type: Date, required: true },
    fechaActualizacion: { type: Date, required: true }
});

module.exports = model('TipoProyecto', TipoProyectoSchema);
