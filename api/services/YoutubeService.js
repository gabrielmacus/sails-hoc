/**
 * Created by Puers on 03/07/2017.
 */
var cheerio = require("cheerio");
const request = require("request");
module.exports=
{
  search:function(q,callback)
  {



    request(`https://www.youtube.com/results?search_query=${q}&sp=EgIQAQ%253D%253D`, function(error, response, body) {

      if(error)
      {
        return res.negotiate(error);

        //   throw err;
      }


      var $ = cheerio.load(body);

      var videos=[];

      $(".yt-lockup-content").each(function() {
        var titulo = $(this).find(".yt-lockup-title  > a").text();
        var id=$(this).find(".yt-lockup-title  > a").attr("href");
        id = id.split("=");
        id = id[link.length-1];

        videos.push({titulo:titulo,id:id});
      });


      callback(videos);

    });
  }
}
