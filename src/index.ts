import 'express-async-errors'
import 'dotenv/config'
import './config/module-alias'
import fileUpload from 'express-fileupload'
import express from 'express'
import routes from './routes'
import 'express-async-errors'
import cors from 'cors'
import useErrors from '@middlewares/error/use-errors'

const app = express()
app.use('*', cors())
app.use(express.json())
app.use(fileUpload())
app.use(routes)
app.use(useErrors)

app.listen(process.env.PORT || 8080, async () => {
  console.log('| -------------------------------- |')
  console.log('| server started ✅                |')
})
