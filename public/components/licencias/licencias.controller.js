(() => {
  'use strict';
  angular
  .module('correos-cr')
  .controller('controladorLicencias', controladorLicencias);

  controladorLicencias.$inject = ['$http', 'servicioLicencias'];

  function controladorLicencias($http, servicioLicencias){

    let vm = this;

    vm.nuevaLicencia = {};

    vm.tipos = $http({
      method: 'GET',
      url: './sources/data/tipos.json'
    }).then( (success) => {
      vm.tipos = success.data;
    }, (error) => {
      console.log("Ocurrió un error " + error.data);
    });

    vm.rellenarCategorias = (pidTipo) => {
      vm.categorias = $http({
        method: 'GET',
        url: './sources/data/categorias.json'
      }).then((success) => {
        let categorias = [];
        for (let i = 0; i < success.data.length; i++) {
          if (pidTipo == success.data[i].idTipo) {
            categorias.push(success.data[i]);
          }
        }
        vm.categorias = categorias;
      }, (error) => {
        console.log("Ocurrió un error " + error.data)
      });
    }

    vm.rellenarDescripcion = (pidCategoria) => {
      console.log(pidCategoria);
      vm.descripciones = $http({
        method: 'GET',
        url: './sources/data/descripciones.json'
      }).then((success) => {
        let descripciones = [];
        for (let i = 0; i < success.data.length; i++) {
          if (pidCategoria == success.data[i].idCategoria) {
            descripciones.push(success.data[i]);
          }
        }
        vm.descripciones = descripciones;
      }, (error) => {
        console.log("Ocurrió un error " + error.data)
      });
    }

    vm.listaLicencias = listarLicencias();

    listarLicencias();
    // Función que es llamada desde el html para registra una nueva Licencia
    vm.registrarLicencia = (pnuevaLicencia) => {

      // Tomamos el objeto sin formato y lo convertimos en una instancia de la clase Licencia
      let objNuevaLicencia = new Licencia(pnuevaLicencia.tipo,pnuevaLicencia.categoria,pnuevaLicencia.descripcion);
     
      console.log('Dirección Registrada');
      console.log(objNuevaLicencia);

      // Pasamos al servicio el nuevo obj de tipo Licencia para ser almacenado en el localStorage
      servicioLicencias.addLicencia(objNuevaLicencia);

      // Retroalimentación Visual para las Licencias
      swal("Registro exitoso", "La Licencia ha sido registrada correctamente", "success", {
        button: "Aceptar",
      });

      // Se limpia el formulario
      vm.nuevaLicencia = null;
      listarLicencias();
    }

    function listarLicencias() {
      vm.listaLicencias = servicioLicencias.getLicencias();
    }

  }
})();