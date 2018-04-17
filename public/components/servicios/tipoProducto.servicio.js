(() => {
  'use strict';
  angular
  .module('correos-cr')
  .service('servicioTipoProductos', servicioTipoProductos);

  servicioTipoProductos.$inject =  ['$log', '$http'];

  function servicioTipoProductos($log, $http){
    const publicAPI = {
      addTipoProducto : _addTipoProducto,
      getTipoProductos : _getTipoProductos,
      obtenertipoProductoSeleccionado : _obtenertipoProductoSeleccionado,
      actualizarTipoProducto : _actualizarTipoProducto
    };
    return publicAPI;

    // Funcion que almacena en el localStorage todas las fiestas programadas
    function _addTipoProducto(pnuevoTipoProducto){
      let listaTipoProductos = _getTipoProductos();
      listaTipoProductos.push(pnuevoTipoProducto);
      localStorage.setItem('tipoProductoLS', JSON.stringify(listaTipoProductos));
    }

    // Funcion que trae todas las fiestas programadas del localStorage y a partir de esos datos vuelve a crear un arreglo con todos los objetos de tipo fiesta
    function _getTipoProductos(){
      let listaTipoProductos = [];
      let listaTipoProductosLocal = JSON.parse(localStorage.getItem("tipoProductoLS"));

      if(!listaTipoProductosLocal){
        listaTipoProductos = [];
      }else{
        listaTipoProductosLocal.forEach(obj => {
          let objTipoProductos = new tipoProducto(obj.nombreTipoProducto, obj.impuesto);

          listaTipoProductos.push(objTipoProductos);
        })
      }
      return listaTipoProductos;
    }

    function _obtenertipoProductoSeleccionado(nombreTipoProducto){
      let  listaTipoProductos = _getTipoProductos();
      let tipoProductoSeleccionado;

      for(let i = 0; i < listaTipoProductos.length; i++){
        if (nombreTipoProducto == listaTipoProductos[i].nombreTipoProducto){
          tipoProductoSeleccionado = listaTipoProductos[i];
          // console.log(sucursalSeleccionada);
        }
      }
      return tipoProductoSeleccionado;
    }

    function convenioId(){
      let listaConvenios = _getConvenios();
      let convenioSeleccionado;

      for(let i = 0; i < listaConvenios; i++ ){
        convenioSeleccionado = listaConvenios[i];
      }
      
      return convenioSeleccionado;
    }

    function _actualizarTipoProducto(ptipoProductoModificado){
      let listaTipoProductos = _getTipoProductos();

      for(let i = 0; i <listaTipoProductos.length; i++){
        if (ptipoProductoModificado.nombreTipoProducto == listaTipoProductos[i].nombreTipoProducto){
          listaTipoProductos[i] = ptipoProductoModificado;
          // console.log(listaSucursales[i]);

          localStorage.setItem('tipoProductoLS', JSON.stringify(listaTipoProductos)); 
        }
      }
    }


  };
})();