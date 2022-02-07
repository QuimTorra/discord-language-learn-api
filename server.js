import express from "express"
import cors from 'cors'
import { initializeApp } from "firebase/app"
import { collection, getDocs, getDocsFromCache, getFirestore, query, where } from "firebase/firestore"
import { firebaseConfig } from "./firebaseConfig.js"

const fApp = initializeApp(firebaseConfig)
const db = getFirestore()
const app = express()
const PORT = process.env.PORT || 8080

const serverRef = collection(db, "servers")

app.use(cors({ origin: 'http://localhost:3000' }))

// GET
// Everything
app.get('/native/:nat', async (req, res) => {
  console.log(`On native: ${req.params.nat}`)
  const q = query(serverRef, where("native", "==", req.params.nat.toLowerCase()), where("verified", "==", true))
  const querySnapshot = await getDocs(q)
  let docs = []
  querySnapshot.forEach((doc) => {
    let data = doc.data()
    data["id"] = doc.id
    docs.push(data)
  })
  res.send(docs)
})

app.get('/:lang', async (req, res) => {
  const q = query(serverRef, where("language", "==", req.params.lang.toLowerCase()), where("verified", "==", true))
  const querySnapshot = await getDocs(q)
  let docs = []
  querySnapshot.forEach((doc) => {
    let data = doc.data()
    data["id"] = doc.id
    docs.push(data)
  })
  res.send(docs)
})

app.get('/:lang/:native', async (req, res) => {
  const q = query(serverRef, where("language", "==", req.params.lang.toLowerCase()), where("native", "==", req.params.native.toLowerCase()), where("verified", "==", true))
  const querySnapshot = await getDocs(q)
  let docs = []
  querySnapshot.forEach((doc) => {
    let data = doc.data()
    data["id"] = doc.id
    docs.push(data)
  })
  res.send(docs)
})

// POST
// Server
app.post('/server/:lang', (req, res) => {
  res.send(`New Server listed for language ${req.params.lang}`)
})

app.listen(PORT, () => console.log(`API working on port ${PORT}`))