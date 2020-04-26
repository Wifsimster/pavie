const settings = require("../settings.json")

const Pavie = require("../pavie")

const pavie = new Pavie(settings)

main()

async function main() {
  await pavie
    .signin()
    .catch(err => { console.error(err) })
    
  const response = await pavie
    .getHistory()
    .catch(err => { console.error(err) })

  if(response) {
    console.log(response)
  }  
}