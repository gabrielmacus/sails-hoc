/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  /*
  '/': {
    view: 'homepage'
  },*/
  'POST /registrar/usuario': 'UsuarioController.registrar',
  'get /confirmar/usuario/:hash':'UsuarioController.confirmar',
  'get /salir':'UsuarioController.salir',
  'POST /ingresar':'UsuarioController.ingresar',
  'get /usuario':"UsuarioController.find",
  'get /perfil':'PerfilController.index',

  //'get /nuevo/clasificado':'ClasificadoController.save',
  'POST /clasificado':'ClasificadoController.guardar',

  'POST /facebook/post/image':'FacebookController.postImage',
  'POST /facebook/get/longToken':'FacebookController.getLongToken',
  'GET /facebook/driverpost/image/':'FacebookController.postImageSelenium',


  'get /':'HomeController.index',

  'get /secciones/arbol':'SeccionController.getArbol',
  'get /youtube/link/:video':"YoutubeController.getLink",
  'get /youtube/download/:video':"YoutubeController.download",


  'get /admin':"PanelController.index",
  'POST /admin/ingresar':"UsuarioController.ingresarPanel",

  'get /views/:view':"PanelController.loadView",

  'POST /subida/temporal':"ArchivoController.subirTmp",
  'POST /guardar/archivo':"ArchivoController.guardar",

  'POST /usuario/:id':'UsuarioController.guardar',
  'POST /usuario':'UsuarioController.guardar'

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
