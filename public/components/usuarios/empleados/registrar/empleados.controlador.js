(() => {
  'use strict';
  angular
  .module('correos-cr')
  .controller('controladorEmpleados', controladorEmpleados);

  controladorEmpleados.$inject = ['$stateParams', '$state','servicioUsuarios'];

  function controladorEmpleados($stateParams, $state, servicioUsuarios){
    let vm = this;

    vm.roles = ["Encargado de Aduana", "Encargado de Sucursal", "Repartidor"];

    vm.sucursales = ["San Jose", "Alajuela", "Heredia", "Cartago", "Guanacaste","Puntarenas", "Limon"];

    vm.rolesAduana = ["Aforador", "Agente Aduanal", "Gerente Aduanero", "Verificador"];


    // Objeto sin formato
    vm.nuevoEmpleado = {};

    vm.listaEmpleados = listarEmpleados();

    listarEmpleados();

    // Guardar un nuevo empleado
    vm.registrarEmpleados = (pNuevoEmpleado) => {
      console.log(pNuevoEmpleado);

      let estado = true,
          registroExitoso;

      switch (pNuevoEmpleado.rol) {

        case "Encargado de Aduana":
          let nuevoEncargadoAduana = new EmpleadoAduana(pNuevoEmpleado.identificacion, pNuevoEmpleado.nombre, pNuevoEmpleado.apellido1, pNuevoEmpleado.fechaNacimiento, pNuevoEmpleado.email, pNuevoEmpleado.contrasenna, pNuevoEmpleado.provincia, pNuevoEmpleado.canton, pNuevoEmpleado.distrito, pNuevoEmpleado.direccion, estado, pNuevoEmpleado.rol, pNuevoEmpleado.rolAduana);

          console.log(nuevoEncargadoAduana);

          registroExitoso = servicioUsuarios.agregarUsuario(nuevoEncargadoAduana);
        break;

        // Encargado de Sucursal
        case "Encargado de Sucursal":

          let nuevoEncargadoSucursal = new EmpleadoSucursal(pNuevoEmpleado.identificacion, pNuevoEmpleado.nombre, pNuevoEmpleado.apellido1, pNuevoEmpleado.fechaNacimiento, pNuevoEmpleado.email, pNuevoEmpleado.contrasenna, pNuevoEmpleado.provincia, pNuevoEmpleado.canton, pNuevoEmpleado.distrito, pNuevoEmpleado.direccion, estado, pNuevoEmpleado.rol, pNuevoEmpleado.sucursal);

          console.log(nuevoEncargadoSucursal);

          registroExitoso = servicioUsuarios.agregarUsuario(nuevoEncargadoSucursal);

        break;

        // Repartidor
        case "Repartidor":

          let nuevoRepartidor= new Repartidor(pNuevoEmpleado.identificacion, pNuevoEmpleado.nombre, pNuevoEmpleado.apellido1, pNuevoEmpleado.fechaNacimiento, pNuevoEmpleado.email, pNuevoEmpleado.contrasenna, pNuevoEmpleado.provincia, pNuevoEmpleado.canton, pNuevoEmpleado.distrito, pNuevoEmpleado.direccion, estado,pNuevoEmpleado.rol,pNuevoEmpleado.telefono, pNuevoEmpleado.sucursal, pNuevoEmpleado.licencia, pNuevoEmpleado.fotoLicencia, pNuevoEmpleado.vencimientoLicencia);

          console.log(nuevoRepartidor);

          registroExitoso = servicioUsuarios.agregarUsuario(nuevoRepartidor);

        break;
      
        default:
          let nuevoUsuario = new Usuario(pNuevoEmpleado.identificacion, pNuevoEmpleado.nombre, pNuevoEmpleado.apellido1, pNuevoEmpleado.fechaNacimiento, pNuevoEmpleado.email, pNuevoEmpleado.contrasenna, pNuevoEmpleado.provincia, pNuevoEmpleado.canton, pNuevoEmpleado.distrito, pNuevoEmpleado.direccion, estado, pNuevoEmpleado.rol);

          console.log(nuevoUsuario);

          registroExitoso = servicioUsuarios.agregarUsuario(nuevoUsuario);
        break;
      }

      if(registroExitoso == true){
        swal("Registro exitoso", "El empleado se ha sido registrado correctamente", "success", {
          button: "Aceptar",
        });
        // Se limpia el formulario
        vm.nuevoEmpleado = null;

        $state.go('mantEmpleados');
      }else{
        swal("Ha ocurrido un error", "El empleado se ha sido registrado correctamente", "error", {
          button: "Aceptar",
        });
      }
    }

    // Imprimir lista de repartidores en el sistema
    function listarEmpleados(){
      vm.listaEmpleados = servicioUsuarios.obtenerEmpleados("Cliente");
    }

    vm.modificar = (pEmpleado) =>{
      $state.go('modEmpleados', {identificacion: JSON.stringify(pEmpleado.identificacion)})
    }
  }
})();