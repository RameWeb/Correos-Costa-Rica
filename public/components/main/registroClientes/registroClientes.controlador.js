(() => {
  'use strict';
  angular
    .module('correos-cr')
    .controller('controladorClientesAdmin', controladorClientesAdmin);

    controladorClientesAdmin.$inject = ['$http', 'servicioUsuarios', 'imageUpload', 'Upload', 'NgMap'];

  function controladorClientesAdmin($http, servicioUsuarios, imageUpload, Upload, NgMap){
    let vm = this;

    vm.sucursales = ["Alajuelita", "Bagaces", "Cañas", "Desamparados", "El Llano de Alajuela", "Cahuita", "Goicoechea", "Tibás", "Santa Cruz", "Monteverde", "Aguas Zarcas", "Cartago Centro", "Moravia", "Pavas", "Venecia"];

    vm.sexo = ["Femenino", "Masculino", "Sin especificar"];

    vm.tipoIdentificacion = ["Cédula nacional", "Residente", "Pasaporte", "DIMEX"];

    NgMap.getMap("map").then(function (map) {
      vm.map = map;
    });

    vm.callbackFunc = function (param) {
      vm.latitude = vm.map.getCenter().lat();
      vm.longitude = vm.map.getCenter().lng();
    };

     // Función que obtiene las provincias
     vm.provincias = $http({
      method: 'GET',
      url: '../../../sources/data/provincias.json'
    }).then((success) => {
      vm.provincias = success.data;
    }, (error) => {
    });

    // Funcion que rellena los los cantones
    vm.rellenarCantones = (pidProvincia) => {
      vm.cantones = $http({
        method: 'GET',
        url: '../../../sources/data/cantones.json'
      }).then((success) => {
        let cantones = [];
        for (let i = 0; i < success.data.length; i++) {
          if (pidProvincia == success.data[i].idProvincia) {
            cantones.push(success.data[i]);
          }
        }
        vm.cantones = cantones;
      }, (error) => {
      });
    }

    vm.rellenarDistrito = (pidCanton) => {
      vm.distritos = $http({
        method: 'GET',
        url: '../../../sources/data/distritos.json'
      }).then((success) => {
        let distritos = [];
        for (let i = 0; i < success.data.length; i++) {
          if (pidCanton == success.data[i].idCanton) {
            distritos.push(success.data[i]);
          }
        }
        vm.distritos = distritos;
      }, (error) => {
      });
    }

    // Objeto sin formato
    vm.nuevoCliente = {};

    vm.listaClientes = listarClientes();

    listarClientes();

    // ***********Guardar imagen en Cloudinary
    vm.cloudObj = imageUpload.getConfiguration();

    vm.preRegistrarUsuario = (pNuevoCliente) => {

      pNuevoCliente.latitud = vm.latitude;
      pNuevoCliente.longitud = vm.longitude;

      vm.cloudObj.data.file = pNuevoCliente.fotoPerfil[0];
      Upload.upload(vm.cloudObj).success((data) => {
        vm.registrarCliente(pNuevoCliente, data.url);
      });
    }
    // *****************************

    // Guardar un nuevo cliente
    vm.registrarCliente = (pNuevoCliente, urlImagen) => {
      console.log(pNuevoCliente);

      let chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*-+<>ABCDEFGHIJKLMNOP1234567890";
      let contrasenna = "";
      for (let i = 0; i < 10; i++) {
        let x = Math.floor(Math.random() * chars.length);
        contrasenna += chars.charAt(x);
      }


      let nuevoCliente = new Cliente(pNuevoCliente.tipoIdentificacion, pNuevoCliente.identificacion, pNuevoCliente.primerNombre, pNuevoCliente.segundoNombre, pNuevoCliente.primerApellido, pNuevoCliente.segundoApellido, urlImagen, pNuevoCliente.sexo, pNuevoCliente.fechaNacimiento, pNuevoCliente.email, contrasenna, pNuevoCliente.provincia, pNuevoCliente.canton, pNuevoCliente.distrito, pNuevoCliente.direccion, 1, 'Cliente', pNuevoCliente.telefono, pNuevoCliente.sucursalPreferencia, pNuevoCliente.latitud, pNuevoCliente.longitud);


      // Pasamos al servicio el nuevo obj de tipo cliente para ser almacenado en el localStorage
      servicioUsuarios.agregarUsuario(nuevoCliente);

      //   // Retroalimentacion Visual para los usuarios: SweetAlert
      swal("Registro exitoso", "El cliente se ha sido registrado correctamente", "success", {
        button: "Aceptar",
      });
      // $state.go('mantClientes');

      // Se limpia el formulario
      // vm.nuevoCliente = null;

      listarClientes();
    }

    // Imprimir lista de repartidores en el sistema
    function listarClientes() {
      vm.listaClientes = servicioUsuarios.obtenerUsuarioPorRol("Cliente");
    }

    vm.modificar = (pCliente) => {
      console.log(pCliente.email);
      $state.go('modClientes', { email: JSON.stringify(pCliente.email) })
    }

    vm.desactivar = (pCliente) => {
      swal({
        title: "Desea desactivar el cliente?",
        text: "Desea desactivar el cliente",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            pCliente.estado = false;
            console.log(pCliente.estado);
            servicioUsuarios.actualizarUsuario(pCliente);
            swal("El usuario ha sido desactivado", {
              icon: "success",
            });
          } else {
            swal("Cancelando acción");
          }
        });
    }
  }
})();