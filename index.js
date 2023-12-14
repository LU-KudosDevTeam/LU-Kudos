const express = require("express");			// needed as middleware to serve and route files
const app = express();

const cors = require('cors');				// needed to pull resources (like JSON) from anywhere in the server to anywhere in the server

const port = process.env.PORT || 3000; 		// sets up a port and uses it

const nodemailer = require('nodemailer');  	// needed for email
const hbs = require(
    'nodemailer-express-handlebars');       // needed for email templates

require('dotenv').config(); 				// needed to use environment variables




//https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/


// Serve static files from the 'client' directory.
app.use(express.static(__dirname + '/client/'))
app.use(express.static(__dirname + '/client/v1-5/'))
app.use(express.static(__dirname + '/client/v2/'))
app.use(express.static(__dirname + '/client/shared_assets/'))

app.use(express.json());



  // Enable CORS for specific routes.
app.use(cors());

app.get('/v1', function(req, res) {
	res.redirect('/v1/landing/landing.html')
})

app.get('/v1-5', function(req, res) {
	res.redirect('/pathway/landing.html')
})



app.listen(port, function() {
	console.log(`Server is running at http://localhost:${port}/`)
})


// consider this the v2 email version (if we move to using mjml, then we can move from this to v3)

// heavily based on: https://www.concentrationcode.com/handlebars-email/
async function sendMail(jsonData) {
	const email_acctname = process.env.EMAIL_ACCOUNT;
    const email_password = process.env.EMAIL_PASSWORD;	// needed to use an app password for a Gmail account via MFA

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: email_acctname,
            pass: email_password
        },
		debug: true,
    });

    transporter.verify((error, success) => {
        if (error) {console.error(error)};
        if (success) {console.log("Server is ready to take our messages")};
    });

    transporter.use('compile', hbs({
        viewEngine: {
            extname: '.hbs',
            layoutsDir: './client/eml_template',
            defaultLayout: false,
            partialsDir: './client/eml_template',
        }, viewPath: './client/eml_template', extName: '.hbs'
    }));
    
    mainColor = "red"
    accentColor = "pink"


    switch(jsonData.value)
    {
        case "1":
            mainColor = "#BC2C23"
            accentColor = "#ebbfbd"
            break;
        case "2":
            mainColor = "#7923BC"
            accentColor = "#d7bdeb"
            break;
        case "3":
            mainColor = "#BC7623"
            accentColor = "#ebd6bd"
            break;
        case "4":
            mainColor = "#2369BC"
            accentColor = "#bdd2eb"
            break;
        case "5":
            mainColor = "#008C1F"
            accentColor = "#b2dcbb"
            break;

    }

    

    var mailOptions = {
        from: `LU Kudos ${email_acctname}`,
        to: jsonData.selected.email,
        subject: 'LU Kudos - Congratulations on your Nomination!',
		template: 'email',
        context: {
            namedval: jsonData.namedval,
            details: jsonData.details,
            finalID: jsonData.finalID,
            mainColor: mainColor,
            accentColor: accentColor
        } 
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending mail:", error);
        // throw error; // Rethrow to handle it in the endpoint
    }
}

app.post('/send-email', async (req, res) => { // achieved with the help of ChatGPT 4.0
    try {
        const jsonData = req.body; // Received JSON data from the client
        await sendMail(jsonData);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error sending email');
    }
});

