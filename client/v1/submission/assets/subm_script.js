

    function getFinalEntry(num)
        {
            localStorage.setItem("details", document.getElementById("story-container").value)

            doNext(num)
            
        }
    function doNext(num)
        {
            window.location.href='../thanks/thanks.html'
        }

    function replaceName(){
        selected = JSON.parse(localStorage.getItem('selected'))

        document.getElementById("details-name").textContent = selected.name.toUpperCase()
    }