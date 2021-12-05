var _ = require('lodash')
var express = require('express')
var app = express()
var fs = require('fs')

app.use(express.json())
app.use(express.static('public'))
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  )
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})
app.get('/getUsers', (req, res) => {
  fs.readFile('./userData.json', function readFileCallback(err, data) {
    if (err) {
      console.log(err, 'no data')
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

app.put('/updateUser', (req, res) => {
  fs.readFile('./userData.json', function readFileCallback(err, data) {
    if (err) {
      console.log(err)
      res.send(err)
    } else {
      obj = JSON.parse(data)
      var index = _.findIndex(obj, { id: req.body.id })
      obj.splice(index, 1, {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        phone: req.body.phone,
      })
      json = JSON.stringify(obj)
      fs.writeFileSync('./userData.json', json)
      res.send('update successfully')
    }
  })
})

app.post('/addUser', (req, res) => {
  fs.readFile('./userData.json', function readFileCallback(err, data) {
    console.log(data)
    if (err) {
      console.log(err)
    } else {
      obj = JSON.parse(data)
      console.log(res.body)
      obj.push(req.body)
      json = JSON.stringify(obj)
      fs.writeFileSync('./userData.json', json)
      res.send('user added ')
    }
  })
})

var server = app.listen(5000, function () {
  console.log('up')
})
