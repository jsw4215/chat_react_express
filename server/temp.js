const express = require('express')

const http = require('http')
const socketio = require('socket.io')

const cors = require('cors')
const router = require('./router')

const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
})

app.use(cors());
app.use(router);
io.on('connection', (socket) => {
  console.log('새로운 connectoin이 발생하였습니다.')
  socket.on('join', ({ name, room }, callback) => {})
  socket.on('disconnect', () => {
    console.log('유저가 떠났어요.')
  })
})
server.listen(PORT, () => console.log(`서버가 ${PORT} 에서 시작되었어요`))
