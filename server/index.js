import express from 'express'
import cors from 'cors'
import {
  getPublicState,
  getPairingCode,
  updateState,
  verifyPairingCode,
} from './state.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/api/state', (_req, res) => {
  res.json(getPublicState())
})

app.get('/api/pairing', (_req, res) => {
  res.json({ code: getPairingCode() })
})

app.patch('/api/state', (req, res) => {
  const auth = req.headers.authorization ?? ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''

  if (!verifyPairingCode(token)) {
    res.status(401).json({ error: 'Invalid pairing code' })
    return
  }

  res.json(updateState(req.body))
})

app.listen(PORT, () => {
  console.log(`Mirror sync server running on http://localhost:${PORT}`)
})
