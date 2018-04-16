const express = require('express'),
      router = express.Router(),
      prealertas = require('./prealertas.api');

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
router.route('/save_prealerta')
  .post((req, res) => {
    prealertas.registrar(req,res);
});

/**
 * Función que obtiene todos los usuarios
 */
router.route('/get_all_prealertas')
  .get((req, res) => {
    prealertas.listarTodos(req,res);
});

/**
 * Función que actualiza los usuarios
 */
router.route('/update_prealertas')
  .put((req, res) => {
    prealertas.actualizar(req,res);
});

module.exports = router;