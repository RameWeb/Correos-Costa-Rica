(() => {
  'use strict';
  angular
  .module('correos-cr')
  .controller('controladorModClientes', controladorModClientes);

  controladorModClientes.$inject = ['$http','$stateParams', '$state','servicioUsuarios', 'imageUpload', 'Upload', 'NgMap'];

  function controladorModClientes($http, $stateParams, $state, servicioUsuarios, imageUpload, Upload, NgMap){

    let clienteSeleccionado;

    if(!$stateParams.email){
      $state.go('mantClientes');
    }

    clienteSeleccionado = servicioUsuarios.obtenerUsuarioEspecifico($stateParams.email);

    console.log(clienteSeleccionado);

    let vm = this;

    vm.sucursales = ["Alajuelita", "Bagaces", "Cañas", "Desamparados", "Cartago Centro", "Moravia", "Pavas", "Venecia"];

    vm.sexo = ["Femenino", "Masculino", "Sin especificar"];

    vm.tipoIdentificacion = ["Cédula nacional", "Residente", "Pasaporte", "DIMEX"];

    NgMap.getMap("map").then(function (map) {
      vm.map = map;
    });

    vm.callbackFunc = function (param) {
      vm.latitude = vm.map.getCenter().lat();
      vm.longitude = vm.map.getCenter().lng();
    };


    vm.tarjetas = clienteSeleccionado.tarjetas;

    vm.nuevoClienteModificado = {
      identificacion: clienteSeleccionado.identificacion,
      nombre: clienteSeleccionado.nombre1,
      apellido1: clienteSeleccionado.apellido1,
      email: clienteSeleccionado.email,
      contrasenna: clienteSeleccionado.contrasenna,
      fechaNacimiento: new Date(clienteSeleccionado.fechaNacimiento),
      telefono: clienteSeleccionado.telefono,
      provincia: clienteSeleccionado.provincia,
      canton: clienteSeleccionado.canton,
      distrito: clienteSeleccionado.distrito,
      direccion: clienteSeleccionado.direccion,
    };

    vm.modificarCliente = (pNuevoCliente) =>{
      let identificacion = clienteSeleccionado.identificacion;

      let tarjetaModificada = new Tarjeta(pNuevoCliente.titularTarjeta, pNuevoCliente.mesVencimiento, pNuevoCliente.annoVencimiento, pNuevoCliente.ccv);

      let estado = true;

      let clienteModificado = new Cliente(pNuevoCliente.identificacion, pNuevoCliente.nombre ,pNuevoCliente.apellido1, pNuevoCliente.fechaNacimiento,pNuevoCliente.email, pNuevoCliente.contrasenna, pNuevoCliente.provincia, pNuevoCliente.canton, pNuevoCliente.distrito, pNuevoCliente.direccion, estado, "Cliente", pNuevoCliente.telefono, tarjetaModificada);

      console.log(clienteModificado);

      // Pasamos al servicio el nuevo obj de tipo cliente para ser almacenado en el localStorage
      vm.clienteSeleccionado = servicioUsuarios.actualizarUsuario(clienteModificado);

      //Retroalimentacion Visual para los usuarios: SweetAlert
      swal("Registro exitoso", "El cliente se ha sido modificado correctamente", "success", {
        button: "Aceptar",
      });

      $state.go('mantClientes');

      listarClientes();
      
      // Se limpia el formulario
      vm.nuevoClienteModificado = null;
    }
    
  // Imprimir lista de repartidores en el sistema
    function listarClientes(){
      vm.listaClientes = servicioClientes.obtenerClientes();
    }
  }
})();