(() => {
  'use strict';
  angular
  .module('correos-cr')
  .controller('controladorPrealertas', controladorPrealertas);

  controladorPrealertas.$inject = ['$stateParams', '$state','servicioUsuarios', 'inicioSesionService','servicioCourier'];

function controladorPrealertas($stateParams, $state, servicioUsuarios, inicioSesionService,servicioCourier){
    let vm = this;

    vm.listaCouriers = servicioCourier.getCouriers();

    vm.tipoProducto = ["Accesorios para Vehículos", "Animales y Mascotas", "Arte y Antigüedades", "Bebés", "Cámaras y Fotografía", "Celulares y Teléfonos", "Coleccionables y Hobbies", "Computación", "Consolas y Videojuegos", "Deportes y Fitness", "Electrodomésticos", "Electrónica, Audio y Video", "Herramientas y Construcción", "Hogar, Muebles y Jardín", "Industrias y Oficinas", "Instrumentos Musicales", "Joyas y Relojes", "Juegos y Juguetes", "Libros, Revistas y Comics", "Música y Película", "Ropa y Accesorios", "Salud y Belleza", "Otras categorías"];

    //Objeto sin formato

    vm.nuevaPrealerta = {};

    vm.listaClientes = servicioUsuarios.obtenerUsuarioPorRol("Cliente");

    vm.listaPrealertas = listarPrealertas();

    listarPrealertas();

    // Funcion que es llamada desde el html para registrar una prealerta

    vm.registrarPrealerta = (pNuevaPrealerta) => {
      console.log(pNuevaPrealerta);

      const userAuth = inicioSesionService.getAuthUser();

      if(userAuth == undefined){
        $state.go('inicioSesion');
      }else{
        vm.usuarioActivo = userAuth.getNombreCompleto();
      }
  
      vm.userInfo = userAuth;

      let objPrealertaNueva = new Prealertas(pNuevaPrealerta.tracking,pNuevaPrealerta.url,pNuevaPrealerta.tipoProducto,pNuevaPrealerta.valor,pNuevaPrealerta.peso,pNuevaPrealerta.courier);

      console.log('Objeto con la prealerta');
      console.log(objPrealertaNueva);
      servicioUsuarios.addPrealertas(objPrealertaNueva);

      swal("Registro exitoso", "La prealerta se ha sido registrado correctamente", "success", {
        button: "Aceptar",
      });

      // Se limpia el formulario
      vm.nuevaPrealerta = null;
      listarPrealertas();
    };

    function listarPrealertas(){
    vm.listaPrealertas = servicioUsuarios.getPrealertas();
    }

    vm.modificar = (pPrealertas) =>{
      $state.go('modificarPrealerta', {tracking: JSON.stringify(pPrealertas.tracking)})
    }

  }
})();