(() => {
  'use strict';
  angular
  .module('correos-cr')
  .factory('localStorageFactories', localStorageFactories);

  localStorageFactories.$inject = ['$log','$http'];

  function localStorageFactories($log, $http){
    const localStorageAPI = {
      setItem : _setItem,
      getItem : _getItem,
      setSession : _setSession,
      closeSession : _closeSession,
      getSession : _getSession
    };
    return localStorageAPI;

    function _setItem(key, value){
      let response = true;

      localStorage.setItem(key, JSON.stringify(value));

      return response;
    };

    function _getItem(value){
      let arrayData = JSON.parse(localStorage.getItem(value));

      if(!arrayData){
        arrayData = [];
      }
      
      return arrayData;
    };

    function _setSession(value){
      let response = true;

      sessionStorage.setItem('session', JSON.stringify(value));

      return response;
    };

    function _closeSession(){
      let response = true;

      sessionStorage.removeItem('session');

      return response;
    };

    function _getSession(){
      let sessionActive = JSON.stringify(sessionStorage.setItem('session'));

      return sessionActive;
    };

  };
})();