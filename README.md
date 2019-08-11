# pavie

Node.js SDK for the Plex Media Server API.

Tested on Plex Media Server v1.16.3.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Wifsimster/pavie/blob/master/LICENSE)
[![npm version](https://badge.fury.io/js/pavie.svg)](https://badge.fury.io/js/pavie)
<img src="https://img.shields.io/github/languages/code-size/Wifsimster/pavie">
[![Install size](https://packagephobia.now.sh/badge?p=pavie)](https://packagephobia.now.sh/result?p=pavie)

## Summary

[Metadata](https://github.com/Wifsimster/pavie#metadata)

[Tv Shows](https://github.com/Wifsimster/pavie#tv-shows)

[Synchronize](https://github.com/Wifsimster/pavie#synchronize)

[Playlists](https://github.com/Wifsimster/pavie#playlists)

[History](https://github.com/Wifsimster/pavie#history)

[Images](https://github.com/Wifsimster/pavie#images)

## Install

```
$ npm install pavie
```

## Usage

```js
const Pavie = require("pavie")

const pavie = new Pavie({ username: "USERNAME", password: "PASSWORD" })

pavie
  .signin()
  .then(user => {
    console.log(user)
  })
  .catch(err => {
    console.error(err)
  })
```

## Documentation

#### signin()

Authenticate user to Plex server. This is the first method to call, this instantiate your server and your token for the others methods !

Return `user` `<object>` if authentification is successfull.

#### getResources()

Get the list of resources with connection settings.
Conection : [name, protocol, address, port, uri, local, relay, IPv6].

#### getUser()

Get user info.
Return: [id, uuid, username, title, email, thumb, authToken, certificateVersion, rememberExpiresAt].

#### getIdentity()

Get basic info about the Plex server.
Return: [machineIdentifier, version]

#### getActions()

Get the list actions availables.
ie : platform, platformVersion, updatedAt, version, machineIdentifier, myPlexUsername.
Return : [activities, butler, channels, clients, devices, diagnostics, hubs, library, livetv, media, player, playlists, resources, search, server, ...].

#### getServers()

Get a list of servers.
Return: [name, host, address, port, machineIdentifier, version].

### Metadata

### getMetadata([id])

Return all info about a media.

- `id` `<number>` Identifiant

### getMetadataChildren([id], [options])

Return all children metadata for a specified media.
ie: Return seasons metadata for a specified Tv Show.

- `id` `<number>` Identifiant
- `options` `<object>`
  - `excludeAllLeaves` `<number>`, default: `1`

### getRelated([id], [options])

Return a list of related media.

- `id` `<number>` Identifiant
- `options` `<object>`
  - `excludeFields` `<string>`, default: `summary`
  - `includeExternalMetadata` `<number>`, default: `1`
  - `asyncAugmentMetadata` `<number>`, default: `1`

### getSimilar([id])

Return a list of similar media.

- `id` `<number>` Identifiant

### search([query], [options])

Global search of media.

- `query` `<string>`
- `options` `<object>`
  - `includeCollections` `<number>`, default: `1`
  - `sectionId` `<number>`
  - `limit` `<number>`, ie: `30`

### Tv Shows

#### getTvShows([options])

Return tv shows.

- `options` `<object>`
  - `unwatchedLeaves` `<number>`, default: `0`
  - `sort` `<string>`, ie: `rating:desc`

#### getSeasons([options])

Return tv shows seasons.

- `options` `<object>`
  - `includeCollections` `<number>`, default: `1`
  - `sort` `<string>`, ie: `rating:desc`

#### getEpisodes([options])

Return tv shows episodes.

- `options` `<object>`
  - `includeCollections` `<number>`, default: `1`
  - `sort` `<string>`, ie: `rating:desc`

### Synchronize

#### getSynchronize()

Get synchronize info.

#### synchronize([accounntId])

Synchronize Plex and Trakt.tv.

### Playlists

#### getPlaylists()

Get all playlists.

#### getPlaylist([ratingKey])

Get playlist basic info.

- `ratingKey` `<string> | <number>` Identifiant

#### getPlaylistFiles([ratingKey])

Get playlist video files.

- `ratingKey` `<string> | <number>` Identifiant

#### addPlaylist([data])

Add new playlist.

- `data` `<object>`
  - `uri` `<string>` Path to a list of video files, ie : `server://2c59cf8256eccd8629081638e98e27bf8349c3e7/com.plexapp.plugins.library/library/metadata/26082`
  - `title` `<string>` Title of the playlist
  - `smart` `<number>` Default: `0`
  - `type` `<string>` Default: `video`

#### updatePlaylist([ratingKey], [data])

Update existing playlist.

- `ratingKey` `<string> | <number>` Identifiant
- `data` `<object>`
  - `title` `<string>` Title
  - `summary` `<string>` Description

#### updatePlaylistFiles([ratingKey], [uri])

Add files to an existing playlist.

- `ratingKey` `<string> | <number>` Identifiant
- `uri` `<string>` Path to a list of video files, ie: `server://2c59cf8256eccd8629081638e98e27bf8349c3e7/com.plexapp.plugins.library/library/metadata/26082`

#### removePlaylist([ratingKey])

Remove existing playlist.

- `ratingKey` `<string> | <number>` Identifiant

### History

#### getHistory(options)

Get the history of a TV Shows.

- `options` `<object>`

  - `metadataItemID` `<number>` Identifiant
  - `sort` `<string>` Order by, default : `viewed:desc`

### Images

#### getImage([url], [options])

Return an image.

- `url` `<string>` Path to the image
- `options` `<object>`
  - `width` `<number>`, default: `170`
  - `height` `<number>`, default: `96`
  - `minSize` `<number>`, default: `1`
  - `upscale` `<number>`, default: `1`
  - `opacity` `<number>`, ie: `30`
  - `background` `<hexadecimal>`, ie: `36383b`
  - `format` `<string>`, ie: `png`
  - `blur` `<number>`, ie: `56`
