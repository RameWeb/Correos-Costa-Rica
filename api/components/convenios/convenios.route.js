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
 * Función que se encarga de registrar los convenios dentro del local storage
 */
router.route('/save_convenios')
  .post((req, res) => {
    convenios.registrar(req,res);
});

/**
 * Función que obtiene todos los convenios
 */
router.route('/get_all_convenios')
  .get((req, res) => {
    convenios.listarTodos(req,res);
});

/**
 * Función que actualiza los convenios
 */
router.route('/update_convenios')
  .put((req, res) => {
    convenios.actualizar(req,res);
});

/**
 * Función que elimina los convenios
 */
router.route('/delete_convenios')
  .put((req, res) => {
    convenios.eliminar(req,res);
});

router.route('/login')
  .put((req,res) => {
    convenios.iniciarSesion(req,res);
  });

module.exports = router;