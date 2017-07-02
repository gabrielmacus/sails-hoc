/**
 * Created by Puers on 02/07/2017.
 */
const fx = require('mkdir-recursive');
module.exports=
{

  subirArchivo:function(path)
  {
    fx.mkdir(dirname, function(err) {

      if (err) {
        return res.negotiate(err);
      }

      req.file('files').upload({
        // don't allow the total upload size to exceed ~10MB
//    maxBytes: 10000000,
        dirname:dirname
      }, function whenDone(err, uploadedFiles) {
        if (err) {
          return res.negotiate(err);
        }

        // If no files were uploaded, respond with an error.
        if (uploadedFiles.length === 0) {
          return res.badRequest('No file was uploaded');
        }

        return res.ok();

      });



    });
  }

}
