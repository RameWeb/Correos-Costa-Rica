(() => {
  'use strict';
  angular
  .module('correos-cr')
  .controller('controladorSucursales', controladorSucursales);

  controladorSucursales.$inject = ['$http', '$stateParams', '$state', 'servicioSucursales'];

  function controladorSucursales($http, $stateParams, $state, servicioSucursales){
    let vm = this;

    vm.nuevaSucursal = {};
    
    // vm.provincias = $http({
    //   method: 'GET',
    //   url: '../../sources/data/provincias.json'
    // }).then( (success) => {
    //   vm.provincias = success.data;
    // }, (error) => {
    //   console.log("Ocurrio un error " + error.data);
    // });
    
    // vm.rellenarCantones = (pidProvincia) => {
    //   vm.cantones = $http({
    //     method: 'GET',
    //     url: '../../sources/data/cantones.json'
    //   }).then((success) => {
    //     let cantones = [];
    //     for (let i = 0; i < success.data.length; i++) {
    //       if (pidProvincia == success.data[i].idProvincia) {
    //         cantones.push(success.data[i]);
    //       }
    //     }
    //     vm.cantones = cantones;
    //   }, (error) => {
    //     console.log("Ocurrió un error " + error.data)
    //   });
    // }

    // vm.rellenarDistrito = (pidCanton) => {
    //   console.log(pidCanton);
    //   vm.distritos = $http({
    //     method: 'GET',
    //     url: '../../sources/data/distritos.json'
    //   }).then((success) => {
    //     let distritos = [];
    //     for (let i = 0; i < success.data.length; i++) {
    //       if (pidCanton == success.data[i].idCanton) {
    //         distritos.push(success.data[i]);
    //       }
    //     }
    //     vm.distritos = distritos;
    //   }, (error) => {
    //     console.log("Ocurrió un error " + error.data)
    //   });
    // }

    listarSucursales();

    // Funcion que es llamada desde el html para regustra un nuevo usuario
    vm.registrarSucursal = (pnuevaSucursal) => {

      if (pnuevaSucursal.estadoSucursal == null){
        pnuevaSucursal.estadoSucursal = true;
      }
      
      let idRandom = (Math.random()*Math.random())*1000;

      console.log(idRandom);

      // Tomamos el objeto sin formato y lo comvertimos en un objeto de tipo cliente
      let objNuevaSucursal = new Sucursales(pnuevaSucursal.provincia, pnuevaSucursal.canton, pnuevaSucursal.distrito,  pnuevaSucursal.direccion, pnuevaSucursal.latLong, pnuevaSucursal.telefono, idRandom);
        
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