/**
 * Created by Puers on 02/07/2017.
 */
const path=require('path');
const dateFormat = require('dateformat');
const fs = require('fs-extra')
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
  _subir:function (req, res) {

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


        if (repositorio.filesystem)
        {
          //Si subo al sistema de archivos

          var carpeta=`assets/${repositorio.filesystem.carpetaDeGuardado}/${fechadir}`;
          var dirname= path.resolve(sails.config.appPath,carpeta);
          var files=  req.file('files');

          ArchivoService.subirArchivo(dirname,files,function(err,result){

            // If no files were uploaded, respond with an error.
            if (result.length === 0) {
              return res.badRequest(res.i18n("subidaArchivos.archivosNoSubidos"));
            }

            var archivos=[];

           for (var i=0;i<result.length;i++)
           {

             var r = result[i];

             var nombreArchivo=r.fd.split("\\");

             nombreArchivo = nombreArchivo[nombreArchivo.length-1];
             var archivo={ruta:`${fechadir}/${nombreArchivo}`,repositorio:req.param("repositorio"),nombre:req.param("nombre"),descripcion:req.param("descripcion"),peso:r["size"],nombreArchivo:r["filename"]};

             archivos.push(archivo);

           }



            Archivo.create(archivos).exec(function (err, records) {

              if(err)
              {
                return res.negotiate(err);

                //   throw err;
              }



            });

            //res.json(result);

          });
        }
      else if(repositorio.ftp)
        {
          //si subo por ftp
        }




    });

},


  subir:function (req, res) {

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


      if (repositorio.filesystem)
      {
        //Si subo al sistema de archivos

        var carpeta=`assets/${repositorio.filesystem.carpetaDeGuardado}/${fechadir}`;
        var dirname= path.resolve(sails.config.appPath,carpeta);
        var files=  req.param('archivos');

        console.log(files);

        var archivos=[];

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
          console.log(oldDir+" "+newDir);



          fs.copy( oldDir, newDir)
            .then(function () {
              var archivo={ruta:ruta,repositorio:req.param("repositorio"),nombre:file.nombre,descripcion:file.descripcion,peso:file.size};

              archivos.push(archivo);


              console.log(i);
              if(i==files.length)
              {
                console.log("Llega acá??");
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




        //res.json(result);
      }
      else if(repositorio.ftp)
      {
        //si subo por ftp
      }




    });

  }
}
