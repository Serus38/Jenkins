const { Router } = require('express');
const Universidad = require('../models/Universidad');
const { validationResult , check } = require ('express-validator');

const router = Router();

//GET
router.get('/', async function (req, res) {

    try {
        const universidad = await Universidad. find();
        res.send(universidad);
    } catch (error){
        console.log(error);
        res.status(500).send('Ocurrio un error')
    }
});

//POST
router.post('/',[
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('direccion', 'invalid.direccion').not().isEmpty(),
    check('telefono', 'invalid.telefono').not().isEmpty(),

], async function(req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array()});
        }

        let universidad = new Universidad();
        universidad.nombre = req.body.nombre;
        universidad.direccion = req.body.direccion;
        universidad.telefono = req.body.telefono;
        universidad.fechaCreacion = new Date;
        universidad.fechaActualizacion = new Date;

        universidad = await universidad.save();
        res.send(universidad);
    }catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear Universidad ')
    }
    
});

//PUT
router.put('/:universidadId', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('direccion', 'invalid.direccion').not().isEmpty(),
    check('telefono', 'invalid.telefono').not().isEmpty(),
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({ mensaje: errors.array()});
        }

        console.log(req.params.universidadId);
        let universidad = await Universidad.findById(req.params.universidadId);

        if (!universidad){
            return res.status(400).send('Universidad no existe');
        }

        universidad.nombre = req.body.nombre;
        universidad.direccion = req.body.direccion;
        universidad.telefono = req.body.telefono;
        universidad.fechaActualizacion = new Date;

        universidad = await universidad.save();
        res.send(universidad);

        res.status(200).json({ mensaje: 'Universidad actualizado' });
    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al actualizar universidad');
    }
    
});

// DELETE
router.delete('/:universidadId', async (req, res) => {
    try {
        const { universidadId } = req.params;
        const universidad = await Universidad.findByIdAndDelete(universidadId);

        if (!universidad) {
            return res.status(404).json({ mensaje: 'Universidad no encontrado' });
        }

        res.status(200).json({ mensaje: 'Universidad eliminado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al eliminar universidad');
    }
});

module.exports = router;