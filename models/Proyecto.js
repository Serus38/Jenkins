const { Schema, model } = require('mongoose')

const ProyectoSchema = Schema({
    numero: { type: int, required: true},
    titulo: { type: String, required: true },
    fechaInicio: { type: String, required: true},
    fechaEntrega: { type: String, required: true},
    fechaCreacion: { type: Date, required: true },
    fechaActualizacion: { type: Date, required: true },
    cliente: { type: Schema.Types.ObjectId, ref: 'Cliente', required: true},
    tipoProyecto: { type: Schema.Types.ObjectId, ref: 'TipoProyecto', required: true},
    universidad: { type: Schema.Types.ObjectId, ref: 'Universidad', required: true},
    etapaProyecto: { type: Schema.Types.ObjectId, ref: 'EtapaProyecto', required: true}

});

module.exports = model('Proyecto', ProyectoSchema);
