(() => {
  'use strict';
  angular
  .module('correos-cr')
  .controller('controladorModificarSucursal', controladorModificarSucursal);

  controladorModificarSucursal.$inject = ['$http', '$stateParams', '$state', 'servicioSucursales'];

  function controladorModificarSucursal($http, $stateParams, $state, servicioSucursales){
    let vm = this;    
    let sucursalSeleccionada;

    if($stateParams.idSucursal == ''){
      $state.go('listarSucursal');
    }else{
      sucursalSeleccionada = servicioSucursales.obtenerSucursalSeleccionada($stateParams.idSucursal);
    }

    // console.log(sucursalSeleccionada);
    
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
    //   // console.log(pidCanton);
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

    vm.nuevaSucursal = {
      provincia: sucursalSeleccionada.provincia,
      canton: sucursalSeleccionada.canton,
      distrito: sucursalSeleccionada.distrito,
      direccion: sucursalSeleccionada.direccion,
      telefono: sucursalSeleccionada.telefono
    };

    // listarSucursales();
    
    // Funcion que es llamada desde el html para regustra un nuevo usuario
    vm.modificarSucursal = (pnuevaSucursal) => {

      let idSucursal = sucursalSeleccionada.idSucursal;

      let objSucursalModificada = new Sucursales(vm.nuevaSucursal.provincia, vm.nuevaSucursal.canton, vm.nuevaSucursal.distrito,  vm.nuevaSucursal.direccion, vm.nuevaSucursal.telefono, idSucursal);
        
      console.log(objSucursalModificada);

      // Pasamos al servicio el nuevo obj de tipo cliente para ser almacenado en el localStorage
      vm.sucursalSeleccionada = servicioSucursales.actualizarSucursal(objSucursalModificada);

      swal("Registro exitoso", "La sucursal se ha sido modificada correctamente", "success", {
        button: "Aceptar",
      });

      $state.go('listarSucursal');

      listarSucursales();
      // Se limpia el formulario
      vm.nuevaSucursal = null;
    }

    function listarSucursales(){
      vm.listaSucursales = servicioSucursales.obtenerSucursal();
    }

  }
})();