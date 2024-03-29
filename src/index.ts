import 'express-async-errors'
import 'dotenv/config'
import './config/module-alias'
import fileUpload from 'express-fileupload'
import express from 'express'
import routes from './routes'
import cors from 'cors'
import useErrors from '@middlewares/error/use-errors'
import stripeRouter from '@routes/stripe-routes'
import { createServer } from 'http'
import SocketIoService from '@configs/socket-io'
import { Server } from 'socket.io'

const app = express()
app.use('*', cors())
app.use(stripeRouter)
app.use(express.json())
app.use(fileUpload())
app.use(routes)
app.use(useErrors)
const server = createServer(app)

const io = new Server(server, {
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

server.listen(process.env.PORT || 8080, async () => {
  console.log('| -------------------------------- |')
  console.log('| server started ✅                |')
})
