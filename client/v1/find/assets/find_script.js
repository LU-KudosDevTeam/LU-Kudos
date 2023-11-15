function getEmployeeNames(num)
{
    // creates employee obj from pulling all data from the HTML fields
    employee = {
        fname: document.querySelector('[name="fname"]').value,
        lname: document.querySelector('[name="lname"]').value,
        tname: document.querySelector('[name="tname"]').value,
        dname: document.querySelector('[name="dname"]').value,
        ename: document.querySelector('[name="ename"]').value
    }
    
    // takes the object, resaves it as a string, and sends it to localStorage under the key "employee"
    localStorage.setItem("employee", JSON.stringify(employee));
    doNext(num)
    
}
function doNext(num)
{
    // actually takes us to the next page
    window.location.href='../nomination/nomi_val' + num + '.html'
}