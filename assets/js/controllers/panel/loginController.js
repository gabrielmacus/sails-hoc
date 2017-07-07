
/**
 * Created by Gabriel on 07/07/2017.
 */
app.controller('loginController', function($rootScope, $http,$location) {

  if(!$rootScope.usuarioLogin)
  {
    $rootScope.usuarioLogin={};
  }

  $rootScope.login=function () {

    $http.post('/admin/ingresar',$rootScope.usuarioLogin)
      .then(function (res, status, headers, config) {
        $rootScope.usuarioLogin={};
        $rootScope.usuario=res.data;

        $location.path( "/dash" );
      },error);

  }

});
