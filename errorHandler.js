
module.exports = response => {
  if (response.status < 400) {
    return response.data
  } else {
    return new Error(response)
  }
}
