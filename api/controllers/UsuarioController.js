/**
 * Created by Puers on 28/06/2017.
 */

const crypto = require('crypto');
const async = require("async");

module.exports=
{

  registrar:function(req,res)
  {


    var usuario=req.allParams();

    usuario.nivel=1;

    Usuario.create(usuario).exec(function (err, records) {

      if(err)
      {
        return res.negotiate(err);

        //   throw err;
      }

      UsuarioService.enviarConfirmacion(req,res,records);

      res.json(records);

    });
    //UsuarioService.enviarConfirmacion(req,res);
  },
  confirmar:function(req,res){
   var hash= req.param("hash");

    Usuario.update({codigoConfirmacion:hash,estado:1},{estado:2},function(err,result)
    {
      if(err)
      {
        return res.negotiate(err);

      }

      var template="";

      if(result.length === 0)
      {
        template="yaFueConfirmado";
      }
      else
      {
        template="exito";
      }

      res.view(`confirmacionEmail/${template}`,{"usuario":result[0],"layout":'layouts/layout',"bodyClasses":['usuario-confirmado']});
    });
  },
  ingresar:function(req,res)
  {


    async.waterfall([
      function(callback) {

        if(req.cookies._tk && (!req.param("nombreUsuario")|| !req.param("contrasena")))
        {
          console.log(req.cookies._tk);
          WebTokenService.verificarToken(req.cookies._tk,function(err,result){


            if(err)
            {
              res.forbidden(res.i18n("usuario.sesionInvalida"));
            }
            else
            {
              res.json(result);
            }

          });
        }
        else
        {

          callback();
        }



      },
      function(arg1, arg2, callback) {

        //No esta logueado o el token es invalido
        var hash=crypto.createHash(sails.config.hashAlgo);
        hash.update(req.param("contrasena"));
        var contrasena=hash.digest('hex');
        Usuario.find({or:[{email:req.param("nombreUsuario")},{nombreUsuario:req.param("nombreUsuario")}],contrasena:contrasena},function(err,results){


          if(err)
          {
            return res.negotiate(err);

            //   throw err;
          }
          if (results.length==0) {
            return res.forbidden(req.__("usuario.datosIncorrectos"));
          }

          //No esta activo
          if(results[0].estado!=2)
          {
            return res.forbidden(req.__("usuario.inactivo"));
          }

          var user = results[0];
          delete user.contrasena;
          delete user.codigoConfirmacion;
          delete user.nivel;
          delete user.estado;
          var token=  WebTokenService.generarToken(user);

          console.log(token);

          res.cookie('_tk',token);

          res.json(user);


        });
      }
    ], function (err, result) {
      // result now equals 'done'
    });








  }
}
