/**
 * Created by Puers on 02/07/2017.
 */
const path=require('path');
const dateFormat = require('dateformat');
const fs = require('fs-extra');
const async = require("async");
const pager = require('sails-pager');


module.exports=
{

  subirTmp:function (req,res) {

    var dirname= path.resolve(sails.config.appPath,".tmp/public/media");
    var files=  req.file('files');

    ArchivoService.subirArchivo(dirname,files,function(err,result) {
      if(err)
      {
        return res.negotiate(err);

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

  guardar:function (req, res) {

    Repositorio.find({id:req.param("repositorio")}, function (err,result) {

      if(err)
      {
        return res.negotiate(err);

        //   throw err;
      }

      if(result.length==0)
      {
        return res.badRequest(res.i18n("subidaArchivos.noExisteRepositorio"));

      }

      var repositorio =result[0];

      var now=new Date();

      var fechadir=dateFormat(now, "yyyy/mm/dd");


      if(repositorio.ftp){

      }
      else
      {
        //Si subo al sistema de archivos

        var carpeta=`assets/${repositorio.carpetaDeGuardado}/${fechadir}`;
        var dirname= path.resolve(sails.config.appPath,carpeta);
        var files=  req.param('archivos');

        var i=0;

        function saveArchivo() {

          if(archivo.id)
          {
            Archivo.update({id:archivo.id},archivo).exec(modelCallback);

          }
          else
          {
            Archivo.create(archivo).exec(modelCallback);
          }

        }

          function modelCallback (err, records)
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

        function loopFiles() {
          var file=files[i];
          i++;


          if(file.url)
          {
            var nombreArchivo=file.filename;

            var ruta=`${fechadir}/${nombreArchivo}`;

            var newDir=path.resolve(dirname,nombreArchivo);
            file.tmpName= file.url;

            file.tmpName = file.tmpName.split("/");
            file.tmpName =  file.tmpName[file.tmpName.length-1];

            var oldDir= sails.config.appPath+"/.tmp/public/media/"+file.tmpName;

            var versiones={};

            versiones["original"]=ruta;



            fs.copy( oldDir, newDir)
              .then(function () {
                archivo={versiones:versiones,repositorio:req.param("repositorio"),nombre:file.nombre,descripcion:file.descripcion,peso:file.size};

                saveArchivo();

              })
              .catch(function (err) {
                return res.serverError(res.__("subidaArchivos.archivoError"));
              });

          }
          else
          {
            archivo={id:file.id,repositorio:req.param("repositorio"),nombre:file.nombre,descripcion:file.descripcion,peso:file.size};
            saveArchivo();

          }


        }





        loopFiles();


        //res.json(result);
      }




    });

  },

  _guardar:function (req, res) {

    Repositorio.find({id:req.param("repositorio")}, function (err,result) {

      if(err)
      {
        return res.negotiate(err);

        //   throw err;
      }

      if(result.length==0)
      {
        return res.badRequest(res.i18n("subidaArchivos.noExisteRepositorio"));

      }

      var repositorio =result[0];

      var now=new Date();

      var fechadir=dateFormat(now, "yyyy/mm/dd");


      if(repositorio.ftp){

      }
      else
      {
        //Si subo al sistema de archivos

        var carpeta=`assets/${repositorio.carpetaDeGuardado}/${fechadir}`;
        var dirname= path.resolve(sails.config.appPath,carpeta);
        var files=  req.param('archivos');


        var archivos=[];

        async.waterfall([
          function(callback) {
            for (var i=0;i<files.length;i++)
            {

              var file=files[i];

              var nombreArchivo=file.filename;

              var ruta=`${fechadir}/${nombreArchivo}`;

              var newDir=path.resolve(dirname,nombreArchivo);
              file.tmpName= file.url;

              file.tmpName = file.tmpName.split("/");
              file.tmpName =  file.tmpName[file.tmpName.length-1];

              var oldDir= sails.config.appPath+"/.tmp/public/media/"+file.tmpName;

              var versiones={};

              versiones["original"]=ruta;



              fs.copy( oldDir, newDir)
                .then(function () {
                  var archivo={versiones:versiones,repositorio:req.param("repositorio"),nombre:file.nombre,descripcion:file.descripcion,peso:file.size};
                  console.log(archivos);
                  archivos.push(archivo);

                  if(i==files.length)
                  {

                    if(archivos.length>0)
                    {
                      Archivo.create(archivos).exec(function (err, records) {

                        if(err)
                        {
                          return res.negotiate(err);

                          //   throw err;
                        }

                        res.json(records);



                      });

                    }
                    else
                    {
                      return res.badRequest(res.i18n("subidaArchivos.archivosNoGuardados"));
                    }

                  }


                })
                .catch(function (err) {
                  return res.serverError(res.__("subidaArchivos.archivoError"));
                })


            }




          },
          function(arg1, arg2, callback) {

          }
        ], function (err, result) {
          // result now equals 'done'
        });





        //res.json(result);
      }




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


  }
}
