function setValuePathway(num)
{   
    // sets the value of a key called value in localStorage. We will use this for help with routing.
    // we may want to consider also expanding this to include the word values, eg. integrity, justice, in a json.stringify method

    localStorage.setItem("value", num);
    doNext(num)
}

function doNext(num)
{   
    // redirects page
    window.location.href='../value/val_val' + num + '.html';
}