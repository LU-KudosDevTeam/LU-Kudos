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

        yyyymmdd = timezone.getFullYear().toString() + 
                    (timezone.getMonth() + 1).toString().padStart(2, '0') + 
                    timezone.getDate().toString().padStart(2, '0');        
        
        hhmmss = timezone.getHours().toString().padStart(2, '0') + 
                    timezone.getMinutes().toString().padStart(2, '0') + 
                    timezone.getSeconds().toString().padStart(2, '0');

    }


    timePlacement()
    
    submitObj = {
        value: fullSubmission.value,
        namedval: fullSubmission.namedval,
        // employee: JSON.parse(fullSubmission.employee),
        selected: JSON.parse(fullSubmission.selected),
        details: fullSubmission.details,
        finalID: "nullish"
    }

    email_trunc = submitObj.selected.email

    email_trunc = email_trunc.substr(0, 
                                    email_trunc.search("@lewisu.edu")
                                    ).toUpperCase()
    


    submitObj.finalID = `${megaSeconds}-${email_trunc}-${"VAL" + submitObj.value.toString()}-${yyyymmdd}-${hhmmss}`



    document.getElementById("fullValue").textContent = submitObj.namedval
    document.getElementById("fullName").textContent = submitObj.selected.name
    document.getElementById("fullTime").textContent = timezone.toLocaleString() + " (CST)"
    document.getElementById("fullMessageID").textContent = submitObj.finalID



    // TODO: Call a function that actually emails everything out, as well as stores a copy of this somewhere for future dev reference

}