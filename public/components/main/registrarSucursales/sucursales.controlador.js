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

   vm.onDragEnd = ($event) =>{
      let position =[$event.latLng.lat(), $event.latLng.lng()];
     
      vm.coords=position;
    };
    
    vm.nuevaSucursal = {};
    vm.listaSucursales =listarSucursales();
    listarSucursales();
    
    // Funcion que es llamada desde el html para regustra un nuevo usuario
      vm.registrarSucursal = (pnuevaSucursal) => {
      pnuevaSucursal.position = vm.coords;
      
      
      // Tomamos el objeto sin formato y lo comvertimos en un objeto de tipo cliente
      let objNuevaSucursal = new Sucursales(pnuevaSucursal.idSucursal, pnuevaSucursal.nombreSucursal, pnuevaSucursal.position, pnuevaSucursal.direccion, pnuevaSucursal.telefono, );
        
      console.log(objNuevaSucursal);

      // Pasamos al servicio el nuevo obj de tipo cliente para ser almacenado en el localStorage
      servicioSucursales.setSucursal(objNuevaSucursal);

      // Retroalimentacion Visual para los usuarios: SweetAlert
      swal("Registro exitoso", "La nueva sucursal se ha sido registrado correctamente", "success", {
        button: "Aceptar",
      });
      
      listarSucursales();
      // Se limpia el formulario
      vm.nuevaSucursal = null;
    }
    function listarSucursales(){
      vm.listaSucursales = servicioSucursales.getSucursal();
    }

    vm.modificar = (psucursal) =>{

      $state.go('modificarSucursal', {idSucursal: JSON.stringify(psucursal.idSucursal)})
    }
  }
})();