class RequestError {
  constructor(status, message) {
    this.status = status
    this.message = message
  }
}

export const headers = () => {
  const token = localStorage.getItem('token')
  const basic = {
    'Content-Type': 'application/json'
  }
  return token ? { ...basic, Authorization: token } : basic
}

export const makePostOptions = data => ({
  method: 'POST',
  headers: headers(),
  body: JSON.stringify(data)
})

export const getOptions = () => ({
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})

const request = (url, options) =>
  fetch(url, options).then(response => {
    const { status } = response

    if (status === 204) return {}
    const json = response.json()
    if (status >= 200 && status < 300) return json
    return json.then(message => {
      throw new RequestError(status, message)
    })
  })

export const post = (url, data) => request(url, makePostOptions(data))
export const get = url => request(url, getOptions())