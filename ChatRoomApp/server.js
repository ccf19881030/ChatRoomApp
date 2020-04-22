const io = require('socket.io')(3000)
const usersList = {}

io.on('connection', socket => {
  socket.on('new-user', userName => {
    usersList[socket.id] = userName
    socket.broadcast.emit('user-connected', userName)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, 
        userName: usersList[socket.id]} )
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', usersList[socket.id])
    delete usersList[socket.id]
  })
})