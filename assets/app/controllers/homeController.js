/**
 * Created by Gabriel on 03/07/2017.
 */
app.controller('homeController', function($rootScope, $location) {

$rootScope.search=function () {

  $.ajax(
    {
      method:"get",
      dataType:"json",
      url:"http://localhost:1337/youtube/search",
      data:$rootScope.search,
      success:function (res) {

        $rootScope.playlist= res;
        $location.path( "/playlist" );
        $rootScope.$apply();

      },
      error:error
    }
  );
}


});
