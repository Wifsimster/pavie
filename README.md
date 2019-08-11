# pavie

Node.js restful API for Plex Media Server.

Tested on Plex Media Server v1.16.3.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Wifsimster/pavie/blob/master/LICENSE)
[![npm version](https://badge.fury.io/js/pavie.svg)](https://badge.fury.io/js/pavie)
[![Install size](https://packagephobia.now.sh/badge?p=pavie)](https://packagephobia.now.sh/result?p=pavie)

## Summary

[Libraries](https://github.com/Wifsimster/pavie#libraries)

[Directories](https://github.com/Wifsimster/pavie#directories)

[Synchronize](https://github.com/Wifsimster/pavie#synchronize)

[Hubs](https://github.com/Wifsimster/pavie#hubs)

[Playlist](https://github.com/Wifsimster/pavie#playlists)

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

### Instance methods

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

#### getMedatadata([id])

Get metdata of a media.

#### getServers()

Get a list of servers.
Return: [name, host, address, port, machineIdentifier, version].

### Libraries

#### getLibraries()

Get a list of libraries.
Return: [section, recentlyAdded, onDeck].

#### getLibrary([library = 'sections'])

Get a list of sections in the library.
Return: [Movies, Music, TV Shows].

#### refresh([library = 'sections'], [sectionId = 2])

Refresh a section.

### Directories

#### getDirectoriesFromSection([library = 'sections'], [sectionId = 2])

Get list of directory in a specified section.
Default : TV Shows section.
Return : [all, unwatched, newest, recentlyAdded, recenntlyViewed, recentlyViewedShows, onDeck, folder, ...]

#### getDirectory([library = 'sections'], [sectionId = 2], [directory = 'all'])

Get a list of TV Shows by directory.
Default : TV Shows and all.
Return : [studio, type, title, contentRating, summary, index, rating, year, thumb, art, duration, originallyAvailableAt, ...].

#### search([library = 'sections'], [sectionId = 2], [filters = { type: 2}])

Search Tv Shows, episodes, movies or musics.
Default : [sectionId : Tv Shows, type: Tv Shows]
For Tv Shows, type: [2: Tv Shows, 3: Seasonn, 4 : Episode]

### Synchronize

#### getSynchronize()

Get synchronize info.

#### synchronize([accounntId])

Synchronize Plex and Trakt.tv.

### Hubs

#### getHubs([action = 'continueWatching'])

Hubs actions [continueWatching, onDeck]

### Playlists

#### getPlaylists()

Get all playlists

#### getPlaylist([ratingKey])

Get playlist basic info

- `ratingKey` `<string> | <number>` Identifiant

#### getPlaylistFiles([ratingKey])

Get playlist video files

- `ratingKey` `<string> | <number>` Identifiant

#### addPlaylist([data])

Add new playlist

- `data` `<object>`
  - `uri` `<string>` Path to a list of video files, ie : `server://2c59cf8256eccd8629081638e98e27bf8349c3e7/com.plexapp.plugins.library/library/metadata/26082`
  - `title` `<string>` Title of the playlist
  - `smart` `<number>` Default: `0`
  - `type` `<string>` Default: `video`

#### updatePlaylist([ratingKey], [data])

Update existing playlist

- `ratingKey` `<string> | <number>` Identifiant
- `data` `<object>`
  - `title` `<string>` Title
  - `summary` `<string>` Description

#### updatePlaylistFiles([ratingKey], [uri])

Add files to an existing playlist

- `ratingKey` `<string> | <number>` Identifiant
- `uri` `<string>` Path to a list of video files, ie: `server://2c59cf8256eccd8629081638e98e27bf8349c3e7/com.plexapp.plugins.library/library/metadata/26082`

#### removePlaylist([ratingKey])

Remove existing playlist

- `ratingKey` `<string> | <number>` Identifiant
