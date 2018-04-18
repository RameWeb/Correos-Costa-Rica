(() => {
  'use strict';
  angular
  .module('correos-cr')
  .controller('controladorModEmpleados', controladorModEmpleados);

  controladorModEmpleados.$inject = ['$http','$stateParams', '$state','servicioUsuarios', 'imageUpload', 'Upload'];

  function controladorModEmpleados($http, $stateParams, $state, servicioUsuarios, imageUpload, Upload){

    let empleadoSeleccionado;

    if(!$stateParams.identificacion){
      $state.go('mantEmpleados');
    }

    empleadoSeleccionado = servicioUsuarios.obtenerUsuarioEspecifico($stateParams.identificacion);

    console.log(empleadoSeleccionado);

    let vm = this;

    vm.roles = ["Encargado de Aduana", "Encargado de Sucursal", "Repartidor"];

    vm.sucursales = ["San Jose", "Alajuela", "Heredia", "Cartago", "Guanacaste","Puntarenas", "Limon"];

    vm.rolesAduana = ["Aforador", "Agente Aduanal", "Gerente Aduanero", "Verificador"];

    vm.sexo = ["Femenino", "Masculino", "Sin especificar"];

    vm.tipoIdentificacion = ["Nacional", "Residente", "Pasaporte"];

    vm.nuevoEmpleadoModificado = {
      rolEmpleado: empleadoSeleccionado.rolEmpleado,
      identificacion: empleadoSeleccionado.identificacion,
      nombre: empleadoSeleccionado.nombre,
      apellido1: empleadoSeleccionado.apellido1,
      email: empleadoSeleccionado.email,
      contrasenna: empleadoSeleccionado.contrasenna,
      fechaNacimiento: new Date(empleadoSeleccionado.fechaNacimiento),
      telefono: empleadoSeleccionado.telefono,
      provincia: empleadoSeleccionado.provincia,
      canton: empleadoSeleccionado.canton,
      distrito: empleadoSeleccionado.distrito,
      direccion: empleadoSeleccionado.direccion,
      rolAduana: empleadoSeleccionado.rolAduana,
      sucursal: empleadoSeleccionado.sucursal,
      licencia: empleadoSeleccionado.licencia,
      fotoLicencia: empleadoSeleccionado.fotoLicencia,
      vencimientoLicencia: new Date(empleadoSeleccionado.vencimientoLicencia)
    };

    // Guardar un nuevo empleado
    vm.modificarEmpleados = (pNuevoEmpleado) => {
      let identificacion = empleadoSeleccionado.identificacion;

      // limpiar registro de propiedades de objeto anteriores.
      function cleanReg(){
        switch(vm.nuevoEmpleadoModificado.rolEmpleado) {
          case 'Administrador':
              vm.nuevoEmpleadoModificado.rolAduana = null;
              vm.nuevoEmpleadoModificado.sucursal = null;
              vm.nuevoEmpleadoModificado.licencia = null;
              vm.nuevoEmpleadoModificado.fotoLicencia = null;
              vm.nuevoEmpleadoModificado.vencimientoLicencia = null;
              break;
          case 'Encargado de Aduana':
              vm.nuevoEmpleadoModificado.sucursal = null;
              vm.nuevoEmpleadoModificado.licencia = null;
              vm.nuevoEmpleadoModificado.fotoLicencia = null;
              vm.nuevoEmpleadoModificado.vencimientoLicencia = null;
              break;
          case 'Encargado de Sucursal':
              vm.nuevoEmpleadoModificado.rolAduana = null;
              vm.nuevoEmpleadoModificado.licencia = null;
              vm.nuevoEmpleadoModificado.fotoLicencia = null;
              vm.nuevoEmpleadoModificado.vencimientoLicencia = null;
              break;
          case 'Repartidor':
              vm.nuevoEmpleadoModificado.rolAduana = null;
              break;
          default:
              break;
        }
      }
      cleanReg();
      // ****************


      let empleadoModificado = new Empleado(vm.nuevoEmpleadoModificado.rolEmpleado, vm.nuevoEmpleadoModificado.identificacion,vm.nuevoEmpleadoModificado.nombre,vm.nuevoEmpleadoModificado.apellido1,vm.nuevoEmpleadoModificado.email,vm.nuevoEmpleadoModificado.contrasenna,vm.nuevoEmpleadoModificado.fechaNacimiento,vm.nuevoEmpleadoModificado.telefono,vm.nuevoEmpleadoModificado.provincia,vm.nuevoEmpleadoModificado.canton,vm.nuevoEmpleadoModificado.distrito,vm.nuevoEmpleadoModificado.direccion,vm.nuevoEmpleadoModificado.rolAduana,vm.nuevoEmpleadoModificado.sucursal,vm.nuevoEmpleadoModificado.licencia,vm.nuevoEmpleadoModificado.fotoLicencia,vm.nuevoEmpleadoModificado.vencimientoLicencia);
      console.log(empleadoModificado);

       // Pasamos al servicio el nuevo obj de tipo cliente para ser almacenado en el localStorage
       vm.empleadoSeleccionado = servicioUsuarios.actualizarUsuario(empleadoModificado);

      //   // Retroalimentacion Visual para los usuarios: SweetAlert
      swal("Registro exitoso", "El empleado se ha sido modificado correctamente", "success", {
        button: "Aceptar",
      });

      $state.go('mantEmpleados');

      // Se limpia el formulario
      vm.nuevoEmpleadoModificado = null;

      listarEmpleados();
    }

    // Imprimir lista de empleados en el sistema
    function listarEmpleados(){
      vm.listaEmpleados = servicioUsuarios.obtenerEmpleados('Cliente');
    }

    vm.roles = ["Administrador", "Encargado de Aduana", "Encargado de Sucursal", "Repartidor"];

    vm.sucursales = ["San Jose", "Alajuela", "Heredia", "Cartago", "Guanacaste","Puntarenas", "Limon"];

    vm.rolesAduana = ["Aforador", "Agente Aduanal", "Gerente Aduanero", "Verificador"];

  }
})();