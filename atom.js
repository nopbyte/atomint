var level = require('level');
var Transaction = require('level-transactions');
var log = require('winston')

var Atom = function(){
  this.db = level('./ids')

}


Atom.prototype.nextIntegerAtomic = function(who){

  var transaction = new Transaction(this.db)
  var k = -1;
  return new Promise(function (resolve, reject) {
    if(!who){
      reject('need to provide a string to assign id to entity')
    } else {
      transaction.createReadStream()
      .on('data', function (data) {
          if (parseInt(data.key) > k){
              k = parseInt(data.key)
          }
        })
        .on('error', function (err) {
          log.error(err);
          transaction.rollback(reject.bind(this, err));
        })
        .on('end', function () {
          log.info('resolving array after query with ' + k);
          transaction.put(k+1, who, function(err){
            if(err){
              reject(err)
            } else {
              transaction.commit(resolve.bind(this, k+1));
            }
          })
        });
    }
  });

}


module.exports = Atom
