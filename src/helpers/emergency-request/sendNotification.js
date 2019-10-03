export const sendNotification = data => {
  // TODO: hide api keys
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: 'Basic MDg0ODFmN2ItZDJiNS00MGMyLWE2MjMtYjAyZjY4N2NjNWY2'
  }

  const options = {
    host: 'onesignal.com',
    port: 443,
    path: '/api/v1/notifications',
    method: 'POST',
    headers: headers
  }

  const https = require('https')
  const req = https.request(options, res => {
    res.on('data', function(data) {
      console.log('Response:')
      console.log(JSON.parse(data))
    })
  })

  req.on('error', error => {
    console.log('ERROR:')
    console.log(error.message)
  })

  req.write(JSON.stringify(data))
  req.end()
}
