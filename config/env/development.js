/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

   models: {
    connection: 'mongod',
    migrate: 'safe',
    schema: false //Si respeta los atributos del esquema o no. En produccion deberia estar en true

  }
  ,
  email:
  {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: "gabrielmacus@gmail.com",
      pass: 'Sercan02'
  }
  },
  salt:"qwerty",
  hashAlgo:"sha256",
  siteUrl:"http://localhost:1337",

  idSeccionPrincipal:"595f9a0306394c041633462e",
  nivelUsuarioPanel:"1"
};
