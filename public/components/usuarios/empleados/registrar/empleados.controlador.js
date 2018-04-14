(() => {
  'use strict';
  angular
  .module('correos-cr')
  .controller('controladorEmpleados', controladorEmpleados);

  controladorEmpleados.$inject = ['$http','$stateParams', '$state', 'servicioUsuarios', 'imageUpload', 'Upload'];

  function controladorEmpleados($http,$stateParams, $state, servicioUsuarios,imageUpload, Upload){
    let vm = this;

    vm.roles = ["Encargado de Aduana", "Encargado de Sucursal", "Repartidor"];

    vm.sucursales = ["San Jose", "Alajuela", "Heredia", "Cartago", "Guanacaste","Puntarenas", "Limon"];

    vm.rolesAduana = ["Aforador", "Agente Aduanal", "Gerente Aduanero", "Verificador"];

    vm.sexo = ["Femenino", "Masculino", "Sin especificar"];

    vm.tipoIdentificacion = ["Nacional", "Residente", "Pasaporte"];

    // Objeto sin formato
    vm.nuevoEmpleado = {};

    vm.listaEmpleados = listarEmpleados();

    listarEmpleados();

    // ***********Guardar imagen en Cloudinary
    vm.cloudObj = imageUpload.getConfiguration();

    vm.preRegistrarUsuario = (pnuevoUsuario) => {
      vm.cloudObj.data.file = pnuevoUsuario.fotoPerfil[0];
      Upload.upload(vm.cloudObj).success((data) => {
        vm.registrarEmpleado(pnuevoUsuario, data.url);
      });
    }
    // *****************************

    // Guardar un nuevo empleado
    vm.registrarEmpleado = (pNuevoEmpleado, urlImagen) => {
      console.log(pNuevoEmpleado);

      switch (pNuevoEmpleado.rol) {

        case "Encargado de Aduana":
          let nuevoEncargadoAduana = new EmpleadoAduana(pNuevoEmpleado.tipoIdentificacion,pNuevoEmpleado.identificacion,pNuevoEmpleado.primerNombre, pNuevoEmpleado.segundoNombre, pNuevoEmpleado.primerApellido, pNuevoEmpleado.segundoApellido,urlImagen,pNuevoEmpleado.sexo, pNuevoEmpleado.fechaNacimiento,pNuevoEmpleado.email, pNuevoEmpleado.contrasenna, pNuevoEmpleado.provincia, pNuevoEmpleado.canton, pNuevoEmpleado.distrito,pNuevoEmpleado.direccion, 1,'Empleado', pNuevoEmpleado.rolAduana)

          console.log(nuevoEncargadoAduana);

          servicioUsuarios.agregarEmpleado(nuevoEncargadoAduana);
        break;

        // Encargado de Sucursal
        case "Encargado de Sucursal":

          let nuevoEncargadoSucursal = new EmpleadoSucursal(pNuevoEmpleado.tipoIdentificacion,pNuevoEmpleado.identificacion,pNuevoEmpleado.primerNombre, pNuevoEmpleado.segundoNombre, pNuevoEmpleado.primerApellido, pNuevoEmpleado.segundoApellido,urlImagen, pNuevoEmpleado.sexo, pNuevoEmpleado.fechaNacimiento,pNuevoEmpleado.email, pNuevoEmpleado.contrasenna, pNuevoEmpleado.provincia, pNuevoEmpleado.canton, pNuevoEmpleado.distrito,pNuevoEmpleado.direccion, 1,'Empleado',pNuevoEmpleado.rol, pNuevoEmpleado.sucursal);

          console.log(nuevoEncargadoSucursal);

          servicioUsuarios.agregarEmpleado(nuevoEncargadoSucursal);

        break;

        // Repartidor
        case "Repartidor":

          let nuevoRepartidor= new Repartidor(pNuevoEmpleado.tipoIdentificacion,pNuevoEmpleado.identificacion,pNuevoEmpleado.primerNombre, pNuevoEmpleado.segundoNombre, pNuevoEmpleado.primerApellido, pNuevoEmpleado.segundoApellido,urlImagen,pNuevoEmpleado.sexo, pNuevoEmpleado.fechaNacimiento,pNuevoEmpleado.email, pNuevoEmpleado.contrasenna, pNuevoEmpleado.provincia, pNuevoEmpleado.canton, pNuevoEmpleado.distrito,pNuevoEmpleado.direccion, 1,'Empleado',pNuevoEmpleado.telefono, pNuevoEmpleado.sucursal, pNuevoEmpleado.licencia, pNuevoEmpleado.fotoLicencia, pNuevoEmpleado.vencimientoLicencia);

          console.log(nuevoRepartidor);

          servicioUsuarios.agregarEmpleado(nuevoRepartidor);

        break;
      
        default:
          let nuevoUsuario = new Usuario(pNuevoEmpleado.identificacion, pNuevoEmpleado.nombre, pNuevoEmpleado.apellido1, pNuevoEmpleado.fechaNacimiento, pNuevoEmpleado.email, pNuevoEmpleado.contrasenna, pNuevoEmpleado.provincia.name, pNuevoEmpleado.canton.name, pNuevoEmpleado.distrito.name, pNuevoEmpleado.direccion, 1,'Empleado');

          console.log(nuevoUsuario);

          servicioUsuarios.agregarEmpleado(nuevoUsuario);
        break;
      }

      //   // Retroalimentacion Visual para los usuarios: SweetAlert
      swal("Registro exitoso", "El empleado ha sido registrado correctamente", "success", {
        button: "Aceptar",
      });

      listarEmpleados();
    }

    // Imprimir lista de repartidores en el sistema
    function listarEmpleados(){
      vm.listaEmpleados = servicioUsuarios.obtenerUsuarioPorRol("Empleado");
    }

    vm.modificar = (pEmpleado) =>{
      console.log(pEmpleado.identificacion);
      $state.go('modClientes', { identificacion: JSON.stringify(pEmpleado.identificacion) })
    }

    // Direcciones
    vm.provincias = $http({
      method: 'GET',
      url: './sources/data/provincias.json'
    }).then( (success) => {
      vm.provincias = success.data;
    }, (error) => {
      console.log("OcurriÃ³ un error " + error.data);
    });

    vm.rellenarCantones = (pidProvincia) => {
      vm.cantones = $http({
        method: 'GET',
        url: './sources/data/cantones.json'
      }).then((success) => {
        let cantones = [];
        for (let i = 0; i < success.data.length; i++) {
          if (pidProvincia == success.data[i].idProvincia) {
            cantones.push(success.data[i]);
          }
        }
        vm.cantones = cantones;
      }, (error) => {
        console.log("OcurriÃ³ un error " + error.data)
      });
    }

    vm.rellenarDistrito = (pidCanton) => {
      vm.distritos = $http({
        method: 'GET',
        url: './sources/data/distritos.json'
      }).then((success) => {
        let distritos = [];
        for (let i = 0; i < success.data.length; i++) {
          if (pidCanton == success.data[i].idCanton) {
            distritos.push(success.data[i]);
          }
        }
        vm.distritos = distritos;
      }, (error) => {
        console.log("OcurriÃ³ un error " + error.data);
      });
    }
  }
})();