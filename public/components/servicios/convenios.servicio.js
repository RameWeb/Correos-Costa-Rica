(() => {
  'use strict';
  angular
  .module('correos-cr')
  .service('servicioConvenios', servicioConvenios);

  servicioConvenios.$inject =  ['$log', '$http', 'localStorageFactories'];

  function servicioConvenios($log, $http, localStorageFactories){
    const publicAPI = {
      setConvenios: _setConvenios,
      getConvenios : _getConvenios,
      obtenerConvenioSeleccionado : _obtenerConvenioSeleccionado,
      actualizarConvenio : _actualizarConvenio
    };
    return publicAPI;

    // Funcion que almacena en el localStorageFactorie todos los convenios
    function _setConvenios(pnuevoConvenio){
      let listaConvenios = _getConvenios();
      let registro = localStorageFactories.setConvenios(pnuevoConvenio);

      return registro;
      
    }

    // Funcion que trae todos los convenios programados del localStorageFactorie y a partir de esos datos vuelve a crear un arreglo con todos los objetos 
    function _getConvenios(){
      let listaConvenios = [];
      let listaConveniosLocal = localStorageFactories.getConvenios();


      if(!listaConveniosLocal){
        listaConvenios = [];
      }else{
        listaConveniosLocal.forEach(obj => {
          let objConvenio = new Convenios(obj.idConvenios, obj.tipo, obj.nombreInstitucion,  obj.tiempo,obj.costo,);

          listaConvenios.push(objConvenio);
        })
      }
      return listaConvenios;
    }

    function _obtenerConvenioSeleccionado(idConvenios){
      let  listaConvenios = _getConvenios();
      let ConvenioSeleccionado;

      for(let i = 0; i < listaConvenios.length; i++){
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

          localStorageFactories.setConvenios(listaConvenios); 
        }
      }
    }


  };
})();