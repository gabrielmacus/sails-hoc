/**
 * Created by Gabriel on 17/07/2017.
 */
module.exports=
{

  attributes:
  {
    titulo:{type:"string"},
    texto:{type:"text"},
    posts:{collection:"Post",via:'_post',through:'postpost'},
  //  _posts:{collection:"Post",via:'post',through:'postpost'},
   // archivos:{collection:'PostArchivo',via:'archivos',through:'postarchivo'}
  }

}
