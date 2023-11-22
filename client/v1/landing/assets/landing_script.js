function setValuePathway(num)
{   
    // sets the value of a key called value in localStorage. We will use this for help with routing.
    // we may want to consider also expanding this to include the word values, eg. integrity, justice, in a json.stringify method

    valSignum = "EMPATHY"

    switch (num) {
        case 1:
            valSignum = "KNOWLEDGE"
            break
        case 2:
            valSignum = "FIDELITY"
            break
        case 3:
            valSignum = "WISDOM"
            break
        case 4:
            valSignum = "JUSTICE"
            break
        case 5:
            valSignum = "ASSOCIATION"
            break
    }

    localStorage.setItem("namedval", valSignum);
    localStorage.setItem("value", num);

    //set a timer to prevent submission spam
    localStorage.setItem("timeOld", Date.now())

    doNext(num)
}

function doNext(num)
{   
    // redirects page
    window.location.href='../value/val_val' + num + '.html';
}