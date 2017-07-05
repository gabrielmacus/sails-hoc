/**
 * Created by Puers on 03/07/2017.
 */
var youtubedl = require('youtube-dl');
module.exports=
{
  search: function (req,res) {
    YoutubeService.search(req.param("q"),req.param("p"),function (result) {

      res.json(result);

    });
  }
  ,
  getLink: function (req,res) {



      var video = youtubedl(`http://www.youtube.com/watch?v=${req.param("video")}`);
      video.on('info', function(info) {


        var arr=info.formats.filter(
          function(el){
            return el.format.includes("audio only")
          }
        );

        if(arr.length==0 & info.formats.length>0)
        {

          arr= [info.formats[0]];
        }

        if(arr.length>0)
        {
          var audio=  arr[0];


          if(audio)
          {
            res.json(audio.url);
          }
          else
          {
            res.serverError(res.i18n("youtube.errorLink"));
          }

        }
        else
        {
          res.serverError(res.i18n("youtube.errorLink"));
        }




      });



  }
}
