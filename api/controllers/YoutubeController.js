/**
 * Created by Puers on 03/07/2017.
 */
var youtubedl = require('youtube-dl');
module.exports=
{
  search: function (req,res) {
    YoutubeService.search(req.param("q"), function (result) {

      res.json(result);

    });
  }
  ,
  getLink: function (req,res) {

    var video = youtubedl(`http://www.youtube.com/watch?v=${req.param("video")}`);
    video.on('info', function(info) {



    var audio=  info.formats.filter(
        function(el){
          return el.format.includes("audio only")
        }
      )[0];


      res.json(audio.url);


    });
  }
}
