/**
 * Created by Puers on 02/07/2017.
 */
const path=require('path');
const fs = require('fs-extra');
const pager = require('sails-pager');
const asyncLoop = require('node-async-loop');
const del = require('del');
const easyimg = require('easyimage');
const dateFormat = require('dateformat');

module.exports=
{
  //TODO implementar libreria de iteracion asincrona para mejorar codigo de guardado de archivos
//https://www.npmjs.com/package/node-async-loop
  subirTmp:function (req,res) {

    var dirname= path.resolve(sails.config.appPath,".tmp/public/media");
    var files=  req.file('files');

    ArchivoService.subirArchivo(dirname,files,function(err,result) {
      if(err)
      {
        return res.json(err.code,err.error);

        //   throw err;
      }

      // If no files were uploaded, respond with an error.
      if (result.length === 0) {
        return res.badRequest(res.i18n("subidaArchivos.archivosNoSubidos"));
      }

      result.forEach(function (valor,clave) {
        valor.url= valor.fd.split("\\");

        valor.url = "/media/"+valor.url[valor.url.length-1];
        delete valor.fd;
        valor.tmp=true;

        result[clave]=valor;

      });


      res.json(result);
    });
  },
  _guardar:function (req, res) {
  var files=  req.param('archivos');

  if(files && files.length>0)
  {


    var now=new Date();

    var fechadir=dateFormat(now, "yyyy/mm/dd");

    //Si subo al sistema de archivos

    var carpeta=`assets/${repositorio.carpetaDeGuardado}/${fechadir}`;
    var dirname= path.resolve(sails.config.appPath,carpeta);

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
        return res.badRequest(res.i18n("subidaArchivos.archivosNoGuardados"));

        //   throw err;
      }

      if(i==files.length)
      {
        return  res.json(records);

      }
      else
      {
        loopFiles();
      }


    }

    var repositorio;
    var loopFiles =function () {
      file=files[i];
      var repositorioCallback= function () {
        repositorio = file.repositorio.id;
        i++;


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
                  return res.serverError(res.i18n("subidaArchivos.errorEliminando"));
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
                    return res.serverError(res.__("subidaArchivos.archivoError"));
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

                      return  res.serverError("subidaArchivos.errorAlCortarImagen");
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

      if(file.repositorio.id)
      {
        repositorio =file.repositorio;
        repositorioCallback();

      }
      else
      {
        Repositorio.find({id:req.param("repositorio")},
          function (err, results) {

            if(err)
            {
             return res.serverError(res.__("repositorio.errorAlSeleccionar"));
            }

            repositorio =results[0];

            repositorioCallback();

          });
      }

        }





    loopFiles();


    //res.json(result);



  }
  else
  {
    res.badRequest(res.i18n("subidaArchivos.errorAlCortarImagen"));
  }

},
  guardar:function (req,res) {

    var files = req.param("archivos");
    var savedFiles=[];
    asyncLoop(files,function (file,next) {

      ArchivoService.guardar(file,req.session.userId,req.param("repositorio"),
        function (result) {

          if(result.error)
          {
            return res.json(result.code,res.i18n(result.error));
          }

          savedFiles.push(result);
          next();


        });




    },function () {

      return res.json(savedFiles);

    });



  }, 
  find:function (req,res) {

    var perPage = 24;
    var currentPage =(req.param("p"))?req.param("p"):1;
    try
    {
      var conditions =(req.param("where"))?JSON.parse(req.param("where")):{};
    }
    catch (e)
    {
      var conditions ={};
    }

    var elementosAsociados=[{name: 'repositorio', query: {}}];
    //Using Promises
    pager.paginate(Archivo, conditions, currentPage, perPage, elementosAsociados).then(function(records){


     res.json(records);
    }).catch(function(err) {

      res.negotiate(err);

    });


  },

}
