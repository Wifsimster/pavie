const Pavie = require("./pavie")

const pavie = new Pavie({ username: "wifsimster", password: "192Lucie!!" })

pavie
  .signin()
  .then(async () => {
    const response = await pavie.getLibraries()
    console.log(response)
  })
  .catch(err => {
    console.error(err)
  })
