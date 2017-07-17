/**
 * Created by Gabriel on 17/07/2017.
 */


const async = require("async");
const pager = require('sails-pager');

const asyncLoop = require('node-async-loop');
module.exports=
{
  find:function (req,res) {


    var perPage = 50;
    var currentPage =(req.param("p"))?req.param("p"):1;
    var where =req.param("where");
    PostService.find(perPage,currentPage,where,function (results) {

      
      if(results.error)
      {
       return  res.json(results.code,res.i18n(results.error));
      }

  return      res.json(results);
    });






  },
  create:function (req,res) {

    var post =req.allParams();

    Post.create(post,function (err,result) {


      if(err)
      {
        res.serverError(res.i18n("post.errorCreando"));
      }

      res.json(result);


    });

  }
}
