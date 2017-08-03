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
  //idSeccionPrincipal:"595f9a0306394c041633462e",
  nivelUsuarioPanel:"5",
  nivelUsuarioClasificados:
  {
    create:"5",
    read:"5",
    update:"5",
    delete:"7"
  },
  nivelSuperadmin:"10",
  nivelUsuarioUsuarios:{
    create:"5",
    read:"5",
    update:"5",
    delete:"7"
  },
  facebook:
  {

    version:'2.8',
    id:'1874200559512926',
    secret:'28f2d83d08132603be62ab63435d4618',
    token:'EAAaok1KWbV4BAOXetfRu6PVwosG0Cks99wQ646UeweJHakZBUTpCfvdI336S7yfzkx9u3dY8BeU1wfjaj3G1nTmYESEb9qguCG6JbPPQ473jwDE7CW3PH1mqebEb8exFp8PLQWpIt8jD75gxn3yswZCV5VJxgZD'
    //Expira en 60 dias, desde el 03.08.17

  }
};
