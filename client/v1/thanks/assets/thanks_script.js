function results() {
    fullSubmission = {
        value: localStorage.getItem("value"),
        employee: localStorage.getItem("employee"), // technically we don't need to send this anywhere
        selected: localStorage.getItem("selected"), 
        details: localStorage.getItem("details")
    }
    
    console.log(fullSubmission)

    replaceResults(fullSubmission)
}

function replaceResults(fullSubmission) {

    submitObj = {
        value: fullSubmission.value,
        // employee: JSON.parse(fullSubmission.employee),
        selected: JSON.parse(fullSubmission.selected),
        details: fullSubmission.details
    }

    document.getElementById("fullName").textContent = submitObj.selected.name

    // TODO: Call a function that actually emails everything out, as well as stores a copy of this somewhere for future dev reference

}