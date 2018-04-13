(() => {
  'use strict';
  angular
  .module('correos-cr')
  .service('servicioUsuarios', servicioUsuarios);

  servicioUsuarios.$inject = ['$log','$http'];

  function servicioUsuarios($log, $http){

    let publicAPI = {
      agregarRepartidores : _agregarRepartidores,
      obtenerRepartidores : _obtenerRepartidores,
      obtenerRepartidorSeleccionado : _obtenerRepartidorSeleccionado,
      actualizarRepartidor : _actualizarRepartidor
    }
    return publicAPI;

    // Guardar repartidores en localStorage
    function _agregarRepartidores(pnuevoRepartidor){
      let listaRepartidores = _obtenerRepartidores();
      listaRepartidores.push(pnuevoRepartidor);
      localStorage.setItem('repartidoresLS', JSON.stringify(listaRepartidores));
    }

    // Funcion que trae todos los usuarios del localStorage y a partir de esos datos vuelve a crear un arreglo con todos los objetos de tipo usuario
    function _obtenerRepartidores(){
      let listaRepartidores = [];
      let listaRepartidoresLocal = JSON.parse(localStorage.getItem("repartidoresLS"));

      if(listaRepartidoresLocal == null){
        listaRepartidores = [];
      }else{
        listaRepartidoresLocal.forEach(obj => {
          
          let objRepartidores = new Repartidor(obj.identificacion,obj.nombre,obj.apellido1,obj.fechaNacimiento,obj.telefono,obj.provincia,obj.canton,obj.distrito,obj.direccion,obj.puesto,obj.sucursal,obj.email,obj.contrasenna,obj.licencia,obj.fotoLicencia,obj.vencimientoLicencia);

          listaRepartidores.push(objRepartidores);
        })
      }
      return listaRepartidores;
    }
    
    function _obtenerRepartidorSeleccionado(identificacion){
      let listaRepartidores = _obtenerRepartidores();
      let repartidorSeleccionado;

      for(let i = 0; i < listaRepartidores.length; i++){
        if (identificacion == listaRepartidores[i].identificacion){
          repartidorSeleccionado = listaRepartidores[i];
          // console.log(sucursalSeleccionada);
          return repartidorSeleccionado;
        }
      }
    }

    function _actualizarRepartidor(pRepartidorModificado){
      let listaRepartidores = _obtenerRepartidores();

      for(let i = 0; i < listaRepartidores.length; i++){
        if (pRepartidorModificado.identificacion == listaRepartidores[i].identificacion){
          listaRepartidores[i] = pRepartidorModificado;
          // console.log(listaSucursales[i]);

          localStorage.setItem('repartidoresLS', JSON.stringify(listaRepartidores)); 
        }
      }
    }
  }
})();