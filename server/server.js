const express = require('express')
const app = express()

app.get('/api', (req, res) => {
    res.json({ 'address': ['address1', 'address2', 'address3..'] })
})

app.listen(5000, () => {
    console.log("server started serving at port 50000!")
})