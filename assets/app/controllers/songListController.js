/**
 * Created by Gabriel on 03/07/2017.
 */


app.controller('songListController', function($rootScope, $location,ngAudio) {

  $rootScope.$watchCollection('playlist', function(playlistNueva,playlistVieja) {

    var l = playlistNueva.length;
    if(l>0)
    {

      var lastSong=playlistNueva[l-1];
      $rootScope.player = ngAudio.play(lastSong);
      console.log(lastSong);

    }

  });
  if(! $rootScope.player)
  {
    $rootScope.player={};
  }

  $rootScope.play=function (id) {

    $.ajax(
      {
        method:"get",
        dataType:"json",
      url:mainUrl+"/youtube/link/"+id,
        success:function (res) {
          //$rootScope.player = ngAudio.load(res);
        //  console.log($rootScope.player);

          $rootScope.playlist.push(res);

          $rootScope.$apply();

        },
        error:error
      }
    );

  }


  $rootScope.end=function () {
    console.log("data");
  }
  $rootScope.getTime=function(seconds)
  {

  var s = Math.floor(seconds%60);
  var m = Math.floor((seconds*1000/(1000*60))%60);
  var strFormat = "MM:SS";

  if(s < 10) s = "0" + s;
  if(m < 10) m = "0" + m;
  strFormat = strFormat.replace(/MM/, m);
  strFormat = strFormat.replace(/SS/, s);

  return strFormat;

  }
});
