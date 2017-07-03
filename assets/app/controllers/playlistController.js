/**
 * Created by Gabriel on 03/07/2017.
 */


app.controller('playlistController', function($rootScope, $location) {
  if(! $rootScope.player)
  {
    $rootScope.player={};
  }

  $rootScope.play=function (id) {

    $.ajax(
      {
        method:"get",
        dataType:"json",
      url:"http://localhost:1337/youtube/link/"+id,
        success:function (res) {

          $rootScope.player.src=res;

          $rootScope.$apply();

        },
        error:error
      }
    );

  }


  $rootScope.end=function () {
    console.log("data");
  }
});
