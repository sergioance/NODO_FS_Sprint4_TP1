import express from 'express';
import {
    obtenerSuperheroePorIdController,
    obtenerTodosLosSuperheroesController,
    buscarSuperheroesPorAtributoController,
    obtenerSuperheroesMayoresDe30Controller,
    crearSuperheroeController,
    borrarSuperheroePorNombreController,
    borrarSuperheroeController,
    actualizarSuperheroeController,
    agregarSuperheroeController,
    vistaDasboardSuperheroesController,
    editarSuperheroeController
} from '../controllers/superheroesController.mjs';
import { validarNuevoSuperheroe, validarEdicionSuperheroe } from '../middlewares/validationSuperheroe.mjs';
import { handleValidationErrors } from '../middlewares/errorMiddleware.mjs';

import { obtenerSuperheroePorId } from '../services/superheroesService.mjs';

const router = express.Router();
router.get('/heroes', obtenerTodosLosSuperheroesController);
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
router.get('/heroes/id/:id', obtenerSuperheroePorIdController);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);
router.post('/heroes', crearSuperheroeController);
router.put('/heroes/:id', actualizarSuperheroeController);
router.delete('/heroes/:id', borrarSuperheroeController);
router.delete('/heroes/nombre/:nombre', borrarSuperheroePorNombreController);
router.get('/heroes/vista', vistaDasboardSuperheroesController);
router.get('/heroes/formulario', (req, res) => {
  res.render('addSuperhero', { errores: [] });
});
router.post('/heroes/agregar', validarNuevoSuperheroe(), handleValidationErrors, agregarSuperheroeController);
router.put('/heroes/:id', validarEdicionSuperheroe(), handleValidationErrors, actualizarSuperheroeController);
router.put('/heroes/:id/formularioEdit', validarEdicionSuperheroe(), handleValidationErrors, editarSuperheroeController)
router.post('/heroes/:id', borrarSuperheroeController)

//router.get('/heroes/:id/formularioEditar', editarSuperheroeController);

router.get('/heroes/:id/formularioEdit', async (req, res) => {
  try {
    const heroe = await obtenerSuperheroePorId(req.params.id);
    if (!heroe) {
      return res.status(404).send('Superhéroe no encontrado');
    }
    res.render('formularioEdit', { superhero: heroe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error al cargar formulario de edición", error: err.message });
  }
});

router.post('/heroes/:id/formularioEdit', editarSuperheroeController)

export default router;

