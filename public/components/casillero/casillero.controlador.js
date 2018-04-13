(() => {
  'use strict';
  angular
  .module('correos-cr')
  .controller('controladorCasillero', controladorCasillero);

  controladorCasillero.$inject = ['$stateParams', '$state' , 'servicioCasillero'];

  function controladorCasillero($stateParams, $state){

    let vm = this;

    vm.nuevoCasillero = {};
    
    vm.registrarCasillero = (pnuevoCasillero) => {


      let numeroCasillero = (Math.floor(Math.random()*99999999999)+99999999999);
                      

      console.log(numeroCasillero);


      swal("Registro exitoso", "Se te ha asignado un casillero", "success", {
        button: "Aceptar",
      });
       alert("El casillero asignado es " + numeroCasillero); 

     // console.log(pnuevoCasillero);

      let objNuevoCasillero = new Casillero(pnuevoCasillero.idRandom);
      console.log(objNuevaCasillero);

      // Pasamos al servicio el nuevo obj de tipo cliente para ser almacenado en el localStorage
      servicioCasillero.addCasillero(objNuevaCasillero);
     
   console.log('objeto con casillero');
    console.log(objNuevoCasillero);

  

     

      vm.nuevoCasillero = null;
  
    }

  

  }

})();