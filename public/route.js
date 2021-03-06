(() => {
  'use strict';
  angular
    .module('appRoutes', ['ui.router', 'oc.lazyLoad', 'uiRouterTitle'])
    .config(routing);
  routing.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routing($stateProvider, $urlRouterProvider, $oclazyLoad) {

    $stateProvider
      .state('landing-page', {
        url: '/',
        templateUrl: './components/landingPage/landing.vista.html',
        data: {
          pageTitle: 'Inicio | Correos de Costa Rica'
        }
      })

      .state('iniciarSesion', {
        url: '/iniciarSesion',
        templateUrl: './components/inicioSesion/inicioSesion.view.html',
        data: {
          pageTitle: 'Inicio de Sesión | Correos de Costa Rica'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/inicioSesion/inicioSesion.controller.js')
          }]
        },
        controller: 'inicioSesionController',
        controllerAs: 'vm'
      })

      .state('registroClientes', {
        url: '/regClientes',
        templateUrl: './components/usuarios/clientes/registrar/regClientes.vista.html',
        data: {
          pageTitle: 'Registrar Clientes | Correos de Costa Rica'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/clientes/registrar/clientes.controlador.js')
          }]
        },
        controller: 'controladorClientes',
        controllerAs: 'vm'
      })

      .state('main', {
        url: '/main',
        templateUrl: './components/main/main.vista.html',
        data: {
          pageTitle: 'Inicio | Correos de Costa Rica'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/main/main.controlador.js')
          }]
        },
        controller: 'mainController',
        controllerAs: 'vm'
      })

      .state('main.registroClientes', {
        url: '/registroClientes',
        templateUrl: './components/main/registroClientes/registroClientes.vista.html',
        data: {
          pageTitle: 'Clientes | Correos de Costa Rica'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/clientes/registrar/clientes.controlador.js')
          }]
        },
        controller: 'controladorClientes',
        controllerAs: 'vm'
      })

      .state('main.listarClientes', {
        url: '/listarClientes',
        templateUrl: './components/main/listarClientes/listarClientes.vista.html',
        data: {
          pageTitle: 'Clientes | Correos de Costa Rica'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/clientes/registrar/clientes.controlador.js')
          }]
        },
        controller: 'controladorClientes',
        controllerAs: 'vm'
      })

      .state('main.listarEmpleados', {
        url: '/mantEmpleados',
        templateUrl: './components/main/ListarBuscarEmpleados/mantEmpleados.vista.html',
        data: {
          pageTitle: 'Lista de Empleados'
        },
        params: {
          objUsuarioTemp: ''
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/empleados/registrar/empleados.controlador.js')
          }]
        },
        controller: 'controladorEmpleados',
        controllerAs: 'vm'
      })

      .state('main.listarPrealertas', {
        url: '/listarPrealerta',
        templateUrl: './components/main/ListarBuscarPrealertas/mantenimientoPrealerta.vista.html',
        data: {
          pageTitle: 'Listar Prealertas'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/prealertas/registrar/prealerta.controlador.js')
          }]
        },
        controller: 'controladorPrealertas',
        controllerAs: 'vm'
      })

      .state('main.verPerfil', {
        url: '/miPerfil',
        templateUrl: './components/main/verPerfil/perfil.view.html',
        data: {
          pageTitle: 'Mi perfil | Correos de Costa Rica'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/main/verPerfil/perfil.controlador.js')
          }]
        },
        controller: 'verPerfilControlador',
        controllerAs: 'vm'
      })

      .state('main.registroCourier', {
        url: '/registroCourier',
        templateUrl: './components/main/registroCourier/courier.vista.html',
        data: {
          pageTitle: 'Courier | Correos de Costa Rica'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/main/registroCourier/courier.controlador.js')
          }]
        },
        controller: 'controladorCourier',
        controllerAs: 'vm'
      })

      .state('main.listarCourier', {
        url: '/listarCourier',
        templateUrl: './components/main//listarCourier/listaCourier.vista.html',
        data: {
          pageTitle: 'Courier | Correos de Costa Rica'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/main/registroCourier/courier.controlador.js')
          }]
        },
        controller: 'controladorCourier',
        controllerAs: 'vm'
      })

      //Inicio de CONVENIOS
      .state('main.convenios', {
        url: '/convenios',
        templateUrl: './components/main/registrarConvenio/convenio.vista.html',
        data: {
          pageTitle: 'Registro convenios | Correos CR'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/main/registrarConvenio/convenio.controlador.js')
          }]
        },
        controller: 'controladorConvenios',
        controllerAs: 'vm'
      })

      .state('main.listaconvenios', {
        url: '/lista-convenios',
        templateUrl: './components/main/ListarBuscarConvenio/listarConvenio.vista.html',
        data: {
          pageTitle: 'Lista convenios | Correos CR'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/main/registrarConvenio/convenio.controlador.js')
          }]
        },
        controller: 'controladorConvenios',
        controllerAs: 'vm'
      })

      .state('main.registroConvenioCliente', {
        url: '/registroConvenioCliente',
        templateUrl: './components/main/convenioClientes/conveniosCliente.vista.html',
        data: {
          pageTitle: 'Solicitar convenio | Correos de Costa Rica'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/main/convenioClientes/conveniosCliente.controlador.js')
          }]
        },
        controller: 'controladorConvenioClientes',
        controllerAs: 'vm'
      })

      .state('main.modificarConvenios', {
        url: '/modificar-convenios',
        templateUrl: './components/main/modificarConvenio/modificarConvenio.vista.html',
        data: {
          pageTitle: 'Lista convenios | Correos CR'
        },
        params: {
          idConvenios: ''
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/main/modificarConvenio/modificarConvenio.controlador.js')
          }]
        },
        controller: 'controladorModificarConvenios',
        controllerAs: 'vm'
      })
      //final de CONVENIOS


      // inicio de SUCURSALES
      .state('main.sucursales', {
        url: '/registroSucursal',
        templateUrl: './components/main/registrarSucursales/sucursales.vista.html',
        data: {
          pageTitle: 'Registrar Sucursales'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/main/registrarSucursales/sucursales.controlador.js')
          }]
        },
        controller: 'controladorSucursales',
        controllerAs: 'vm'
      })

      .state('main.listaSucursal', {
        url: '/listarSucursal',
        templateUrl: './components/main/listarBuscarSucursales/listaSucursales.vista.html',
        data: {
          pageTitle: 'Listar Sucursales'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/main/registrarSucursales/sucursales.controlador.js')
          }]
        },
        controller: 'controladorSucursales',
        controllerAs: 'vm'
      })


      .state('main.modificarSucursales', {
        url: '/modificarSucursal',
        templateUrl: './components/main/modificarSucursal/modificarSucursal.vista.html',
        data: {
          pageTitle: 'Modificar Sucursales'
        },
        params: {
          idSucursal: ''
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/main/modificarSucursal/modificarSucursal.controlador.js')
          }]
        },
        controller: 'controladorModificarSucursal',
        controllerAs: 'vm'
      })
      //final de SUCURSALES

      // inicio de BITACORA

      .state('main.bitacora', {
        url: '/consultarBitacora',
        templateUrl: './components/main/consultarBitacora/consultarBitacora.vista.html',
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/main/consultarBitacora/consultarBitacora.controlador.js')
          }]
        },
        controller: 'controladorBitacora',
        controllerAs: 'vm'
      })
      //final de BITACORA
      // inicio de PRODUCTOS
      .state('main.registroProducto', {
        url: '/registrarTipoProducto',
        templateUrl: './components/main/registrarTipoProducto/tipoProducto.vista.html',
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/main/registrarTipoProducto/tipoProducto.controlador.js')
          }]
        },
        controller: 'controladorProductos',
        controllerAs: 'vm'
      })

      .state('main.ListaProducto', {
        url: '/ListaTipoProducto',
        templateUrl: './components/main/ListarBuscarTipoProducto/listaTipoProductos.vista.html',
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/main/registrarTipoProducto/tipoProducto.controlador.js')
          }]
        },
        controller: 'controladorProductos',
        controllerAs: 'vm'
      })

      .state('main.modificarProducto', {
        url: '/modificarTipoProducto',
        templateUrl: './components/main/modificarTipoProducto/modificarTipoProducto.vista.html',
        params: {
          nombreTipoProducto: ''
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/main/modificarTipoProducto/modificarTipoProducto.controlador.js')
          }]
        },
        controller: 'controladorModProducto',
        controllerAs: 'vm'
      })
      //final de BITACORA
      //inicio de RANKING
      .state('main.ranking', {
        url: '/rankingProductos',
        templateUrl: './components/main/rankingProductos/ranking.vista.html',
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/main/rankingProductos/ranking.controlador.js')
          }]
        },
        controller: 'controladorRanking',
        controllerAs: 'vm'
      })
      //final de RANKING
      // -----------------------------------------------------------------------





















      .state('registroPrealerta', {
        url: '/registroPrealerta',
        templateUrl: './components/prealertas/registrar/prealerta.vista.html',
        data: {
          pageTitle: 'Registrar Prealertas'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/prealertas/registrar/prealerta.controlador.js')
          }]
        },
        controller: 'controladorPrealertas',
        controllerAs: 'vm'
      })

      .state('listarPrealerta', {
        url: '/listarPrealerta',
        templateUrl: './components/prealertas/listarBuscar/mantenimientoPrealerta.vista.html',
        data: {
          pageTitle: 'Listar Prealertas'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/prealertas/registrar/prealerta.controlador.js')
          }]
        },
        controller: 'controladorPrealertas',
        controllerAs: 'vm'
      })

      .state('modificarPrealerta', {
        url: '/modificarPrealerta',
        templateUrl: './components/prealertas/modificar/modificarPrealerta.vista.html',
        data: {
          pageTitle: 'Modificar Prealertas'
        },
        params: {
          tracking: ''
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/prealertas/modificar/modificarPrealerta.controlador.js')
          }]
        },
        controller: 'controladorModificarPrealertas',
        controllerAs: 'vm'
      })


      // .state('modificarConvCliente', {
      //   url: '/modificarConvCliente',
      //   templateUrl: './components/convenioCliente/modificar/modificarConvenios.vista.html',
      //   data: {
      //     pageTitle: 'Modificar Convenios'
      //   },
      //   params: {
      //     idConvenio: ''
      //   },
      //   resolve: {
      //     load: ['$ocLazyLoad', ($ocLazyLoad) => {
      //       return $ocLazyLoad.load('./components/convenioCliente/modificar/modificarConvenios.controlador.js')
      //     }]
      //   },
      //   controller: 'controladorModConveniosCliente',
      //   controllerAs: 'vm'
      // })

      // .state('listarConvCliente', {
      //   url: '/listarConvCliente',
      //   templateUrl: './components/convenioCliente/listarBuscar/mantenimientoConvenios.vista.html',
      //   data: {
      //     pageTitle: 'Listar Convenios'
      //   },
      //   resolve: {
      //     load: ['$ocLazyLoad', ($ocLazyLoad) => {
      //       return $ocLazyLoad.load('./components/convenioCliente/registrar/convenios.controlador.js')
      //     }]
      //   },
      //   controller: 'controladorConveniosCliente',
      //   controllerAs: 'vm'
      // })

      .state('paquetes', {
        url: '/paquetes',
        templateUrl: './components/paquetes/registrarPaquetes/paquetes.vista.html',
        data: {
          pageTitle: 'Registro llegada de paquetes | Correos CR'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/paquetes/registrarPaquetes/paquetes.controlador.js')
          }]
        },
        controller: 'controladorPaquetes',
        controllerAs: 'vm'
      })

      .state('listarPaquetes', {
        url: '/listarPaquetes',
        templateUrl: './components/paquetes/listarPaquetes/listarPaquetes.vista.html',
        data: {
          pageTitle: 'Lista llegada de paquetes | Correos CR'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/paquetes/registrarPaquetes/paquetes.controlador.js')
          }]
        },
        controller: 'controladorPaquetes',
        controllerAs: 'vm'
      })

      .state('listarPaquetesCliente', {
        url: '/listarPaquetesCliente',
        templateUrl: './components/paquetes/listarPaquetes/listarPaquetesCliente.vista.html',
        data: {
          pageTitle: 'Lista de Paquetes | Correos CR'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/paquetes/registrarPaquetes/paquetes.controlador.js')
          }]
        },
        controller: 'controladorPaquetes',
        controllerAs: 'vm'
      })

      .state('modificarPaquetes', {
        url: '/modificarPaquetes',
        templateUrl: './components/paquetes//modificarPaquetes/modificarPaquetes.vista.html',
        data: {
          pageTitle: 'Editar paquetes | Correos CR'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/paquetes/modificarPaquetes/modificarPaquetes.controlador.js')
          }]
        },
        controller: 'controladorModificarPaquetes',
        controllerAs: 'vm'
      })

      .state('cambiarEstadoPaquetes', {
        url: '/cambiarEstadoPaquetes',
        templateUrl: './components/paquetes/cambiarEstadoPaquetes/cambiarEstadoPaquetes.vista.html',
        data: {
          pageTitle: 'Editar paquetes | Correos CR'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/paquetes/cambiarEstadoPaquetes/cambiarEstadoPaquetes.controlador.js')
          }]
        },
        controller: 'controladorCambiarEstadoPaquetes',
        controllerAs: 'vm'
      })

      .state('notificarEstadoPaquetes', {
        url: '/notificarEstadoPaquetes',
        templateUrl: './components/notificarCliente/notificarEstado.vista.html',
        data: {
          pageTitle: 'Editar paquetes | Correos CR'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/paquetes/registrarPaquetes/paquetes.controlador.js')
          }]
        },
        controller: 'controladorPaquetes',
        controllerAs: 'vm'
      })

      .state('listaCourier', {
        url: '/listaCourier',
        templateUrl: './components/courier/listaCourier.vista.html',
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/courier/courier.controlador.js')
          }]
        },
        controller: 'controladorCourier',
        controllerAs: 'vm'
      })

      .state('registroCourier', {
        url: '/registrarCourier',
        templateUrl: './components/courier/courier.vista.html',
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/courier/courier.controlador.js')
          }]
        },
        controller: 'controladorCourier',
        controllerAs: 'vm'
      })

      .state('regRepartidores', {
        url: '/regRepartidores',
        templateUrl: './components/usuarios/repartidores/registrar/regRepartidores.vista.html',
        data: {
          pageTitle: 'Registrar Repartidores'
        },
        params: {
          objUsuarioTemp: ''
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/repartidores/registrar/repartidores.controlador.js')
          }]
        },
        controller: 'controladorRepartidores',
        controllerAs: 'vm'
      })

      .state('mantRepartidores', {
        url: '/mantRepartidores',
        templateUrl: './components/usuarios/repartidores/listarBuscar/mantRepartidores.vista.html',
        data: {
          pageTitle: 'Mantenimiento de Repartidores'
        },
        params: {
          objUsuarioTemp: ''
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/repartidores/registrar/repartidores.controlador.js')
          }]
        },
        controller: 'controladorRepartidores',
        controllerAs: 'vm'
      })

      .state('modRepartidores', {
        url: '/modRepartidores',
        templateUrl: './components/usuarios/epartidores/modificar/modRepartidores.vista.html',
        data: {
          pageTitle: 'Modificar Repartidores'
        },
        params: {
          identificacion: ''
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/repartidores/modificar/modRepartidores.controlador.js')
          }]
        },
        controller: 'controladorModRepartidores',
        controllerAs: 'vm'
      })

      .state('mantClientes', {
        url: '/mantClientes',
        templateUrl: './components/usuarios/clientes/listarBuscar/mantClientes.vista.html',
        data: {
          pageTitle: 'Mantenimiento de Clientes'
        },
        params: {
          objUsuarioTemp: ''
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/clientes/registrar/clientes.controlador.js')
          }]
        },
        controller: 'controladorClientes',
        controllerAs: 'vm'
      })

      .state('modClientes', {
        url: '/modClientes',
        templateUrl: './components/usuarios/clientes/modificar/modClientes.vista.html',
        data: {
          pageTitle: 'Modificar Clientes'
        },
        params: {
          identificacion: ''
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/clientes/modificar/modClientes.controlador.js')
          }]
        },
        controller: 'controladorModClientes',
        controllerAs: 'vm'
      })

      .state('main.registroEmpleados', {
        url: '/regEmpleados',
        templateUrl: './components/main/registrarEmpleados/regEmpleados.vista.html',
        data: {
          pageTitle: 'Registro de Empleados'
        },
        params: {
          objUsuarioTemp: ''
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/empleados/registrar/empleados.controlador.js')
          }]
        },
        controller: 'controladorEmpleados',
        controllerAs: 'vm'
      })

      .state('main.registroPrealertas', {
        url: '/registroPrealerta',
        templateUrl: './components/main/registrarPrealertas/prealerta.vista.html',
        data: {
          pageTitle: 'Registrar Prealertas'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/prealertas/registrar/prealerta.controlador.js')
          }]
        },
        controller: 'controladorPrealertas',
        controllerAs: 'vm'
      })

      .state('mantEmpleados', {
        url: '/mantEmpleados',
        templateUrl: './components/usuarios/empleados/listarBuscar/mantEmpleados.vista.html',
        data: {
          pageTitle: 'Lista de Empleados'
        },
        params: {
          objUsuarioTemp: ''
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/empleados/registrar/empleados.controlador.js')
          }]
        },
        controller: 'controladorEmpleados',
        controllerAs: 'vm'
      })

      .state('modEmpleados', {
        url: '/modEmpleados',
        templateUrl: './components/usuarios/empleados/modificar/modEmpleados.vista.html',
        data: {
          pageTitle: 'Modificar Empleados'
        },
        params: {
          identificacion: ''
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/empleados/modificar/modEmpleados.controlador.js')
          }]
        },
        controller: 'controladorModEmpleados',
        controllerAs: 'vm'
      })

    $urlRouterProvider.otherwise('/');
  };
})();