(() => {
  'use strict';
  angular
  .module('correos-cr')
  .controller('controladorPrealertas', controladorPrealertas);

  controladorPrealertas.$inject = ['$stateParams', '$state','servicioUsuarios' /*',loginService'*/];

function controladorPrealertas($stateParams, $state, servicioUsuarios /*,loginService*/){
    let vm = this;

    // const userAuth = loginService.getAuthUser();

    // console.log(userAuth);

    // if(userAuth == undefined){
    //   $state.go('inicioSesion');
    // }else{
    //   vm.usuarioActivo = userAuth.getNombre();
    // }

    vm.courier = ["DHL", "UPS", "Amazon", "FedEx", "TNT Express", "USPS", "CRBOx", "Aerocasillas", "JetBox"]; 

    vm.tipoProducto = ["Accesorios para Vehículos", "Animales y Mascotas", "Arte y Antigüedades", "Bebés", "Cámaras y Fotografía", "Celulares y Teléfonos", "Coleccionables y Hobbies", "Computación", "Consolas y Videojuegos", "Deportes y Fitness", "Electrodomésticos", "Electrónica, Audio y Video", "Herramientas y Construcción", "Hogar, Muebles y Jardín", "Industrias y Oficinas", "Instrumentos Musicales", "Joyas y Relojes", "Juegos y Juguetes", "Libros, Revistas y Comics", "Música y Película", "Ropa y Accesorios", "Salud y Belleza", "Otras categorías"];

    //Objeto sin formato

    vm.nuevaPrealerta = {};
    vm.listaPrealertas = listarPrealertas();
    listarPrealertas();

    // Funcion que es llamada desde el html para registrar una prealerta

    vm.registrarPrealerta = (pnuevaPrealerta) => {
      
      let objPrealertaNueva = new Prealertas(pnuevaPrealerta.tracking, pnuevaPrealerta.url, pnuevaPrealerta.tipoProducto, pnuevaPrealerta.valor, pnuevaPrealerta.peso, pnuevaPrealerta.courier);

      console.log(objPrealertaNueva);

      servicioUsuarios.addPrealertas(objPrealertaNueva);

      swal("Registro exitoso", "La prealerta se ha sido registrado correctamente", "success", {
        button: "Aceptar",
      });

      listarPrealertas();
    };

    function listarPrealertas(){
    vm.listaPrealertas = servicioUsuarios.getPrealertas();
    }

    vm.modificar = (pprealerta) =>{
      $state.go('modificarPrealerta', {tracking: JSON.stringify(pprealerta.tracking)})
    }

  }
})();