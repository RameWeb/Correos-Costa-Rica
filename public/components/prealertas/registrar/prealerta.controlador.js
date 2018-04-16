(() => {
  'use strict';
  angular
  .module('correos-cr')
  .controller('controladorPrealertas', controladorPrealertas);

  controladorPrealertas.$inject = ['$http', '$stateParams', '$state','servicioUsuarios', /*'loginService'*/];

function controladorPrealertas($http, $stateParams, $state, servicioUsuarios, /*loginService*/){
    const vm = this;

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

    listarPrealertas();
    
    // Funcion que es llamada desde el html para registrar una prealerta
    vm.registrarPrealerta = (pnuevaprealerta) => {
      
      let objPrealertaNueva = new Prealertas(pnuevaprealerta.tracking, pnuevaprealerta.url, pnuevaprealerta.tipoProducto, pnuevaprealerta.valor, pnuevaprealerta.peso, pnuevaprealerta.courier),
      registroExitoso;

      console.log(objPrealertaNueva);

      registroExitoso = servicioUsuarios.addPrealertas(objPrealertaNueva);

      if(registroExitoso == true){
        swal({
          title: "Registro exitoso",
          text: "La prealerta se ha registrado correctamente.",
          icon: "success",
          button: "Aceptar",
        });
        vm.nuevaPrealerta = null
      }else{
        swal({
          title: "Hubo un error",
          text: "Ha ocurrido un error, inténtelo más tarde",
          icon: "error",
          button: "Aceptar",
        });
      }
    };

    function listarPrealertas(){
    vm.listaPrealertas = servicioUsuarios.getPrealertas();
    }

    vm.modificar = (pprealerta) =>{
      $state.go('modificarPrealerta', {tracking: JSON.stringify(pprealerta.tracking)})
    }

  }
})();