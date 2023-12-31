const path  = require("path")
const fs = require("fs")
const crypto  = require("crypto")

function createFolderToGroupFiles(req, res, next) {
  const folderId = crypto.randomBytes(8).toString("hex")
  const pathComplete = path.resolve(__dirname, '..', 'tmp', folderId)

  if(!fs.existsSync(pathComplete)){
    fs.mkdirSync(pathComplete, { recursive: true })
  }
  req.folderId = folderId
  next()
}

module.exports = createFolderToGroupFiles