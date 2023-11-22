function results() {

    // creates object from localStorage keys
    fullSubmission = {
        value: localStorage.getItem("value"),
        namedval: localStorage.getItem("namedval"),
        employee: localStorage.getItem("employee"), // technically we don't need to send this anywhere
        selected: localStorage.getItem("selected"), 
        details: localStorage.getItem("details")
    }
    
    // debug to show everything pulled in localStorage
    console.log(fullSubmission)

    // calls replaceResults to start replacing parts of the actual HTML
    replaceResults(fullSubmission)
}

function replaceResults(fullSubmission) {


    function timePlacement() {

        // taken from a comment to this answer: https://stackoverflow.com/a/40983699
        timezone = new Date(new Date().getTime() + (new Date().getTimezoneOffset() * 60000) + (3600000 * -6))

        // Calculate the number of milliseconds elapsed since the beginning of the current minute - taken from ChatGPT 3.5
        const millisecondsInCurrentMinute = timezone % (60 * 1000);

        // Calculate the milliseconds since the beginning of the last minute
        const millisecondsSinceLastMinute = 60 * 1000 - millisecondsInCurrentMinute + 1;

        //inspired by this: https://www.tutorialspoint.com/How-to-pad-a-number-with-leading-zeros-in-JavaScript
        megaSeconds = millisecondsSinceLastMinute.toString().padStart(5, '0');

        // gets the year, month, and day, and concats them to string
        yyyymmdd = timezone.getFullYear().toString() + 
                    (timezone.getMonth() + 1).toString().padStart(2, '0') + //apparently January is 0 instead of 1 in JS
                    timezone.getDate().toString().padStart(2, '0');        
        
        //gets the month, hours, and seconds, and concats them to string
        hhmmss = timezone.getHours().toString().padStart(2, '0') + 
                    timezone.getMinutes().toString().padStart(2, '0') + 
                    timezone.getSeconds().toString().padStart(2, '0');

    }


    timePlacement()
    
    submitObj = {
        value: fullSubmission.value,
        namedval: fullSubmission.namedval,
        timeNow: Date.now(),
        timeOld: localStorage.getItem("timeOld"),
        // employee: JSON.parse(fullSubmission.employee),
        selected: JSON.parse(fullSubmission.selected),
        details: fullSubmission.details,
        finalID: "nullish"
    }

    email_trunc = submitObj.selected.email

    email_trunc = email_trunc.substr(0,                                 //start index of substring
                                    email_trunc.search("@lewisu.edu")   //end index of substring
                                    ).toUpperCase()
    

    
    submitObj.finalID = `${megaSeconds}-${email_trunc}-${"VAL" + submitObj.value.toString()}-${yyyymmdd}-${hhmmss}`


    // this section does the actual replacing of HTML
    document.getElementById("fullValue").textContent = submitObj.namedval
    document.getElementById("fullName").textContent = submitObj.selected.name
    document.getElementById("fullTime").textContent = timezone.toLocaleString() + " (CST)"
    document.getElementById("fullMessageID").textContent = submitObj.finalID



    // TODO: Call a function that actually emails everything out, as well as stores a copy of this somewhere for future dev reference

    // inspired by this: https://stackoverflow.com/questions/12517359/performance-date-now-vs-date-gettime
    diff = submitObj.timeNow - submitObj.timeOld
    diffMinutes = diff / (1000 * 60)

    console.log(`${diff} ms have passed since the beginning of this entry.`)
    // console.log(`${diff / 1000} seconds have passed since the beginning of this entry.`)
    // console.log(`${diff / (1000 * 60)} minutes have passed since the beginning of this entry.`)

    function sendMail() // heavily inspired by NodeJS
        {
            // Assuming you're using fetch to send data to the server
            fetch('/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submitObj)
            })
                .then(response => {
                    // Handle response if needed
                    console.log("We've sent off the email body to the NodeJS server.")
                    console.log("Here's what the NodeJS server had to say about this: ")
                    console.log(response)
                })
                .catch(error => {
                    // Handle error if needed
                    console.log("Somehow, this failed.")
                    console.log("Here's what the NodeJS server had to say about this:" + JSON.stringify(error))
                });
        }
    
    if (diffMinutes > 1.5) {    // should call the send-mail nodeJS endpoint if it's been longer than 1.5 minutes since the last submission was started
        sendMail();
    }
    else
    {
        console.log(`Please wait another ${90 - (diff / 1000)} seconds before trying to send another email.`)
    }
    
}