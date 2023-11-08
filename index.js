const express = require("express");
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

//https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/
// const cors = require('cors');

// Enable CORS for specific routes.
app.use(cors());

// Serve static files from the 'client' directory.
app.use(express.static(__dirname + '/client'))

// Serve your JSON file with CORS headers.
app.get('/json-data', (req, res) => {
	// Replace 'your-json-file.json' with the actual path to your JSON file.
	res.sendFile(__dirname + '/your-json-file.json');
  });


app.get('/test', function(request, response) {
	response.type('text/plain')
	response.send('Node.js and Express running on port='+port)
})

app.listen(port, function() {
	console.log("Server is running at http://localhost:3000/")
})
