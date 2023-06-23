const readCSV = require("./readFile")
const writeCSV = require("./writeFile")

async function fillMnemonicos(principalMapping, secondaryMapping) {
  try {
    const principal = await readCSV(principalMapping);
    const secondary = await readCSV(secondaryMapping);

    if(principal[0]["Mnemônico"] === undefined) {
      throw Error("Mapa sem coluna Mnemônico")
    }

    for (let i = 0; i < principal.length; i++) {
      const recordPrincipal = principal[i];
      const uidPrincipal = recordPrincipal.UUID;

      const recordSecondary = secondary.find((record) => record.UUID === uidPrincipal);

      if (recordSecondary) {
        principal[i]['Mnemônico'] = recordSecondary['Mnemônico'];
      }
    }

    return await writeCSV('Mapa_Mnemônico_preenchido.csv', principal);
  } catch (err) {
    throw err
  }
}

module.exports = fillMnemonicos
