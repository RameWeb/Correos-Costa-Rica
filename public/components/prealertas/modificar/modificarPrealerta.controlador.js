(() => {
  'use strict';
  angular
  .module('correos-cr')
  .controller('controladorModificarPrealertas', controladorModificarPrealertas);

  controladorModificarPrealertas.$inject = ['$http','$stateParams', '$state', 'servicioPrealertas'];

  function controladorModificarPrealertas($http, $stateParams, $state, servicioPrealertas){
    let vm = this;

    vm.courier = ["DHL", "UPS", "Amazon", "FedEx", "TNT Express", "USPS", "CRBox", "Aerocasillas", "JetBox"];

    vm.tipoProducto = ["Accesorios para Vehículos", "Animales y Mascotas", "Arte y Antigüedades", "Bebés", "Cámaras y Fotografía", "Celulares y Teléfonos", "Coleccionables y Hobbies", "Computación", "Consolas y Videojuegos", "Deportes y Fitness", "Electrodomésticos", "Electrónica, Audio y Video", "Herramientas y Construcción", "Hogar, Muebles y Jardín", "Industrias y Oficinas", "Instrumentos Musicales", "Joyas y Relojes", "Juegos y Juguetes", "Libros, Revistas y Comics", "Música y Película", "Ropa y Accesorios", "Salud y Belleza", "Otras categorías"];

    let prealertaSeleccionada;

    if($stateParams.tracking == ''){
      $state.go('listarPrealerta');
    }else{
      prealertaSeleccionada = servicioPrealertas.obtenerPrealertaSelecionada($stateParams.tracking);
    }

    // console.log(prealertaSeleccionada);

    vm.nuevaPrealerta = {
      tracking: prealertaSeleccionada.tracking,
      url: prealertaSeleccionada.url,
      tipoProducto: prealertaSeleccionada.tipoProducto,
      valor: prealertaSeleccionada.valor,
      peso: prealertaSeleccionada.peso,
      courier: prealertaSeleccionada.courier
    };

    // listarPrealertas();
    
    // Funcion que es llamada desde el html para regustra un nuevo usuario
    vm.modificarPrealerta = (pnuevaPrealerta) => {
      let tracking = prealertaSeleccionada.tracking;
      
      // console.log(pnuevaPrealerta);

      // Tomamos el objeto sin formato y lo comvertimos en un objeto de tipo cliente
      let objPrealertaModificada = new Prealertas(vm.nuevaSucursal.tracking, vm.nuevaSucursal.url, vm.nuevaSucursal.tipoProducto, vm.nuevaSucursal.valor, vm.nuevaSucursal.peso, vm.nuevaSucursal.courier);
        
      console.log(objPrealertaModificada);

      // Pasamos al servicio el nuevo obj de tipo cliente para ser almacenado en el localStorage
      vm.prealertaSeleccionada = servicioPrealertas.actualizarPrealerta(objPrealertaModificada);

      // Retroalimentacion Visual para los usuarios: SweetAlert
      swal("Registro exitoso", "El nuevo paquete se ha sido prealertado correctamente", "success", {
        button: "Aceptar",
      });

      $state.go('listarPrealerta');

      listarPrealertas();

      // Se limpia el formulario
      vm.nuevaPrealerta = null;
    }

    function listarPrealertas(){
    vm.listaPrealertas = servicioPrealertas.obtenerPrealerta();
    }
  }
})();