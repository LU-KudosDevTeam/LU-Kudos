
    function getFinalEntry(num)
        {
            localStorage.setItem("details", document.getElementById("story-container").value)

            doNext(num)
            
        }
    function doNext(num)
        {
            window.location.href='../thanks/thanks.html'
        }
