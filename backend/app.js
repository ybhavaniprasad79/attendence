const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const { partRoute } = require('./controllers/partRoute')

app.use(express.json())
app.use(cors({
  origin: "https://atrr.netlify.app/",
  credentials: true,
}))

// Participant routes (API)
app.use('/api/participants', partRoute)

// Serve frontend build (if present) with correct headers for JS modules
const staticPath = path.join(__dirname, '..', 'frontend', 'front', 'dist')
if (fs.existsSync(staticPath)) {
  app.use(express.static(staticPath, {
    setHeaders: (res, filePath) => {
      // Some static hosts/servers may not map .jsx => JS MIME; force it when encountered.
      if (filePath.endsWith('.jsx')) {
        res.setHeader('Content-Type', 'application/javascript')
      }
    }
  }))

  // For client-side routing, return index.html for non-API routes
  app.get('*', (req, res) => {
    // If the request is for an API route, skip this fallback
    if (req.path.startsWith('/api/')) return res.status(404).end()
    res.sendFile(path.join(staticPath, 'index.html'))
  })
} else {
  // Simple root route when frontend build isn't present (dev or backend-only)
  app.get('/', (req, res) => {
    try {
      res.status(200).send(`it is now working properly 😉`)
    } catch (error) {
      res.status(500).json(`some thing is worng 🥳 hurry 💩`)
    }
  })
}

module.exports = { app }