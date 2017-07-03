/**
 * Created by Puers on 02/07/2017.
 */
const fx = require('mkdir-recursive');
module.exports=
{

  subirArchivo:function(path,files,callback)
  {
    fx.mkdir(path, function(err) {

      if (err) {
        return res.negotiate(err);
      }

    files.upload({
        // don't allow the total upload size to exceed ~10MB
//    maxBytes: 10000000,
        dirname:path
      }, function whenDone(err, uploadedFiles) {

        callback(err,uploadedFiles);


      });



    });
  }

}
