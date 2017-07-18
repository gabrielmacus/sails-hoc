function unflatten(arr) {
  var tree = [],
    mappedArr = {},
    arrElem,
    mappedElem;

  // First map the nodes of the array to an object -> create a hash table.
  for(var i = 0, len = arr.length; i < len; i++) {
    arrElem = arr[i];
    mappedArr[arrElem.id] = arrElem;
    mappedArr[arrElem.id]['secciones'] = [];
  }


  for (var id in mappedArr) {
    if (mappedArr.hasOwnProperty(id)) {
      mappedElem = mappedArr[id];
      // If the element is not at the root level, add it to its parent array of children.
      if (mappedElem.pertenece) {
        mappedArr[mappedElem['pertenece']]['secciones'].push(mappedElem);
      }
      // If the element is at the root level, add it to first level elements array.
      else {
        tree.push(mappedElem);
      }
    }
  }
  return tree;
}

module.exports =
{

  cargarArbolSecciones: function (results,callback) {


      var arbol=unflatten(results);

      callback(arbol);



  },
  verSeccionPrincipal: function (callback) {

    Seccion.find({principal:true},function (err,result) {


      var seccionPrincipal= (result.length>0)?result[0]:false;
      callback(err,seccionPrincipal);


    });

  }

};
