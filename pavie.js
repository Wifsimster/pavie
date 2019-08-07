const uuid = require("uuid")
const axios = require("axios")
const querystring = require("querystring")

module.exports = class {
  constructor(settings) {
    this.username = settings.username
    this.password = settings.password
    this.clientId = uuid.v4()
  }

  getToken() {
    if (this.user) {
      return this.user.authToken
    }
    console.warn(`You are not yet signin !`)
    return null
  }

  /**
   * Online API
   * This medoth must be called first !
   */
  async signin() {
    const response = await axios.post(
      `https://plex.tv/api/v2/users/signin`,
      { login: this.username, password: this.password },
      {
        headers: {
          "X-Plex-Client-Identifier": this.clientId
        }
      }
    )

    if (response.status < 400) {
      this.user = response.data

      const resources = await this.getResources()
      const resource = resources.filter(res => res.name === `Plex Server`)[0]
      const connection = resource.connections.filter(con => con.local)[0]

      this.instance = axios.create({
        baseURL: `${connection.protocol}://${connection.address}:${connection.port}`,
        headers: {
          "X-Plex-Client-Identifier": this.clientId,
          "X-Plex-Token": this.getToken()
        }
      })

      return this.user
    } else {
      throw new Error("Signin failed !")
    }
  }

  /**
   * Online API
   * Get the list of resources with connection settings
   * Conection : [name, protocol, address, port, uri, local, relay, IPv6]
   */
  async getResources() {
    const response = await axios.get(`https://plex.tv/api/v2/resources`, {
      headers: {
        "X-Plex-Client-Identifier": this.clientId,
        "X-Plex-Token": this.getToken()
      }
    })

    if (response.status < 400) {
      return response.data
    }
  }

  /**
   *  Online API
   *  Get user info.
   *  Return: [id, uuid, username, title, email, thumb, authToken, certificateVersion, rememberExpiresAt]
   */
  async getUser() {
    const response = await axios.get(
      `https://plex.tv/api/v2/user?includeSubscriptions=1&includeSettings=1&includeSharedSettings=1`,
      {
        headers: {
          "X-Plex-Client-Identifier": this.clientId,
          "X-Plex-Token": this.getToken()
        }
      }
    )

    if (response.status < 400) {
      return response.data
    }
  }

  /**
   *  Get basic info about the Plex server.
   * Return: [machineIdentifier, version]
   */
  async getIdentity() {
    const response = await this.instance.get(`/identity`)

    if (response.status < 400) {
      return response.data.MediaContainer
    }
  }

  /**
   *  Get the list actions availables.
   *  ie : platform, platformVersion, updatedAt, version, machineIdentifier, myPlexUsername
   *  Return : [activities, butler, channels, clients, devices, diagnostics, hubs, library, livetv, media, player, playlists, resources, search, server, ...]
   */
  async getActions() {
    const response = await this.instance.get(`/`)

    if (response.status < 400) {
      return response.data.MediaContainer
    }
  }

  /**
   * Get a list of libraries
   * Return: [section, recentlyAdded, onDeck]
   */
  async getLibraries() {
    const response = await this.instance.get("/library")

    if (response.status < 400) {
      return response.data.MediaContainer
    }
  }

  /**
   * Get a list of sections in the library
   * Return: [Movies, Music, TV Shows]
   */
  async getLibrary(library = "sections") {
    const response = await this.instance.get(`/library/${library}`)

    if (response.status < 400) {
      return response.data.MediaContainer
    }
  }

  /**
   * Get list of directory in a specified section
   * Default : TV Shows section
   * Return : [all, unwatched, newest, recentlyAdded, recenntlyViewed, recentlyViewedShows, onDeck, folder, ...]   *
   */
  async getDirectoriesFromSection(library = "sections", sectionId = 2) {
    const response = await this.instance.get(`/library/${library}/${sectionId}`)

    if (response.status < 400) {
      return response.data.MediaContainer
    }
  }

  /**
   * Get a list of TV Shows by directory
   * Default : TV Shows and all
   * Return : [studio, type, title, contentRating, summary, index, rating, year, thumb, art, duration, originallyAvailableAt, ...]
   */
  async getDirectory(library = "sections", sectionId = 2, directory = "all") {
    const response = await this.instance.get(`/library/${library}/${sectionId}/${directory}`)

    if (response.status < 400) {
      return response.data.MediaContainer
    }
  }

  /**
   * Search Tv Shows, episodes, movies or musics
   * Default : [sectionId : Tv Shows, type: Tv Shows]
   * For Tv Shows, type: [2: Tv Shows, 3: Seasonn, 4 : Episode]
   */
  async search(library = "sections", sectionId = 2, filters = { type: 2 }) {
    const response = await this.instance.get(
      `/library/${library}/${sectionId}/search?${querystring.stringify(filters)}`
    )

    if (response.status < 400) {
      return response.data.MediaContainer
    }
  }

  /**
   * Refresh a section
   */
  async refresh(library = "sections", sectionId = 2) {
    const response = await this.instance.get(`/library/${library}/${sectionId}/refresh`)

    if (response.status < 400) {
      return response.data.MediaContainer
    }
  }

  /**
   * Get metdata of a media
   */
  async getMedatadata(id) {
    const response = await this.instance.get(`/library/metadata/${id}`)

    if (response.status < 400) {
      return response.data.MediaContainer
    }
  }

  /**
   * Get a list of servers
   * Return: [name, host, address, port, machineIdentifier, version]
   */
  async getServers() {
    const response = await this.instance.get("/servers")

    if (response.status < 400) {
      return response.data.MediaContainer
    }
  }

  /**
   * Get synchronize info
   */
  async getSynchronize() {
    const response = await this.instance.get("/video/trakt/sync")

    if (response.status < 400) {
      return response.data.MediaContainer
    }
  }

  /**
   * Synchronize Plex and Trakt.tv
   */
  async synchronize(accoundId = "1&amp;t=1565171925.59") {
    const response = await this.instance.get(`/video/trakt/sync/synchronize?account_id=${accoundId}`)

    if (response.status < 400) {
      return response.data.MediaContainer
    }
  }

  /**
   * Hubs actions
   * [continueWatchig, onDeck]
   */
  async getHubs(action = "continueWatching") {
    const response = await this.instance.get(`/hubs/home/${action}`)

    if (response.status < 400) {
      return response.data.MediaContainer
    }
  }
}
