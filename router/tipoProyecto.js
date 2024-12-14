const { Router } = require('express');
const TipoProyecto = require('../models/TipoProyecto');
const { validationResult , check } = require ('express-validator');

const router = Router();

//GET
router.get('/', async function (req, res) {

    try {
        const tipoProyecto = await TipoProyecto. find();
        res.send(tipoProyecto);
    } catch (error){
        console.log(error);
        res.status(500).send('Ocurrio un error')
    }
});

//POST
router.post('/',[
    check('nombre', 'invalid.nombre').not().isEmpty(),
], async function(req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array()});
        }

        let tipoProyecto = new TipoProyecto();
        tipoProyecto.nombre = req.body.nombre;
        tipoProyecto.fechaCreacion = new Date;
        tipoProyecto.fechaActualizacion = new Date;

        tipoProyecto = await tipoProyecto.save();
        res.send(tipoProyecto);
    }catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear Tipo de proyecto ')
    }
    
});

//PUT
router.put('/:tipoProyectoId', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({ mensaje: errors.array()});
        }

        console.log(req.params.tipoProyectoId);
        let tipoProyecto = await TipoProyecto.findById(req.params.tipoProyectoId);

        if (!tipoProyecto){
            return res.status(400).send('El tipo de proyecto no existe');
        }

        tipoProyecto.nombre = req.body.nombre;
        tipoProyecto.fechaActualizacion = new Date;

        tipoProyecto = await tipoProyecto.save();
        res.send(tipoProyecto);
    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al actualizar el tipo de proyecto');
    }
    
});

// DELETE
router.delete('/:tipoProyectoId', async (req, res) => {
    try {
        const { tipoProyectoId } = req.params;
        const tipoProyecto = await TipoProyecto.findByIdAndDelete(tipoProyectoId);

        if (!tipoProyecto) {
            return res.status(404).json({ mensaje: 'Tipo de proyecto no encontrado' });
        }

        res.status(200).json({ mensaje: 'Tipo de proyecto eliminado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al eliminar tipo de proyecto');
    }
});

module.exports = router;