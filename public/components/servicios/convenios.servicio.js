(() => {
  'use strict';
  angular
  .module('correos-cr')
  .service('servicioConvenios', servicioConvenios);

  servicioConvenios.$inject = ['$log','$http'];

  function servicioConvenios($log, $http){

    let publicAPI = {
      addConvenios : _addConvenios,
      getConvenios : _getConvenios,
      getConveniosSeleccionada: _getConveniosSeleccionada,
      actualizarConvenios: _actualizarConvenios
    }
    return publicAPI;

    function _addConvenios(pnuevoConvenios){
      let listaConvenios = _getConvenios();
      listaConvenios.push(pnuevoConvenios);
      localStorage.setItem('conveniosLS', JSON.stringify(listaConvenios));
    }

  
    function _getConvenios(){
      let listaConvenios = [];
      let listaConveniosLocal = JSON.parse(localStorage.getItem("conveniosLS"));

      if(listaConveniosLocal == null){
        listaConvenios = [];
      }else{
        listaConveniosLocal.forEach(obj => {
          
          let objConvenios = new Convenios(obj.nombreInstitucion, obj.tipo, obj.tiempo, obj.costo, obj.idConvenios);

          listaConvenios.push(objConvenios);
        })
      }

      return listaConvenios;
    }

    
      actualizarLocal(listaConvenios);

      function _getConveniosSeleccionada(idConvenios){
        let listaConvenios = _getConvenios();
        let conveniosSeleccionada;
  
        for(let i = 0; i < listaConvenios.length; i++){
          if (idConvenios == listaConvenios[i].idConvenios){
            conveniosSeleccionada = listaConvenios[i];
            // console.log(sucursalSeleccionada);
            return conveniosSeleccionada;
          }
        }
      }
  
      function _actualizarConvenios(pconveniosModificada){
        let listaConvenios = _getConvenios();
  
        for(let i = 0; i < listaConvenios.length; i++){
          if (pconveniosModificada.idConvenios == listaConvenios[i].idConvenios){
            listaConvenios[i] = pconveniosModificada;
            // console.log(listaSucursales[i]);
  
            localStorage.setItem('conveniosLS', JSON.stringify(listaConvenios)); 
          }
        }
      }
  
    }

  
 
})();