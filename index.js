var express = require('express')
var app = express()
var log = require('winston')
log.level = 'info'
var Atom = require('./atom')
var atom = new Atom()


app.get('/next/:who',  function (req, res) {
    atom.nextIntegerAtomic(req.params.who).then((result)=>{
      res.json({result})
    }).catch((error)=>{
      log.info(`something went wrong ${error}`)
      res.json({error})
    })
})
app.listen(3005)
