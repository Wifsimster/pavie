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
    return new Error(response)
  }

  /**
   * Online API
   * This medoth must be called first !
   */
  async signin() {
    const response = await axios
      .post(`https://plex.tv/api/v2/users/signin`,
        { login: this.username, password: this.password },
        {
          headers: {
            "X-Plex-Client-Identifier": this.clientId
          }
        })
      .catch(err => { return new Error(err) })

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
      .catch(err => { return new Error(err) })

    if (response.status < 400) {
      return response.data
    } else {
      return new Error(response)
    }
  }

  /**
   *  Online API
   *  Get user info.
   *  Return: [id, uuid, username, title, email, thumb, authToken, certificateVersion, rememberExpiresAt]
   */
  async getUser() {
    const response = await axios
      .get(`https://plex.tv/api/v2/user?includeSubscriptions=1&includeSettings=1&includeSharedSettings=1`,
        {
          headers: {
            "X-Plex-Client-Identifier": this.clientId,
            "X-Plex-Token": this.getToken()
          }
        })
      .catch(err => { return new Error(err) })

    if (response.status < 400) {
      return response.data
    } else {
      return new Error(response)
    }
  }

  /**
   *  Get basic info about the Plex server.
   * Return: [machineIdentifier, version]
   */
  async getIdentity() {
    const response = await this.instance
      .get(`/identity`)
      .catch(err => { return new Error(err) })

    if (response.status < 400) {
      return response.data.MediaContainer
    } else {
      return new Error(response)
    }
  }

  /**
   *  Get the list actions availables.
   *  ie : platform, platformVersion, updatedAt, version, machineIdentifier, myPlexUsername
   *  Return : [activities, butler, channels, clients, devices, diagnostics, hubs, library, livetv, media, player, playlists, resources, search, server, ...]
   */
  async getActions() {
    const response = await this.instance
      .get(`/`)
      .catch(err => { return new Error(err) })

    if (response.status < 400) {
      return response.data.MediaContainer
    } else {
      return new Error(response)
    }
  }

  /**
   * Refresh a section
   */
  async refresh(library = "sections", sectionId = 2) {
    const response = await this.instance
      .get(`/library/${library}/${sectionId}/refresh`)
      .catch(err => { return new Error(err) })

    if (response.status < 400) {
      return response.data.MediaContainer
    } else {
      return new Error(response)
    }
  }

  /**
   * Get a list of servers
   * Return: [name, host, address, port, machineIdentifier, version]
   */
  async getServers() {
    const response = await this.instance
      .get("/servers")
      .catch(err => { return new Error(err) })

    if (response.status < 400) {
      return response.data.MediaContainer
    } else {
      return new Error(response)
    }
  }

  /**
   * Get synchronize info
   */
  async getSynchronize() {
    const response = await this.instance
      .get("/video/trakt/sync")
      .catch(err => { return new Error(err) })

    if (response.status < 400) {
      return response.data.MediaContainer
    } else {
      return new Error(response)
    }
  }

  /**
   * Synchronize Plex and Trakt.tv
   */
  async synchronize(accoundId = "1&amp;t=1565171925.59") {
    const response = await this.instance
      .get(`/video/trakt/sync/synchronize?account_id=${accoundId}`)
      .catch(err => { return new Error(err) })

    if (response.status < 400) {
      return response.data.MediaContainer
    } else {
      return new Error(response)
    }
  }

  /**
   * Get all playlists
   */
  async getPlaylists() {
    const response = await this.instance
      .get(`/playlists`)
      .catch(err => { return new Error(err) })

    if (response.status < 400) {
      return response.data.MediaContainer
    } else {
      return new Error(response)
    }
  }

  /**
   * Get playlist basic info
   */
  async getPlaylist(ratingKey) {
    const response = await this.instance
      .get(`/playlists/${ratingKey}`)
      .catch(err => { return new Error(err) })

    if (response.status < 400) {
      return response.data.MediaContainer
    } else {
      return new Error(response)
    }
  }

  /**
   * Get playlist video files
   */
  async getPlaylistFiles(ratingKey) {
    const response = await this.instance
      .get(`/playlists/${ratingKey}/items`)
      .catch(err => { return new Error(err) })

    if (response.status < 400) {
      return response.data.MediaContainer
    } else {
      return new Error(response)
    }
  }

  /**
   * Add playlist
   */
  async addPlaylist(data) {
    data = Object.assign({ smart: 0, type: "video" }, data)

    const response = await this.instance
      .post(`/playlists?${querystring.stringify(data)}`)
      .catch(err => { return new Error(err) })

    if (response.status < 400) {
      return response.data.MediaContainer
    } else {
      return new Error(response)
    }
  }

  /**
   * Update playlist
   */
  async updatePlaylist(ratingKey, data) {
    const response = await this.instance
      .put(`/playlists/${ratingKey}?${querystring.stringify(data)}`)
      .catch(err => { return new Error(err) })

    if (response.status < 400) {
      return response.data
    } else {
      return new Error(response)
    }
  }

  /**
   * Update playlist files
   */
  async updatePlaylistFiles(ratingKey, uri) {
    const response = await this.instance
      .put(`/playlists/${ratingKey}/items?uri=${uri}`)
      .catch(err => { return new Error(err) })

    if (response.status < 400) {
      return response.data
    } else {
      return new Error(response)
    }
  }

  /**
   * Remove playlist
   */
  async removePlaylist(ratingKey) {
    const response = await this.instance
      .delete(`/playlists/${ratingKey}`)
      .catch(err => { return new Error(err) })
      
    if (response.status < 400) {
      return response.data
    } else {
      return new Error(response)
    }
  }

  /**
   * Get history
   */
  async getHistory(filters = {}) {
    filters = Object.assign({ sort: "viewedAt:desc" }, filters)
    
    const response = await this.instance
      .get(`/status/sessions/history/all?${querystring.stringify(filters)}`)
      .catch(err => { return new Error(err) })

    if (response.status < 400) {
      return response.data.MediaContainer
    } else {
      return new Error(response)
    }
  }

  /**
   * Get metadata of a media
   */
  async getMedatadata(id) {
    const response = await this.instance
      .get(`/library/metadata/${id}?includePreferences=1`)
      .catch(err => { return new Error(err) })

    if (response.status < 400) {
      return response.data.MediaContainer
    } else {
      return new Error(response)
    }
  }

  /**
   * Get children metadata of a media
   * ie: Seasons metadata for a specified Tv Show
   */
  async getMedatadataChildren(id, options = {}) {
    options = Object.assign({ excludeAllLeaves: 1 }, options)
    
    const response = await this.instance
      .get(`/library/metadata/${id}/children?${querystring.stringify(options)}`)
      .catch(err => { return new Error(err) })

    if (response.status < 400) {
      return response.data.MediaContainer
    } else {
      return new Error(response)
    }
  }

  async getRelated(id, options = {}) {
    options = Object.assign(
      {
        excludeFields: "summary",
        includeExternalMetadata: 1,
        asyncAugmentMetadata: 1
      },
      options
    )

    const response = await this.instance
      .get(`/hubs/metadata/${id}/related?${querystring.stringify(options)}`)
      .catch(err => { return new Error(err) })

    if (response.status < 400) {
      return response.data.MediaContainer
    } else {
      return new Error(response)
    }
  }

  async getSimilar(id) {
    const response = await this.instance
      .get(`/hubs/metadata/${id}/similar`)
      .catch(err => { return new Error(err) })

    if (response.status < 400) {
      return response.data.MediaContainer
    } else {
      return new Error(response)
    }
  }

  /**
   * Return an image
   * url: /library/metadata/25963/thumb/1557058611?X-Plex-Token=fPHNF2Wkg84qDPprCbqy
   */
  async getImage(url, options = {}) {
    options = Object.assign(
      {
        width: 170,
        height: 96,
        minSize: 1,
        upscale: 1,
        url: url
      },
      options
    )

    const response = await this.instance
      .get(`/photo/:/transcode?${querystring.stringify(options)}`)
      .catch(err => { return new Error(err) })

    if (response.status < 400) {
      return response.data
    } else {
      return new Error(response)
    }
  }

  /**
   * Global search
   */
  async search(query, options = {}) {
    options = Object.assign({ includeCollections: 1, sectionId: null, limit: null, query: query }, options)
    
    const response = await this.instance
      .get(`/hubs/search?${querystring.stringify(options)}`)
      .catch(err => { return new Error(err) })

    if (response.status < 400) {
      return response.data.MediaContainer
    } else {
      return new Error(response)
    }
  }

  async getTvShows(options = {}) {
    options = Object.assign({ type: 2, unwatchedLeaves: 0, sort: null }, options)
    
    const response = await this.instance
      .get(`/library/sections/2/all?${querystring.stringify(options)}`)
      .catch(err => { return new Error(err) })

    if (response.status < 400) {
      return response.data.MediaContainer
    } else {
      return new Error(response)
    }
  }

  async getSeasons(options = {}) {
    options = Object.assign({ type: 3, includeCollections: 1, sort: null }, options)

    const response = await this.instance
      .get(`/library/sections/2/all?${querystring.stringify(options)}`)
      .catch(err => { return new Error(err) })

    if (response.status < 400) {
      return response.data.MediaContainer
    } else {
      return new Error(response)
    }
  }

  async getEpisodes(options = {}) {
    options = Object.assign({ type: 4, includeCollections: 1, sort: null }, options)

    const response = await this.instance
      .get(`/library/sections/2/all?${querystring.stringify(options)}`)
      .catch(err => { return new Error(err) })

    if (response.status < 400) {
      return response.data.MediaContainer
    } else {
      return new Error(response)
    }
  }
}
