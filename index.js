const express = require('express')
const { fetchTrackCollection } = require('./discogs')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())

app.get('/fetch-tracks', async (req, res) => {
	try {
		console.log("REQ: ", req.query)
		const discogsProfileName = req.query.profileName
		console.log("FOO? ", discogsProfileName)
		const tracks = await fetchTrackCollection(discogsProfileName)				
		res.status(200).send(tracks)
	} catch (error) {
		console.error('API ERROR: ', error)
		res.status(500).send('Error fetching tracks.')
	}
})

app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`)
})
