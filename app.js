const express = require('express')
var socket = require('socket.io')

const app = express()

app.use(express.static("./public"))

var server = app.listen(5000, () => {
  console.log(`Server listening on port:5000...`)
})

var io = socket(server)

io.on('connection', (socket) => {
  console.log("Connection made")

  socket.on('update', (data) => {
    socket.broadcast.emit('update', data)
  })
})