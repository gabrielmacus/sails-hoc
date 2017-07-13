/**
 * Created by Puers on 02/07/2017.
 */

const del = require('del');
const fx = require('mkdir-recursive');
const fs = require('fs-extra');
const path=require('path');
const easyimg = require('easyimage');
const dateFormat = require('dateformat');
module.exports=
{

  subirArchivo:function(path,files,callback)
  {
    fx.mkdir(path, function(err) {

      if (err) {


        callback({error:"subidaArchivis.errorGuardando",code:500});

      }

    files.upload({
        // don't allow the total upload size to exceed ~10MB
//    maxBytes: 10000000,
        dirname:path
      }, function whenDone(err, uploadedFiles) {

        callback(err,uploadedFiles);


      });



    });
  },
  guardarArchivos:function (files,req,callback) {


      var now=new Date();

      var fechadir=dateFormat(now, "yyyy/mm/dd");

      //Si subo al sistema de archivos


      var i=0;

      var file={};

      function saveArchivo() {
        archivo.usuario = req.session.userId;
        if(archivo.id)
        {

          Archivo.update({id:archivo.id},archivo).exec(modelCallback);

        }
        else
        {

          Archivo.create(archivo).exec(modelCallback);
        }

      }
      function deleteArchivo() {

        Archivo.destroy({id:file.id}).exec(modelCallback);

      }

      var modelCallback=function (err, records)
      {

        if(err)
        {


          callback({error:"subidaArchivos.archivosNoGuardados",code:400});


          //   throw err;
        }

        if(i==files.length)
        {

          callback(records);


        }
        else
        {
          loopFiles();
        }


      }

      var repositorio;
      var loopFiles =function () {
        file=files[i];
        if(file.repositorio)
        {
          repositorio = file.repositorio.id;
        }
        else
        {
          repositorio = req.param("repositorio");
        }

        i++;

         carpeta=`assets/${repositorio.carpetaDeGuardado}/${fechadir}`;
         dirname= path.resolve(sails.config.appPath,carpeta);

        if(file.url || file.delete)
        {

          if(repositorio.ftp)
          {

          }
          else
          {
            if(!file.delete)
            {  var nombreArchivo=file.filename;

              var ruta=`${fechadir}/${nombreArchivo}`;

              var newDir=path.resolve(dirname,nombreArchivo);
              file.tmpName= file.url;

              file.tmpName = file.tmpName.split("/");
              file.tmpName =  file.tmpName[file.tmpName.length-1];

              var oldDir= sails.config.appPath+"/.tmp/public/media/"+file.tmpName;


            }

            /** Elimino las versiones viejas si las hay**/

            if(file.versiones)
            {
              var oldVersions =[];

              for(var k in file.versiones)
              {
                oldVersions.push( path.join(process.cwd()+"/assets",repositorio.carpetaDeGuardado+file.versiones[k].url));

              }

              del(oldVersions).then(paths => {



                if(paths.length==0)
                {
                  callback({error:"subidaArchivos.errorEliminando",code:500});

                }

                if(!file.delete)
                {
                  createVersions();
                }
                else
                {
                  deleteArchivo();
                }

              });



            }
            else
            {
              createVersions();
            }


            /*** ***/

            function createVersions() {
              /** Creo las versiones nuevas **/
              var versiones={};
              versiones["original"]={};
              versiones["original"]["url"]=ruta;

              /** **/

              var copyOriginal=function () {

                fs.copy( oldDir, newDir)
                  .then(function () {
                    archivo={versiones:versiones,repositorio:req.param("repositorio"),nombre:file.nombre,descripcion:file.descripcion,peso:file.size};




                    if(file.id)
                    {
                      archivo.id=file.id;
                    }
                    saveArchivo();

                  })
                  .catch(function (err) {

                    callback({error:"subidaArchivos.archivoError",code:500});

                  });
              }

              var cut=0;
              var makeCut=function ()
              {


                if(cut==repositorio.versionesImagenes.length)
                {
                  //Luego de hacer los cortes, copio la original
                  copyOriginal();
                }
                else
                {  var version =repositorio.versionesImagenes[cut];



                  var versionPath=`${fechadir}/${version.nombre}_${nombreArchivo}`;
                  var cutPath=path.join(process.cwd()+"/assets/"+repositorio.carpetaDeGuardado,versionPath);

                  easyimg.rescrop({
                    src:oldDir, dst:cutPath,
                    width:version.width, height:version.height
                  }).then(
                    function(image) {
                      versiones[version.nombre]={};
                      versiones[version.nombre]["url"]=versionPath;
                      makeCut();

                    },
                    function (err) {
                      callback({error:"subidaArchivos.errorAlCortarImagen",code:500});

                    }
                  );



                }

                cut++;






              }

              var ext= path.extname(file.filename);
              if(repositorio.versionesImagenes  && ArchivoService.verTipo(ext)== 'image') {
                //Cortes de imagenes
                makeCut();


              }
              else
              {
                copyOriginal();
              }





            }

          }


        }
        else
        {
          archivo={id:file.id,repositorio:req.param("repositorio"),nombre:file.nombre,descripcion:file.descripcion,peso:file.size};
          saveArchivo();


        }


      }





      loopFiles();





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
