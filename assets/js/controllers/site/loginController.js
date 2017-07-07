
/**
 * Created by Gabriel on 07/07/2017.
 */
app.controller('loginController', function($rootScope, $http) {

  if(!$rootScope.usuarioLogin)
  {
    $rootScope.usuarioLogin={};
  }

  $rootScope.login=function () {

    $http.post('/ingresar',$rootScope.usuarioLogin)
      .then(function (res, status, headers, config) {
        $rootScope.usuarioLogin={};
        $rootScope.usuario=res.data;

      },error);

  }

});
