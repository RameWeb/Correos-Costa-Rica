(() => {
  'use strict';
  angular
  .module('correos-cr')
  .service('servicioConvenios', servicioConvenios);

  servicioConvenios.$inject =  ['$log', '$http', 'localStorageFactories'];

  function servicioConvenios($log, $http, localStorageFactories){
    const publicAPI = {
      addConvenio : _addConvenio,
      getConvenios : _getConvenios,
      obtenerConvenioSeleccionado : _obtenerConvenioSeleccionado,
      actualizarConvenio : _actualizarConvenio
    };
    return publicAPI;

    // Funcion que almacena en el localStorage todas las fiestas programadas
    function _addConvenio(pnuevoConvenio){
      let listaConvenios = _getConvenios();
      let registro = localStorageFactories.setConvenios(pnuevoConvenio);

      return registro;
      
    }

    // Funcion que trae todas las fiestas programadas del localStorage y a partir de esos datos vuelve a crear un arreglo con todos los objetos de tipo fiesta
    function _getConvenios(){
      let listaConvenios = [];
      let listaConveniosLocal = JSON.parse(localStorage.getItem("ConvenioLS"));

      if(!listaConveniosLocal){
        listaConvenios = [];
      }else{
        listaConveniosLocal.forEach(obj => {
          let objConvenio = new Convenios(obj.nombreInstitucion, obj.tipo, obj.tiempo,obj.costo,obj.idConvenios);

          listaConvenios.push(objConvenio);
        })
      }
      return listaConvenios;
    }

    function _obtenerConvenioSeleccionado(idConvenios){
      let  listaConvenios = _getConvenios();
      let ConvenioSeleccionado;

      for(let i = 0; i < listaTipoProductos.length; i++){
        if (idConvenios == listaConvenios[i].idConvenios){
          ConvenioSeleccionado = listaConvenios[i];
          // console.log(sucursalSeleccionada);
        }
      }
      return ConvenioSeleccionado;
    }

    function _actualizarConvenio(pconvenioModificado){
      let listaConvenios = _getConvenios();

      for(let i = 0; i <listaConvenios.length; i++){
        if (pconvenioModificado.idConvenios == listaConvenios[i].idConvenios){
          listaConvenios[i] = pconvenioModificado;
          // console.log(listaSucursales[i]);

          localStorage.setItem('ConvenioLS', JSON.stringify(listaConvenios)); 
        }
      }
    }


  };
})();