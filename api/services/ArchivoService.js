/**
 * Created by Puers on 02/07/2017.
 */

const del = require('del');
const fx = require('mkdir-recursive');
const fs = require('fs-extra');
const path=require('path');
const easyimg = require('easyimage');
const dateFormat = require('dateformat');
const async = require("async");
const asyncLoop = require('node-async-loop');

module.exports=
{

  subirArchivo:function(path,files,cb)
  {

    async.waterfall(
      [function (callback) {

        fs.ensureDir(path, function (err, result){

          if (err) {



            cb({error:"subidaArchivos.errorGuardando",code:500});
          }

          callback();

        });
      },

        function () {
          files.upload({
            // don't allow the total upload size to exceed ~10MB
//    maxBytes: 10000000,
            dirname:path
          }, function whenDone(err, uploadedFiles) {

            cb(err,uploadedFiles);


          });

        }]
    );




  },
  guardar:function (file,usuarioId,repositorio,cb) {

//Por ahora solo soporto subidas via sistema de archivos
    var now=new Date();

    if(!file.delete && file.url)
    {
      //Solo si estoy creando el archivo
      file.filename=now.getTime()+"_"+Math.random().toFixed(2)+path.extname(file.filename);

    }

    repositorioId= (file.repositorio && file.repositorio.id) ||repositorio ;
    fechadir=dateFormat(now, "yyyy/mm/dd");
    nombreArchivo=file.filename;
    nombreYruta=`${fechadir}/${nombreArchivo}`;

    if(!file.nombre)
    {
      file.nombre =file.filename;
    }

    var repositorioQuery= {id:repositorioId};

    async.waterfall([
      function(callback) {
        //Obtengo el repositorio del archivo
        Repositorio.find(repositorioQuery,function (err,results) {


          if(err)
          {
            return cb({code:500,error:"repositorio.errorAlSeleccionar"});
          }

          repositorio=results[0];
          carpeta=process.cwd()+"/assets/"+repositorio.carpetaDeGuardado;
          callback();

        })
      },
      function( callback) {



        if(file.url)
        {
          file.tmpName= file.url;
          file.tmpName = file.tmpName.split("/");
          file.tmpName =  file.tmpName[file.tmpName.length-1];
          tmpDir= path.join(sails.config.appPath,"/.tmp/public/media/"+file.tmpName);

          //Creo los cortes
          versiones={};
          versiones["original"]={};
          versiones["original"]["url"]=nombreYruta;
          ext= path.extname(file.filename);
          if(repositorio.versionesImagenes  && ArchivoService.verTipo(ext)== 'image')
          {


            asyncLoop(repositorio.versionesImagenes,function (item,next) {


              version = item;
              versionPath=`${fechadir}/${version.nombre}_${nombreArchivo}`;
              cutPath=path.join(carpeta,versionPath);



              easyimg.rescrop({
                src:tmpDir, dst:cutPath,
                width:version.width, height:version.height
              }).then(
                function(image) {
                  versiones[version.nombre]={};
                  versiones[version.nombre]["url"]=versionPath;
                  versiones[version.nombre]["meta"]=image;
                  next();

                },
                function (err) {
                  return  cb({error:"subidaArchivos.errorAlCortarImagen",code:500})
                }
              );

            },function (err) {

              if(err)
              {
                return  cb({error:"subidaArchivos.errorAlCortarImagen",code:500})
              }

              callback();

            });


          }
          else
          {
            callback();
          }
        }
        else
        {
          versiones=file.versiones;
          callback();
        }


      },
      function (callback) {
        if((file.url  || file.delete)&& file.versiones)
        {
          //Elimino las versiones existentes

            var oldVersions =[];

            for(var k in file.versiones)
            {
              oldVersions.push( path.join(carpeta,file.versiones[k].url));

            }


            del(oldVersions).then(paths => {

              console.log(paths);
              if(paths.length==0)
              {
               return cb({error:"subidaArchivos.errorEliminando",code:500});
              }
              callback();

            });





        }
        else
        {
          callback();
        }
      },
      function (callback)
      {
        if(file.url)
        {
          //Copio el archivo temporal a su destino
          newDir=path.join(carpeta,nombreYruta);

          fs.copy( tmpDir, newDir)
            .then(function () {


              callback();


            })
            .catch(function (err) {
              return cb({error:"subidaArchivos.archivoError",code:500})
            });
        }
        else
        {
          callback();
        }



      },
      function (callback)
      {

        //Guardo o creo los datos del archivo
        archivo={versiones:versiones,repositorio:repositorioId,nombre:file.nombre,descripcion:file.descripcion,peso:file.size};

        if(file.id)
        {
          archivo.id=file.id;
        }



        archivo.usuario = usuarioId;

        if(!file.delete)
        {
          if(archivo.id )
          {

            Archivo.update({id:archivo.id},archivo).exec(
              function (err,results) {

                callback(null,err,results);
              }
            );

          }
          else
          {


            Archivo.create(archivo).exec(  function (err,results) {



              callback(null,err,results);
            });
          }
        }
        else
        {
          //Elimino el archivo
          Archivo.destroy({id:archivo.id},function (err,results) {

            callback(null,err,results);

          });
        }



      },
      function (err,results) {



        if(err)
        {
          return cb({error:"subidaArchivos.archivosNoGuardados",code:500});

          //   throw err;
        }

        //Fin de la función
        return  cb(results);



      }
    ], function (err, result) {
      // result now equals 'done'
    });




  },
  verTipo:function (ext) {
    ext = ext.toLowerCase();
    switch (ext)
    {
      case '.jpg':
      case '.jpeg':
      case '.png':
      case '.gif':
      case '.bmp':

        return "image";
            break;
      default:

        return 'binary';

            break;
    }
  }

}
