(() => {
  'use strict';
  angular
  .module('correos-cr')
  .service('servicioPaquetes', servicioPaquetes);

  servicioPaquetes.$inject = ['$log','$http'];

  function servicioPaquetes($log, $http){

    let publicAPI = {
      addPaquetes : _addPaquetes,
      getPaquetes : _getPaquetes,
      getPaquetesSeleccionado: _getPaquetesSeleccionado,
      actualizarPaquetes: _actualizarPaquetes

    }
    return publicAPI;

    function _addPaquetes(pnuevoPaquetes){
      let listaPaquetes = _getPaquetes();
      listaPaquetes.push(pnuevoPaquetes);
      localStorage.setItem('paquetesLS', JSON.stringify(listaPaquetes));
    }

  
    function _getPaquetes(){
      let listaPaquetes = [];
      let listaPaquetesLocal = JSON.parse(localStorage.getItem("paquetesLS"));

      if(listaPaquetesLocal == null){
        listaPaquetes = [];
      }else{
        listaPaquetesLocal.forEach(obj => {
          
          let objPaquetes = new Paquetes(obj.tracking, obj.nombre, obj.peso, obj.valor, obj.repartidor, obj.estado, obj.idPaquetes);

          listaPaquetes.push(objPaquetes);
        })
      }

      return listaPaquetes;
    }

    
      actualizarLocal(listaPaquetes);
    }

   
    //function actualizarLocal(plistaActualizada){
     // localStorage.setItem('paquetesLS', JSON.stringify(plistaActualizada));
    //}



    function _getPaquetesSeleccionado(idPaquetes){
      let listaPaquetes = _getPaquetes();
      let paquetesSeleccionado;

      for(let i = 0; i < listaPaquetes.length; i++){
        if (idPaquetes == listaPaquetes[i].idPaquetes){
          paquetesSeleccionado = listaPaquetes[i];
          // console.log(sucursalSeleccionada);
          return paquetesSeleccionado;
        }
      }
    }

    function _actualizarPaquetes(ppaquetesModificado){
      let listaPaquetes = _getPaquetes();

      for(let i = 0; i < listaPaquetes.length; i++){
        if (ppaquetesModificado.idPaquetes == listaPaquetes[i].idPaquetes){
          listaPaquetes[i] = ppaquetesModificado;
          // console.log(listaSucursales[i]);

          localStorage.setItem('paquetesLS', JSON.stringify(listaPaquetes)); 
        }
      }
    }


    
      
      

    // console.log(_getSucursal());
  
 
})();