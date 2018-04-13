(() => {
  'use strict';
  angular
  .module('correos-cr')
  .service('imageUpload', imageUpload);

  imageUpload.$inject = ['$http'];

  function imageUpload($http){
    const cloudObj = {
      url:'https://api.cloudinary.com/v1_1/jeygut/image/upload',
      data:{
        upload_preset: 'correos-cr',
        tags:'Any',
        context:'photo=test'
      }
    };

    const uploadAPI = {
      getConfiguration : _getConfiguration
    };
    return uploadAPI;

    function _getConfiguration() {
      return cloudObj;
    }
  };
})();