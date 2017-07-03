/**
 * Created by Puers on 02/07/2017.
 */
const path=require('path');
const dateFormat = require('dateformat');

module.exports=
{
  subir:function (req, res) {

    console.log(req.param("repositorio"));
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

}
}
