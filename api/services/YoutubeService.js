/**
 * Created by Puers on 03/07/2017.
 */
var cheerio = require("cheerio");
var youtubedl = require('youtube-dl');
const request = require("request");
module.exports=
{
  search:function(q,p,callback)
  {



    request(`https://www.youtube.com/results?search_query=${q}&p=${p}&sp=EgIQAQ%253D%253D`, function(error, response, body) {

      if(error)
      {

        return  callback({code:500,error:"youtube.errorLink"});
       // return res.negotiate(error);

        //   throw err;
      }


      var $ = cheerio.load(body);

      var videos={};

      $(".yt-lockup").each(function() {
        var titulo = $(this).find(".yt-lockup-content .yt-lockup-title  > a").text();
        var id=$(this).find(".yt-lockup-content  .yt-lockup-title  > a").attr("href");

        id = id.split("=");
        id = id[id.length-1];
        var thumbnail=`http://img.youtube.com/vi/${id}/0.jpg`;

        var video={titulo:titulo,id:id,thumbnail:thumbnail};
        videos[id]=video;
      });


      callback(videos);

    });
  },
  getLink: function (id,callback) {
    var proxyIp='http://95.67.57.54:3129';
    var args=['--proxy', proxyIp];
    var video = youtubedl(`http://www.youtube.com/watch?v=${id}`);

//      var video = youtubedl(`http://www.youtube.com/watch?v=${req.param("video")}`);
    video.on('info', function(info) {

      if(info)
      {
        var arr=info.formats.filter(
          function(el){
            return el.format.includes("audio only")
          }
        );
        if(arr.length==0 & info.formats.length>0)
        {


          arr= [info.formats[0]];
        }

        console.log(info);
        if(arr.length>0)
        {
          var audio=  arr[0];



          if(audio)
          {
            return  callback({"url":audio.url,"title":info.title+"."+audio.ext});
          }
          else
          {

            return  callback({code:500,error:"youtube.errorLink"});
            //res.serverError(res.i18n("youtube.errorLink"));
          }

        }
        else
        {
          return callback({code:500,error:"youtube.errorLink"});
         // res.serverError(res.i18n("youtube.errorLink"));
        }

      }
      else
      {

       return  callback({code:500,error:"youtube.noHayFormatos"});
        //res.i18n("youtube.noHayFormatos");
      }


    });
    video.on("error",function (err) {

      console.log(err);

    });
  }
}
