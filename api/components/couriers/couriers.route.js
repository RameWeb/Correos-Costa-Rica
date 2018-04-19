const express = require('express'),
      router = express.Router(),
      couriers = require('./couriers.api');

/**
 * 
 */
router.param('idCourier', (req, res, next, idCourier) => {
  req.body.idCourier = idCourier;
  next();
});

/**
 * Función que se encarga de registrar los couriers dentro del local storage
 */
router.route('/save_courier')
  .post((req, res) => {
    couriers.registrar(req,res);
});

/**
 * Función que obtiene todos los usuarios
 */
router.route('/get_all_couriers')
  .get((req, res) => {
    couriers.listarTodos(req,res);
});

/**
 * Función que actualiza los usuarios
 */
router.route('/update_couriers')
  .put((req, res) => {
    couriers.actualizar(req,res);
});

module.exports = router;