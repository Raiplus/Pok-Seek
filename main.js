import express from 'express'
import mongoose from 'mongoose'

const app = express()
const port = 3000
app.use(express.json())
app.use(express.static('views'))
app.post('/userscores', (req, res) => {
  console.log("Body:", req.body)
  res.json({ Message: "ok" })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)

})
