const express = require("express");
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const nodemailer = require('nodemailer');
const fs = require('fs');


//https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/
// const cors = require('cors');

// Enable CORS for specific routes.
app.use(cors());

// Serve static files from the 'client' directory.
app.use(express.static(__dirname + '/client'))

app.use(express.json());


app.get('/test', function(request, response) {
	response.type('text/plain')
	response.send('Node.js and Express running on port='+port)
})

app.listen(port, function() {
	console.log("Server is running at http://localhost:3000/")
})


app.post('/send-email', async (req, res) => { // modified with the help of ChatGPT 3.5 and https://www.w3schools.com/nodejs/nodejs_email.asp

	email_acctname = 'sender@gmail.com'
	email_password = readPassword()
	email_target = 'example@example.com'

	try {
		const jsonData = req.body; // Received JSON data from the client
	}
	catch
	{
		console.log('could not find body.')
	}

	var transporter = nodemailer.createTransport({
		service: 'gmail',
		host: "smtp.gmail.com",
		port: 587,
		secure: false,
		auth: {
		  user: email_acctname,
		  pass: email_password
		}
	  });
	  
	  var mailOptions = {
		from: email_acctname,
		to: email_target,
		subject: 'JSON Data from Client',
        text: "help"
		//JSON.stringify(jsonData) // Convert JSON to string for email body
	  };
	  
	  	try {
			// Send email
			await transporter.sendMail(mailOptions);
			res.status(200).send('Email sent successfully');
		} catch (error) {
			res.status(500).send('Error sending email');
			console.log
		}


})

function readPassword() {
	fs.readFile('PASSWORD.log', 'utf8', (err, data) => {
		if (err) {
		  console.error(err);
		  return;
		}
		//console.log(data);
		return data
	  });
}