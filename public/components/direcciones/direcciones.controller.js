(() => {
  'use strict';
  angular
  .module('correos-cr')
  .controller('controladorDirecciones', controladorDirecciones);

  controladorDirecciones.$inject = ['$http', 'servicioDirecciones'];

  function controladorDirecciones($http, servicioDirecciones){

    let vm = this;

    vm.nuevaDireccion = {};

    vm.provincias = $http({
      method: 'GET',
      url: './sources/data/provincias.json'
    }).then( (success) => {
      vm.provincias = success.data;
    }, (error) => {
      console.log("Ocurrió un error " + error.data);
    });

    vm.rellenarCantones = (pidProvincia) => {
      vm.cantones = $http({
        method: 'GET',
        url: './sources/data/cantones.json'
      }).then((success) => {
        let cantones = [];
        for (let i = 0; i < success.data.length; i++) {
          if (pidProvincia == success.data[i].idProvincia) {
            cantones.push(success.data[i]);
          }
        }
        vm.cantones = cantones;
      }, (error) => {
        console.log("Ocurrió un error " + error.data)
      });
    }

    vm.rellenarDistrito = (pidCanton) => {
      console.log(pidCanton);
      vm.distritos = $http({
        method: 'GET',
        url: './sources/data/distritos.json'
      }).then((success) => {
        let distritos = [];
        for (let i = 0; i < success.data.length; i++) {
          if (pidCanton == success.data[i].idCanton) {
            distritos.push(success.data[i]);
          }
        }
        vm.distritos = distritos;
      }, (error) => {
        console.log("Ocurrió un error " + error.data)
      });
    }

    vm.listaDirecciones = listarDirecciones();

    listarDirecciones();
    // Función que es llamada desde el html para registra una nueva direccion
    vm.registrarDireccion = (pnuevaDireccion) => {

      // Tomamos el objeto sin formato y lo convertimos en una instancia de la clase direccion
      let objNuevaDireccion = new Direccion(pnuevaDireccion.provincia,pnuevaDireccion.canton,pnuevaDireccion.distrito);
     
      console.log('Dirección Registrada');
      console.log(objNuevaDireccion);

      // Pasamos al servicio el nuevo obj de tipo Direccion para ser almacenado en el localStorage
      servicioDirecciones.addDireccion(objNuevaDireccion);

      // Retroalimentación Visual para las Direcciones
      swal("Registro exitoso", "La Direccion ha sido registrada correctamente", "success", {
        button: "Aceptar",
      });

      // Se limpia el formulario
      vm.nuevaDireccion = null;
      listarDirecciones();
    }

    function listarDirecciones() {
      vm.listaDirecciones = servicioDirecciones.getDirecciones();
    }

  }
})();