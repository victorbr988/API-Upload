const uploadRoutes = require("express").Router()
const multer = require("multer")
const multerConfig = require("./config/multer")
const createFolderToGroupFiles = require("./middleware/Folders")
const AnalyzeUpload = require("./controller/manageUpload")


uploadRoutes.post("/upload", createFolderToGroupFiles, multer(multerConfig).array("file"), AnalyzeUpload)

module.exports = uploadRoutes;