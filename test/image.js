const settings = require("../settings.json")

const Pavie = require("../pavie")

const pavie = new Pavie(settings)

main()

async function main() {
  await pavie
    .signin()
    .catch(err => { console.error(err) })
    
  const response = await pavie
    .getImage(`/library/metadata/25963/thumb/1557058611?X-Plex-Token=fPHNF2Wkg84qDPprCbqy`)
    .catch(err => { console.error(err) })

  if(response) {
    console.log(response)
  }
}
  
