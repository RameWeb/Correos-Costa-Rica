(() => {
  'use strict';
  angular
  .module('correos-cr')
  .controller('controladorBitacora', controladorBitacora);

  controladorBitacora.$inject = ['$stateParams', '$state'];

  function controladorBitacora($stateParams, $state) {
    let vm = this;
    vm.bitacora = {};

	vm.bitacora.estadosDePaquetes = [
		{
			estadoDelPaquete: ' En proceso de almacenaje',
      Hora: '6:00',
      fecha:'14/02/2009',
      nombreCliente: 'Julia Pereira Fuentes',
      encargadoDePaquete:'Luisa Vargas Vargas'
		},
		{
			estadoDelPaquete: ' En proceso de almacenaje',
      Hora: '2:00',
      fecha:'14/03/2009',
      nombreCliente: 'Pedro Fernandez Potrillo',
      encargadoDePaquete:'Karina Ramos Ruiz'
		},
		{
      estadoDelPaquete: ' En proceso de almacenaje',
      Hora: '1:00',
      fecha:'13/07/2009',
      nombreCliente: 'Juan Hernandez Cambronero',
      encargadoDePaquete:'Luisa Vargas Vargas'
    },
    {
			estadoDelPaquete: 'En tránsito al centro de distribución',
      Hora: '3:00',
      fecha:'18/12/2009',
      nombreCliente: 'Juana Hernandez Cambronero',
      encargadoDePaquete:'Luis Vargas Vargas'
		},
		{
			estadoDelPaquete: 'En tránsito al centro de distribución',
      Hora: '5:00',
      fecha:'03/09/2009',
      nombreCliente: 'Jimena Cambronero Lopez',
      encargadoDePaquete:'Ivan Gutierrez Soto'
		},
		{
      estadoDelPaquete: 'En tránsito al destino',
      Hora: '18:00',
      fecha:'05/02/2009',
      nombreCliente: 'Mario Aguilar Marin',
      encargadoDePaquete:'Luisa Vargas Vargas'
    },
    {
			estadoDelPaquete: 'En tránsito al destino',
      Hora: '4:00',
      fecha:'13/02/2009',
      nombreCliente: 'Juan Hernandez Cambronero',
      encargadoDePaquete:'Luisa Vargas Vargas'
		},
		{
			estadoDelPaquete: 'Recibido en el centro',
      Hora: '20:00',
      fecha:'13/03/2009',
      nombreCliente: 'Juan Hernandez Cambronero',
      encargadoDePaquete:'Luisa Vargas Vargas'
		},
		{
      estadoDelPaquete: 'Recibido en el centro',
      Hora: '10:00',
      fecha:'13/03/2009',
      nombreCliente: 'Juan Hernandez Cambronero',
      encargadoDePaquete:'Luisa Vargas Vargas'
    }

    
    
	];
}
  })();