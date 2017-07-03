/**
 * Created by Puers on 02/07/2017.
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller



  Usuario.find({or:[{email:req.param("nombreUsuario")},{nombreUsuario:req.param("nombreUsuario")}]},function(err,results){


    if(err)
    {
      return res.negotiate(err);

      //   throw err;
    }
    if (results.length>0) {
      return res.forbidden(req.__("usuario.yaRegistrado"));
    }
    return next();

  });

};
