const settings = require("../settings.json")

const Pavie = require("../pavie")

const pavie = new Pavie(settings)

main()

async function main() {
  await pavie
    .signin()
    .catch(err => { console.error(err) })
    
  const response = await pavie
    .addPlaylist({
      uri: "server://2c59cf8256eccd8629081638e98e27bf8349c3e7/com.plexapp.plugins.library/library/metadata/8412",
      title: "lorem"
    })
    .catch(err => { console.error(err) })

  console.log(response)
}