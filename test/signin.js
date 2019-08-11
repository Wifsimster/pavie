const settings = require("../settings.json")

const Pavie = require("../pavie")

const pavie = new Pavie(settings)

pavie
  .signin()
  .then(async () => {
    const response = await pavie.getActions()
    console.log(response)
  })
  .catch(err => {
    console.error(err)
  })
