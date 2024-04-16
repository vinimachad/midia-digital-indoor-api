import 'express-async-errors'
import 'dotenv/config'
import './config/module-alias'
import SocketIoService from '@configs/socket-io'
import subscriptionRouter from '@modules/subscription/router'
import useErrors from '@shared/middlewares/error/use-errors'
import cors from 'cors'
import express from 'express'
import fileUpload from 'express-fileupload'
import { createServer } from 'http'
import routes from './routes'

const app = express()
app.use('*', cors())
app.use(subscriptionRouter)
app.use(express.json())
app.use(fileUpload())
app.use(routes)
app.use(useErrors)
const server = createServer(app)
SocketIoService(server)
server.listen(process.env.PORT || 8080, async () => {
  console.log('| -------------------------------- |')
  console.log('| server started ✅                |')
})
