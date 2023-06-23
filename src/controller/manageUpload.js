const fs = require("fs")
const path = require("path")
const fillMnemonicos = require("../utils/createNewFile")

async function AnalyzeUpload (req, res) {
  try {
    const pathFoldersWithFilesCsv = path.resolve(__dirname, "..", "tmp", req.folderId)
    const listFiles = fs.readdirSync(pathFoldersWithFilesCsv, { recursive: true })

    const pathToInspectFiles = [
      `${pathFoldersWithFilesCsv}/${listFiles[1]}`,
      `${pathFoldersWithFilesCsv}/${listFiles[0]}`
    ]

    const file = await fillMnemonicos(pathToInspectFiles[0], pathToInspectFiles[1])

    fs.readdirSync(pathFoldersWithFilesCsv).forEach((arquivo) => {
      const caminhoCompleto = `${pathFoldersWithFilesCsv}/${arquivo}`;
      fs.unlinkSync(caminhoCompleto);
    });

    fs.rmdirSync(pathFoldersWithFilesCsv);
    return res.status(200).json({
      message: "Sucesso",
      file,
    })
  } catch(err) {
    return res.status(400).json({
      error: "Ocorreu uma excessão ao preparar o mapa, verifique se o mapa foi limpo!",
      literalError: String(err)
    })
  }
}

module.exports = AnalyzeUpload
