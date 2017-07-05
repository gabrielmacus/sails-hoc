/**
 * Created by Gabriel on 03/07/2017.
 */


app.controller('songListController', function($rootScope, $location,ngAudio) {


  $rootScope.$watch('player',function (a,b) {

    console.log(a);
    console.log(b);
  });
  /*
  $rootScope.$watchCollection('playlist', function(playlistNueva,playlistVieja) {

    var l = playlistNueva.length;
    if(l>0)
    {

      var lastSong=playlistNueva[l-1];
      $rootScope.player = ngAudio.load(lastSong);
      $rootScope.player.play(
        function () {



        }
      );

      $rootScope.player.complete();
      console.log( $rootScope.player );

    }

  });
  */
  if(! $rootScope.player)
  {
    $rootScope.player={};
  }
  $rootScope.notEmpty=function (obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
        return true;
    }

    return JSON.stringify(obj) !== JSON.stringify({});


  }
  $rootScope.play=function (p) {

    var id =p.id
    p.selected=false;

    $.ajax(
      {
        method:"get",
        dataType:"json",
      url:mainUrl+"/youtube/link/"+id,
        success:function (res) {
          //$rootScope.player = ngAudio.load(res);
        //  console.log($rootScope.player);

         // $rootScope.playlist.push(res);

          $rootScope.player.play(res);


          $rootScope.$apply();

        },
        error:error
      }
    );

  }

  $rootScope.toggleSong=function(p)
  {
    if(!p.selected)
    {
      p.selected=true;
    }
    else
    {
      p.selected=false;
    }

  };

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
