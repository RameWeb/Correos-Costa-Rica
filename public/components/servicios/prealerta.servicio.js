(() => {
  'use strict';
  angular
  .module('correos-cr')
  .service('servicioPrealertas', servicioPrealertas);

  servicioPrealertas.$inject = ['$log','$http'];

  function servicioPrealertas($log, $http){

    let publicAPI = {
      agregarPrealerta : _agregarPrealerta,
      obtenerPrealerta : _obtenerPrealerta,
      obtenerPrealertaSelecionada: _obtenerPrealertaSelecionada,
      actualizarPrealerta : _actualizarPrealerta
    }
    return publicAPI;

    // Funcion que almacena en el localStorage todos los usuarios
    function _agregarPrealerta(pnuevaPrealerta){
      let listaPrealertas = _obtenerPrealerta();
      listaPrealertas.push(pnuevaPrealerta);
      localStorage.setItem('prealertasLS', JSON.stringify(listaPrealertas));
    }

    // Funcion que trae todos los usuarios del localStorage y a partir de esos datos vuelve a crear un arreglo con todos los objetos de tipo usuario
    function _obtenerPrealerta(){
      let listaPrealertas = [];
      let listaPrealertasLocal = JSON.parse(localStorage.getItem("prealertasLS"));

      if(listaPrealertasLocal == null){
        listaPrealertas = [];
      }else{
        listaPrealertasLocal.forEach(obj => {
          
          let objPrealertas = new Prealertas(obj.tracking, obj.url, obj.tipoProducto, obj.valor, obj.peso, obj.courier);

          listaPrealertas.push(objPrealertas);
        })
      }

      return listaPrealertas;
    }

    function _obtenerPrealertaSelecionada(tracking){
      let listaPrealertas = _obtenerPrealerta();
      let prealertaSeleccionada;

      for (let i= 0; i < listaPrealertas.length; i++){
        if (tracking == listaPrealertas[i].tracking){
          prealertaSeleccionada = listaPrealertas[i];
          return prealertaSeleccionada;
        }
      }
    }

    function _actualizarPrealerta(pobjPrealertaModificada){
      let listaPrealertas = _obtenerPrealerta();

      for(let i = 0; i < listaPrealertas.length; i++){
        if (pobjPrealertaModificada.tracking == listaPrealertas[i].tracking){
          listaPrealertas[i] = pobjPrealertaModificada;
          // console.log(listaSucursales[i]);

          localStorage.setItem('prealertasLS', JSON.stringify(listaPrealertas)); 
        }
      }
    }

  }
})();