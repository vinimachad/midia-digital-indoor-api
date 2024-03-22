import { Server as HttpServer } from 'http'
import { Server } from 'socket.io'

export default function SocketIoService(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  })

  io.on('connection', (socket) => {
    socket.on('update_current_commercial', (data) => {
      socket.broadcast.emit('receive_updated_commercial', data)
    })
  })
}
