(() => {
  'use strict';
  angular
  .module('correos-cr')
  .controller('controladorSucursales', controladorSucursales);
  
  controladorSucursales.$inject = ['$stateParams', '$state', 'servicioSucursales','Upload','NgMap'];

  function controladorSucursales( $stateParams, $state, servicioSucursales,Upload,NgMap){
    let vm = this;
    
    NgMap.getMap("map").then(function (map) {
      vm.map = map;
    });

    vm.callbackFunc = function (param) {
      vm.latitude = vm.map.getCenter().lat();
      vm.longitude = vm.map.getCenter().lng();
    };
    
    vm.nuevaSucursal = {};
    listarSucursales();
    
    // Funcion que es llamada desde el html para regustra un nuevo usuario
      vm.registrarSucursal = (pnuevaSucursal) => {
      pnuevaSucursal.latitude = vm.latitude;
      pnuevaSucursal.longitude = vm.longitude;
      // Tomamos el objeto sin formato y lo comvertimos en un objeto de tipo cliente
      let objNuevaSucursal = new Sucursales(pnuevaSucursal.idSucursal, pnuevaSucursal.nombreSucursal, pnuevaSucursal.latitude, pnuevaSucursal.longitude, pnuevaSucursal.direccion, pnuevaSucursal.telefono, );
        
      console.log(objNuevaSucursal);

      // Pasamos al servicio el nuevo obj de tipo cliente para ser almacenado en el localStorage
      servicioSucursales.agregarSucursal(objNuevaSucursal);

      // Retroalimentacion Visual para los usuarios: SweetAlert
      swal("Registro exitoso", "La nueva sucursal se ha sido registrado correctamente", "success", {
        button: "Aceptar",
      });
      
      listarSucursales();
      // Se limpia el formulario
      vm.nuevaSucursal = null;
    }

    function listarSucursales(){
      vm.listaSucursales = servicioSucursales.obtenerSucursal();
    }

    vm.modificar = (psucursal) =>{

      $state.go('modificarSucursal', {idSucursal: JSON.stringify(psucursal.idSucursal)})
    }
  }
})();