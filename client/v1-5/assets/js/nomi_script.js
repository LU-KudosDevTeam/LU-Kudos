
    // updated with ChatGPT 3.5 code - start here
    function selectPerson(buttonElement)
        {

            // Find the element with the "select-btn-name, dept, title, email" class within the button and get its text content

            const selectBtnName = buttonElement.querySelector('.select-btn-name').textContent.trim();
            const selectBtnDept = buttonElement.querySelector('.select-btn-dept').textContent.trim();
            const selectBtnTitle = buttonElement.querySelector('.select-btn-title').textContent.trim();
            const selectBtnEmail = buttonElement.querySelector('.select-btn-email').textContent.trim();


            // The "btn-default" class is present
            // Change the class to "btn-chosen"
            buttonElement.classList.remove('btn-default');
            buttonElement.classList.add('btn-chosen');
        

            // Get all buttons inside the "select-container" div
            const buttonsInContainer = document.querySelectorAll('#select-container .select-group .select-btn');

            // Loop through all other buttons and change their classes back to default
            // This ensures that only one button can have the chosen look
            buttonsInContainer.forEach((button) => {
                if (button !== buttonElement) {
                    button.classList.remove('btn-chosen');
                    button.classList.add('btn-default');
                }
            });

            // Rest of my selectPerson logic - end ChatGPT assistance here

            // Creates an object from the buttonElement's pieces (name, dept, title, and email)
            selectBtnObj = {
                name: selectBtnName,
                dept: selectBtnDept,
                title: selectBtnTitle,
                email: selectBtnEmail                
            };

            // turns the object into a string, and saves it to localStorage under the key "selected"
            localStorage.setItem("selected", JSON.stringify(selectBtnObj))
            
            // just testing localStorage here
            function debugSelectBtnClicked() {
                console.log(selectBtnName + ' was clicked');
                console.log(JSON.parse(localStorage.getItem("selected")));
            }                                   

            function debugShowAllStorageProgress() {
            employee = JSON.parse(localStorage.getItem("employee"))

            console.log("The value that we are on is: " + localStorage.getItem("value"));
            console.log("The employee that we are looking for is: ");
            console.log(employee);
            }

            // comment these lines out to disable the debug feature
            debugSelectBtnClicked() 
            debugShowAllStorageProgress()
        }

    function getCorrectEmployee(num)
        {
            

            doNext(num)
            
        }
    function doNext(num)
        {
            window.location.href='../pathway/subm.html'
        }

    function replaceAllButtons(dataset)
    {   

        function noDataFound()
        {
            // should yell at the user to let them know we're redirecting them back to the find page. 
            // this will be a permanent placeholder until a more elegant solution (dialog boxes?) are constructed
            alert("We could not find anyone matching the information you provided. Please try again!");

            // should send the user back to the find page
            num = localStorage.getItem("value");
            window.location.href='../pathway/find.html';
        }

        // DONE: if no match found, call noDataFound()
        if (dataset.length == 0) {
            noDataFound()
        }

        
        // DONE: if match is found, replace the textContent of each button / generate / delete more buttons.
        // this may need to be done using CSS classes to help iterate what has or hasn't been touched.

        // This entire section has been highly inspired by a similar question via ChatGPT 3.5

        const btnContainer = document.getElementById("select-container")

        //btnContainer.innerHTML = ""; //comment this out to enable the debug buttons

        // Loop through each person and create HTML elements to display them
        dataset.forEach(personPulled => {
            
        // Create a div element for each student
        const personDiv = document.createElement('div');
        personDiv.classList.add('select-group');
            
            // Create HTML content for the person (name, dept, title, email)
            const personInfo = `
                
                <button class = 'btn-default select-btn' onclick='selectPerson(this)'>
                    <div class = 'select-btn-name'>
                        ${personPulled.name}
                    </div>
                    <div class = 'select-btn-desc'>
                        <span class = 'select-btn-dept'>
                        ${personPulled.dept}
                        </span> 
                        <span class = 'divider'>|</span> 
                        <span class = 'select-btn-title'> 
                            ${personPulled.title}
                        </span> 
                        <span class = 'divider'>|</span> 
                        <span class = 'select-btn-email'>
                            ${personPulled.email}
                        </span>
                    </div>
                </button>
            
            `
            // Set the HTML content inside the person div
            personDiv.innerHTML = personInfo;

            // Append the person div to the btnContainer
            btnContainer.appendChild(personDiv);

            })
        
        // End ChatGPT 3.5 inspiration
        


    }
    
    function filterData(data) {

        employee = JSON.parse(localStorage.getItem("employee"))

        function filterName(record) {
            return record.name.includes(employee.fname) && record.name.includes(employee.lname);
        }

        function filterTitle(record) {
            return record.title.includes(employee.tname);

        //  we know that this: record.Title.includes('') returns all data, so our filter works as expected - intentionally permissive
        }

        function filterDept(record) {
            return record.dept.includes(employee.dname);
        }

        function filterEmail(record) {
            return record.email.includes(employee.ename);
        }

        // this starts by pulling all rows, and pushing each one through our mini filter functions, one at a time
        dataByName = data.result.rows.filter(filterName);
        dataByTitle = dataByName.filter(filterTitle);
        dataByDept = dataByTitle.filter(filterDept);
        dataByEmail = dataByDept.filter(filterEmail);

        function debugFilterData() {
            console.log("This is the query we got from the find pages: \n\n \
            FName: \t" + employee.fname + "\n \
            LName: \t" + employee.lname + "\n \
            Dept.: \t" + employee.dname + "\n \
            Title: \t" + employee.tname + "\n \
            Email: \t" + employee.ename)
            
            console.log("and this is what the query pulled:")
            console.log(dataByEmail) // the data that was actually pulled
        }

        debugFilterData() // comment this out to disable the debug feature.

        // calls the function to replace the textContent of each button / generate / delete more buttons.
        replaceAllButtons(dataByEmail)
    }



    async function pullMasterFile() {
        const response = await fetch("../assets/FacandStaff.json");
        const data = await response.json();
        
        function debugMasterFile() {
            console.log("This is everything pulled from this JSON file:")
            console.log(data);
        }

        debugMasterFile() // comment this out to disable the debug feature.

        // calls the filter function
        filterData(data)

        colorUs()
        
      }
