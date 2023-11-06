const express = require("express");
const app = express();

//https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/
const cors = require('cors');
app.use(cors())

app.use(express.static(__dirname + '/client'))

const port = process.env.PORT || 3000
app.get('/test', function(request, response) {
	response.type('text/plain')
	response.send('Node.js and Express running on port='+port)
})

app.listen(port, function() {
	console.log("Server is running at http://localhost:3000/")
})
