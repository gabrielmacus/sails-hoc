
/**
 * Created by Gabriel on 07/07/2017.
 */
var app = angular.module('app', ['ngRoute']);
function error(data,status,header,config) {
  alert(data.data);

}
app.controller('mainController',['$rootScope','$http', function($rootScope, $http)  {

    $rootScope.search={};
  $rootScope.loginCheck=function () {

    $http.post('/ingresar', $rootScope.usuarioLogin)
      .then(function (res, status, headers, config) {

        $rootScope.usuario=res.data;

      },function () {

      });



  }

  $rootScope.loginCheck();

}]);
