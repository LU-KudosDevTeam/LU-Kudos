const express = require("express");			// needed as middleware to serve and route files
const app = express();

const cors = require('cors');				// needed to pull resources (like JSON) from anywhere in the server to anywhere in the server

const port = process.env.PORT || 3000; 		// sets up a port and uses it

const nodemailer = require('nodemailer');  	// needed for email
const hbs = require(
    'nodemailer-express-handlebars');       // needed for email templates

require('dotenv').config(); 				// needed to use environment variables




//https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/

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
	console.log(`Server is running at http://localhost:${port}/`)
})

// keeping v1 of email here for reference

/*
app.post('/send-email-v1', async (req, res) => { // achieved with the help of ChatGPT 4.0
    try {
        const jsonData = req.body; // Received JSON data from the client
        await sendMailv1(jsonData);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error sending email');
    }
});

async function sendMailv1(jsonData) {
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

    var mailOptions = {
        from: `LU Kudos ${email_acctname}`,
        to: jsonData.selected.email,
        subject: 'LU Kudos - Congratulations on your Nomination!',

        //text: JSON.stringify(jsonData) // Convert JSON to string for email = old but may need a fallback like this.

		// this hardcoded HTML will be changed in the future 
		// to use a different file that takes in the JSON 
		// and spits out the right HTML + CSS
		html: `<body style = "text-align: center;">
        <h1 style = "font-size: 5vmin;">
            ${jsonData.namedval}
        </h1>
        
        <p>
            You have been nominated for your demonstration of ${jsonData.namedval} at Lewis University.
            
            <br></br>
            
            This was why they nominated you:
        </p>
        
        <div style = "font-style: italic;">
            ${jsonData.details}
        </div>
    
        <footer style = "font-size: 8px;">
            this email has been sent to you via the LU Kudos team. <br></br>
            <span style = "font-size: 6px;"> Reference ID: ${jsonData.finalID} </span>
        </footer>
        </body>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending mail:", error);
        // throw error; // Rethrow to handle it in the endpoint
    }
}
*/

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

