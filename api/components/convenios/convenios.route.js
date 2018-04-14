const express = require('express'),
      router = express.Router(),
      users = require('./convenios.api');

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
router.route('/save_ConvAd')
  .post((req, res) => {
    users.registrar(req,res);
});

/**
 * Función que obtiene todos los usuarios
 */
router.route('/get_all_ConvAd')
  .get((req, res) => {
    users.listarTodos(req,res);
});

/**
 * Función que actualiza los usuarios
 */
router.route('/update_ConvAd')
  .put((req, res) => {
    users.actualizar(req,res);
});

router.route('/login')
  .put((req,res) => {
    users.iniciarSesion(req,res);
  });

module.exports = router;