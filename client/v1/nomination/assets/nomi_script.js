
    // updated with ChatGPT 3.5 code - start here
    function selectPerson(buttonElement)
        {

            // Find the element with the "select-btn-name" class within the button

            // Get the text content of the element
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

            // Loop through all buttons and change their classes
            buttonsInContainer.forEach((button) => {
                if (button !== buttonElement) {
                    button.classList.remove('btn-chosen');
                    button.classList.add('btn-default');
                }
            });

            console.log(selectBtnName + ' was clicked');
            // Rest of your selectPerson logic - end ChatGPT assistance here


            selectBtnObj = {
                name: selectBtnName,
                dept: selectBtnDept,
                title: selectBtnTitle,
                email: selectBtnEmail                
            };

            //console.log(JSON.stringify(selectBtnObj));
            console.log(JSON.stringify(selectBtnObj));
        }

    function getCorrectEmployee(num)
        {

            doNext(num)
            
        }
    function doNext(num)
        {
            window.location.href='../submission/subm_val' + num + '.html'
        }

    async function pullMasterFile() {
        const response = await fetch("./assets/FacandStaff.json");
        const data = await response.json();
        console.log(data);
      }
