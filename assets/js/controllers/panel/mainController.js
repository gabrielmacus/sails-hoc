
/**
 * Created by Gabriel on 07/07/2017.
 */

var app = angular.module('app', ['ngRoute']);
function error(data,status,header,config) {
  alert(data.data);

}

app.controller('ctrl', function($rootScope, $http) {

  $rootScope.loginCheck=function () {

    $http.post('/admin/ingresar', $rootScope.usuarioLogin)
      .then(function (res, status, headers, config) {

        $rootScope.usuario=res.data;
        console.log($rootScope.usuario);

      },function () {

      });



  }

  $rootScope.loginCheck();

});
