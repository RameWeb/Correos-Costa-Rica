(() => {
  'use strict';
  angular
  .module('correos-cr')
  .service('servicioConvenioClientes', servicioConvenioClientes);

  servicioConvenioClientes.$inject = ['$log','$http'];

  function servicioConvenioClientes($log, $http){

    let publicAPI = {
      agregarConvenioCliente : _agregarConvenioCliente,
      obtenerConvenioCliente : _obtenerConvenioCliente,
      obtenerConvenioSeleccionado: _obtenerConvenioSeleccionado,
      actualizarConvenioCliente: _actualizarConvenioCliente
    }
    return publicAPI;

    // Funcion que almacena en el localStorage todos los usuarios

    function _agregarConvenioCliente(pnuevoConvenio){
      let listaConvClientes = _obtenerConvenioCliente();
      listaConvClientes.push(pnuevoConvenio);
      localStorage.setItem('conveniosClientesLS', JSON.stringify(listaConvClientes));
    }

    // Funcion que trae todos los usuarios del localStorage y a partir de esos datos vuelve a crear un arreglo con todos los objetos de tipo usuario

    function _obtenerConvenioCliente(){
      let listaConvClientes = [];
      let listaConvClientesLocal = JSON.parse(localStorage.getItem("conveniosClientesLS"));

      if(listaConvClientesLocal == null){
        listaConvClientes = [];
      }else{
        listaConvClientesLocal.forEach(obj => {
          
          let objConvClientes = new ConveniosClientes(obj.servicio, obj.cliente, obj.direccion, obj.idConvenio);

          listaConvClientes.push(objConvClientes);
        })
      }

      return listaConvClientes;
    }

    function _obtenerConvenioSeleccionado(idConvenio){
      let listaConvClientes = _obtenerConvenioCliente();
      let convClienteSeleccionado;

      for(let i = 0; i < listaConvClientes.length; i++){
        if (idConvenio == listaConvClientes[i].idConvenio){
          convClienteSeleccionado = listaConvClientes[i];
          // console.log(convClienteSeleccionado);
          return convClienteSeleccionado;
        }
      }
    }

    function _actualizarConvenioCliente(pobjConvenioSeleccionado){
      let listaConvClientes = _obtenerConvenioCliente();

      for(let i = 0; i < listaConvClientes.length; i++){
        if (pobjConvenioSeleccionado.idConvenio == listaConvClientes[i].idConvenio){
          listaConvClientes[i] = pobjConvenioSeleccionado;
          // console.log(listaConvClientes[i]);

          localStorage.setItem('conveniosClientesLS', JSON.stringify(listaConvClientes)); 
        }
      }
    }

    // console.log(_obtenerConvenioCliente());
  }
})();