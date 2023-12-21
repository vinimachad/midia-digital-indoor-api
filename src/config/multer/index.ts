import multer from 'multer'

const multerStorage = multer.diskStorage({
  destination: './upload',
  filename(req, file, callback) {
    callback(null, file.originalname)
  }
})

export default multerStorage
