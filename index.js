const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => res.send('Hello World, cutie PI!'))

app.listen(port, () => console.log(`Local: http://localhost:${port}`))