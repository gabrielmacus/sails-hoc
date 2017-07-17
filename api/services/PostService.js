/**
 * Created by Gabriel on 17/07/2017.
 */

const async = require("async");
const pager = require('sails-pager');
const asyncLoop = require('node-async-loop');
module.exports=
{
  _find:function (perPage,currentPage,where,cb) {
    try
    {
      var conditions =(where)?JSON.parse(where):{};
    }
    catch (e)
    {
      var conditions ={};
    }


    var elementosAsociados=[{name: 'posts', query: {}}];

    async.waterfall([
      function (callback) {
        //Pagino los resultados

      },
      function (records,callback) {

        //Busco las asociaciones

        var ids=[];
        var posts = {};



        records.data.forEach(function (post,indice) {
          ids.push(post.id);
          posts[post.id]=post;

        });


        PostPost.find({_post:ids},function (err,results) {

          if(err)
          {
            cb({code:500,error:"post.errorAsociados"});
          }

          callback(null,posts,results);


        });
      },
      function (posts,results) {
        //Asocio

        results.forEach(function (valor,clave) {
          var indice= valor._post;
          var postAsociadoId=valor.post;

          delete valor.post;
          delete valor._post;
          valor._id= valor.id;
          delete valor.id;


          if( posts[indice].posts)
          {

            var idx= posts[indice].posts.findIndex(
              function (v) {

                return v.id==postAsociadoId;

              }
            );

            Object.assign(posts[indice].posts[idx],valor);


          }

        });



        cb(posts);




      }
    ]);

  },


  find:function (perPage,currentPage,where,cb) {
    try
    {
      var conditions =(where)?JSON.parse(where):{};
    }
    catch (e)
    {
      var conditions ={};
    }

    var elementosAsociados=[{name: 'posts', query: {}}];

    pager.paginate(Post, conditions, currentPage, perPage, elementosAsociados).then(function(records){

    PostService.populate(records.data,function (result) {

      cb(result);


    });

    }).catch(function(err) {

      console.log(err);

      cb({code:500,error:"post.errorMostrando"});
      //res.negotiate(err);

    });
  },


  populate:function (postsArray,cb) {

    var posts={};
    var ids=[];
    postsArray.forEach(function (post,indice) {

      ids.push(post.id);
      posts[post.id]= post;

    });

    async.waterfall([
      function(callback)
      {
        PostPost.find({_post:ids},function (err,asociaciones) {

          if(err)
          {
            cb({code:500,error:"post.errorAsociados"});
          }

          callback(null,asociaciones,posts);

        });
      },
      function(asociaciones,posts,callback)
      {
        asociaciones.forEach(function (valor,clave) {
          var indice= valor._post;
          var postAsociadoId=valor.post;

          delete valor.post;
          delete valor._post;
          valor._id= valor.id;
          delete valor.id;


          if( posts[indice].posts)
          {

            var idx= posts[indice].posts.findIndex(
              function (v) {

                return v.id==postAsociadoId;

              }
            );

            Object.assign(posts[indice].posts[idx],valor);



          }

        });

        asyncLoop(posts,function (post,next) {


          if(posts[post.key].posts)
          {

            asyncLoop(posts[post.key].posts,function (post2,next2) {


              if(post2.value.posts)
              {
                PostService.populate(post2.value.posts, function (results) {

                  posts[post.key].posts[post2.key]=results;

                  next2();

                });
              }




            }
            ,function () {


                next();

              });

          }



        },function () {

          return res.json(savedFiles);

        });








      }
    ]);






  }
}
