(() => {
  'use strict';
  angular
  .module('correos-cr')
  .controller('controladorModProducto', controladorModProducto);

  controladorModProducto.$inject = ['$http', '$stateParams', '$state', 'servicioTipoProductos'];

  function controladorModProducto($http, $stateParams, $state, servicioTipoProductos){
    let vm = this;

    let tipoProductoSeleccionado;

    if($stateParams.nombreTipoProducto == ''){
      $state.go('ListaTipoProducto');
    }

    tipoProductoSeleccionado = servicioTipoProductos.obtenertipoProductoSeleccionado(JSON.parse($stateParams.nombreTipoProducto));

    vm.nuevoTipoProducto = tipoProductoSeleccionado;

    vm.modificarTipoProducto = (pNuevoTipoProducto) =>{

      let tipoProductoModificado = new tipoProducto(pNuevoTipoProducto.nombreTipoProducto, pNuevoTipoProducto.impuesto);

    console.log(tipoProductoModificado);

      // Pasamos al servicio el nuevo obj de tipo cliente para ser almacenado en el localStorage
      vm.tipoProductoSeleccionado = servicioTipoProductos.actualizarTipoProducto(tipoProductoModificado);

      // Retroalimentacion Visual para los usuarios: SweetAlert
      swal("Registro exitoso", "El tipo de producto se ha sido modificado correctamente", "success", {
        button: "Aceptar",
      });

      $state.go('ListaTipoProducto');

      listarTiposProductos();

      // Se limpia el formulario
      vm.nuevoTipoProducto = null;
    }

    // Imprimir lista de repartidores en el sistema
    function listarTiposProductos(){
      vm.listaTipoProductos= servicioTipoProductos.getTipoProductos();
    }
  }
})();

