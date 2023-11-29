

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
        document.getElementById("details-val").textContent = localStorage.getItem('namedval').toUpperCase()
    }

    // modified from https://inkplant.com/code/count-textarea-characters-with-javascript
    function countChars(textbox, counter, max) {

        tbx = document.getElementById(textbox)
        ctr = document.getElementById(counter)

        var len = tbx.value.length;

        var count = max - len;

        if (count <= 0) { 
            ctr.textContent = `(${len} / ${max}) - Max Length Reached`
            ctr.style.backgroundColor = "#ff545a"
        }
        else { ctr.textContent = `(${len} / ${max})`;
        ctr.style.backgroundColor = "" }
      }