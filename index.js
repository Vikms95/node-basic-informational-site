const express = require('express')
const path = require('path')
const app = express()
const PORT = 3000;

app.set('views', path.join(__dirname, 'public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/contact-me', (req, res) => {
  res.render('contact-me')
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/about/:id', (req, res) => {
  res.render('about')
})



app.listen(PORT)