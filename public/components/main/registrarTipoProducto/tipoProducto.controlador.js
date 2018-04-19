(() => {
  'use strict';
  angular
  .module('correos-cr')
  .controller('controladorProductos', controladorProductos);

  controladorProductos.$inject = ['$http', '$stateParams', '$state', 'servicioTipoProductos'];

  function controladorProductos($http, $stateParams, $state, servicioTipoProductos){
    let vm = this;

    vm.nuevoTipoProducto = {};

    vm.listaTipoProductos = listarTiposProductos();

    listarTiposProductos();

    //  registrar un nuevo tipo de producto desde el html
    vm.registrarTipoProducto = (pnuevoTipoProducto) => {
      console.log(pnuevoTipoProducto);

      let objNuevoTipoProducto = new tipoProducto(pnuevoTipoProducto.nombreTipoProducto, pnuevoTipoProducto.impuesto );

      console.log('Objeto con el tipo de producto');
      console.log(objNuevoTipoProducto);
      // Pasamos al servicio el nuevo obj de tipo de producto para ser almacenado en el localStorage
      servicioTipoProductos.addTipoProducto(objNuevoTipoProducto);

      // Retroalimentacion Visual para los usuarios
      swal("Registro exitoso", "el tipo de producto ha sido registrado correctamente", "success", {
        button: "Aceptar",
      });

      // Se limpia el formulario
      vm.nuevoTipoProducto = null;
      listarTiposProductos();
    }
    function listarTiposProductos(){
      vm.listaTipoProductos= servicioTipoProductos.getTipoProductos();
    }
    
    vm.modificar = (ptipoProducto) =>{
      console.log(ptipoProducto);
      $state.go('modificarTipoProducto', {nombreTipoProducto: JSON.stringify(ptipoProducto.nombreTipoProducto)})
    }
  }
})();
 