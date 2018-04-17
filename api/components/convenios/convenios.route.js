const express = require('express'),
      router = express.Router(),
      convenios = require('./convenios.api');

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
router.route('/save_convenios')
  .post((req, res) => {
    convenios.registrar(req,res);
});

/**
 * Función que obtiene todos los usuarios
 */
router.route('/get_all_convenios')
  .get((req, res) => {
    convenios.listarTodos(req,res);
});

/**
 * Función que actualiza los usuarios
 */
router.route('/update_convenios')
  .put((req, res) => {
    convenios.actualizar(req,res);
});

router.route('/login')
  .put((req,res) => {
    convenios.iniciarSesion(req,res);
  });

module.exports = router;