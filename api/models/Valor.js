/**
 * Created by Puers on 29/06/2017.
 */

const crypto = require('crypto');

module.exports = {

  attributes:
  {
    monto:{type:"float",required:true},
    moneda:{model:'Moneda', unique: true}
  }

};
