/**
 * Created by Puers on 03/07/2017.
 */
var cheerio = require("cheerio");
const request = require("request");
module.exports=
{
  search:function(q,p,callback)
  {



    request(`https://www.youtube.com/results?search_query=${q}&p=${p}&sp=EgIQAQ%253D%253D`, function(error, response, body) {

      if(error)
      {
        return res.negotiate(error);

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
  }
}
