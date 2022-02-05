import express from "express"
import { initializeApp } from "firebase/app"
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore"
import { firebaseConfig } from "./firebaseConfig.js"

const fApp = initializeApp(firebaseConfig)
const db = getFirestore()
const app = express()
const PORT = process.env.PORT || 8080

const serverRef = collection(db, "server")

// GET
// Everything
app.get('/:lang', async (req, res) => {
  const q = query(serverRef, where("language", "==", req.params.lang.toLowerCase()))
  const querySnapshot = await getDocs(q)
  let docs = []
  querySnapshot.forEach((doc) => {

    console.log(doc.id,  doc.data())
  })
  res.send(querySnapshot)
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