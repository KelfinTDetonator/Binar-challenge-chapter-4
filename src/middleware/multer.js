const multer = require('multer')
const path = require('path')

const filename = (req, file, cb) => {
    const filename = Date.now() * path.extname(file.originalname)
    cb(null, filename)
}

const generateStore = (destination) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null,destination)
        },
        filename
    })
}

module.exports = {
    image: multer({
        storage: generateStore('../public/images'),
        fileFilter: (req, file, cb) => {
            
        }
    })
}