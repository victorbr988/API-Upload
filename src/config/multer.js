const multer = require("multer")
const path  = require("path")
const crypto  = require("crypto")

module.exports = {
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      const pathComplete = path.resolve(__dirname, '..', 'tmp', req.folderId)
      callback(null, pathComplete)
    },
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) callback(err);
        const filename = `${hash.toString("hex")}-${file.originalname}`

        callback(null, filename)
      })
    },
  }), 
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
};