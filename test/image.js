const settings = require("../settings.json")

const Pavie = require("../pavie")

const pavie = new Pavie(settings)

pavie
  .signin()
  .then(async () => {
    const response = await pavie.getImage(`/library/metadata/25963/thumb/1557058611?X-Plex-Token=fPHNF2Wkg84qDPprCbqy`)
    console.log(response)
  })
  .catch(err => {
    console.error(err)
  })
