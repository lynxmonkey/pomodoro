class RequestError {
  constructor(status, message) {
    this.status = status
    this.message = message
  }
}

export const headers = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`
})

export const makePostOptions = data => ({
  method: 'POST',
  headers: headers(),
  body: JSON.stringify(data)
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