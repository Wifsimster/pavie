const settings = require("../settings.json")

const Pavie = require("../pavie")

const pavie = new Pavie(settings)

// pavie
//   .signin()
//   .then(async () => {
//     const response = await pavie.getPlaylists()
//     console.log(response)
//   })
//   .catch(err => {
//     console.error(err)
//   })

pavie
  .signin()
  .then(async () => {
    const response = await pavie.addPlaylistFiles({
      uri: "server://2c59cf8256eccd8629081638e98e27bf8349c3e7/com.plexapp.plugins.library/library/metadata/8412",
      title: "lorem"
    })
    console.log(response)
  })
  .catch(err => {
    console.error(err)
  })
