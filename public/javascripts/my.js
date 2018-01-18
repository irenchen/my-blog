console.log('inside my.js')

fetch('/api/name')
  .then(resp => resp.json())
  .then(data => {
    console.log(data)

    $('#result').text('name : ' + data.name)

  })
  .catch(err => {
    console.log(err)
  })
