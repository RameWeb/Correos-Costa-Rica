const express = require('express'),
      router = express.Router(),
      productos = require('./productos.api');

/**
 * 
 */
router.param('id', (req, res, next, id) => {
  req.body.id = id;
  next();
});

/**
 * Función que se encarga de registrar los productos dentro del local storagefactorie
 */
router.route('/save_productos')
  .post((req, res) => {
    productos.registrar(req,res);
});

/**
 * Función que obtiene todos los productos
 */
router.route('/get_all_productos')
  .get((req, res) => {
    productos.listarTodos(req,res);
});

/**
 * Función que actualiza los productos
 */
router.route('/update_productos')
  .put((req, res) => {
    productos.actualizar(req,res);
});

/**
 * Función que elimina los productos
 */
router.route('/delete_productos')
  .put((req, res) => {
    productos.eliminar(req,res);
});

router.route('/login')
  .put((req,res) => {
    productos.iniciarSesion(req,res);
  });

module.exports = router;