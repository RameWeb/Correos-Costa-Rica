(() => {
  'use strict';
  angular
  .module('correos-cr')
  .service('servicioDirecciones', servicioDirecciones);

  servicioDirecciones.$inject = ['$log','$http'];

  function servicioDirecciones($log, $http){

    let publicAPI = {
      addDireccion : _addDireccion,
      getDirecciones : _getDirecciones,
    }
    return publicAPI;

    // Funcion que almacena en el localStorage todos los usuarios
    function _addDireccion(pnuevaDireccion){
      let listaDirecciones = _getDirecciones();
      listaDirecciones.push(pnuevaDireccion);
      localStorage.setItem('direccionesLS', JSON.stringify(listaDirecciones));
    }

    // Funcion que trae todos los usuarios del localStorage y a partir de esos datos vuelve a crear un arreglo con todos los objetos de tipo usuario
    function _getDirecciones(){
      let listaDirecciones = [];
      let listaDireccionesLocal = JSON.parse(localStorage.getItem("direccionesLS"));

      if(listaDireccionesLocal == null){
        listaDirecciones = [];
      }else{
        listaDireccionesLocal.forEach(obj => {
          
          let objDirecciones = new Direccion(obj.provincia,obj.canton,obj.distrito);
          listaDirecciones.push(objDirecciones);
        })
      }

      return listaDirecciones;
    }
   
    function actualizarLocal(plistaActualizada){
      localStorage.setItem('direccionesLS', JSON.stringify(plistaActualizada));
    }

  }
})();