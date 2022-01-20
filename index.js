const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello LISUG')
})

app.get(`/getpeople`, (req, res) => {
  let someemail = `base@business.com`
  res.json([
      {
          name: 'Liam',
          email: someemail
      },
      {
          name: 'Jack',
          email: 'Jack@business.com'
      }
  ]);
});

app.listen(3000)