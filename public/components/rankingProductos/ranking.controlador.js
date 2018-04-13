(() => {
  'use strict';
  angular
  .module('correos-cr')
  .controller('controladorRanking', controladorRanking);

  controladorRanking.$inject = ['$stateParams', '$state'];

  function controladorRanking($stateParams, $state) {
    let vm = this;
    vm.ranking = {};

	vm.ranking.tiposProductos = [
		{
			tipoDeProducto: 'Accesorios de Cámara',
			impuesto: '0.14',
      cantidad: '6',
      fecha:'13/02/2009'
		},
		{
			tipoDeProducto: 'Accesorios de Cultura Física',
			impuesto: '0.24',
      cantidad: '2',
      fecha:'13/03/2009'
		},
		{
      tipoDeProducto: 'Estuche para instrumento músical',
			impuesto: '0.30',
      cantidad: '1',
      fecha:'13/02/2009'
    },
    {
			tipoDeProducto: 'Fusible',
			impuesto: '0.14',
      cantidad: '3',
      fecha:'13/02/2009'
		},
		{
			tipoDeProducto: 'Gata Hidráulica',
			impuesto: '0.24',
      cantidad: '5',
      fecha:'13/02/2009'
		},
		{
      tipoDeProducto: 'Horno de Microondas',
			impuesto: '0.38',
      cantidad: '8',
      fecha:'13/02/2009'
    },
    {
			tipoDeProducto: 'Tienda de Campaña',
			impuesto: '0.30',
      cantidad: '4',
      fecha:'13/02/2009'
		},
		{
			tipoDeProducto: 'Valvulas',
			impuesto: '0.14',
      cantidad: '20',
      fecha:'13/03/2009'
		},
		{
      tipoDeProducto: 'Zapatos',
			impuesto: '0.30',
      cantidad: '1',
      fecha:'13/03/2009'
    }

    
    
	];
}
  })();