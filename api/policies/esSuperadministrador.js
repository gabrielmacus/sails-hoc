/**
 * Created by Gabriel on 10/07/2017.
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  /*if (req.session.authenticated) {
   return next();
   }*/


  if(!req.session.nivel)
  {
    return res.forbidden(req.__("usuario.noAutenticado"));
  }

  if(req.session.nivel < sails.config.nivelSuperadmin)
  {

    // User is not allowed
    // (default res.forbidden() behavior can be overridden in `config/403.js`)
    return res.forbidden(req.__("panel.areaRestringida"));


  }


  return next();



};
