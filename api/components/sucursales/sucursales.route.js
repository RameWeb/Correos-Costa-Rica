const express = require('express'),
      router = express.Router(),
      sucursales = require('./convenios.api');

/**
 * 
 */
router.param('id', (req, res, next, id) => {
  req.body.id = id;
  next();
});

/**
 * Función que se encarga de registrar los usuarios dentro del local storage
 */
router.route('/save_sucursales')
  .post((req, res) => {
    sucursales.registrar(req,res);
});

/**
 * Función que obtiene todos los usuarios
 */
router.route('/get_all_sucursales')
  .get((req, res) => {
    sucursales.listarTodos(req,res);
});

/**
 * Función que actualiza los usuarios
 */
router.route('/update_sucursales')
  .put((req, res) => {
    sucursales.actualizar(req,res);
});

router.route('/login')
  .put((req,res) => {
    sucursales.iniciarSesion(req,res);
  });

module.exports = router;