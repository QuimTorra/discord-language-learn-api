const app = require('express')()
const PORT = process.env.PORT || 8080

// GET
// Everything
app.get('/:lang', (req, res) => {
  res.send(`This API is responding correctly for ${req.params.lang}`)
})

// Only SERVERS
app.get('/server/:lang', (req, res) => {
  res.send(`Servers are working for language ${req.params.lang}`)
})

// Only BOTS
app.get('/bot/:lang', (req, res) => {
  res.send(`Bots also work for language ${req.params.lang}`) 
})

// POST
// Server
app.post('/server/:lang', (req, res) => {
  res.send(`New Server listed for language ${req.params.lang}`)
})

// Bot
app.post('/bot/:lang', (req, res) => {
  res.send(`New Bot listed for language ${req.params.lang}`)
})

app.listen(PORT, () => console.log(`API working on port ${PORT}`))