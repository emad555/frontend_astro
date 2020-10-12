// create FormData()
const formData = new FormData();
const fileSelect = document.getElementById("photo");

fileSelect.addEventListener("change", function (e) {

    // create a an array for files
    const files = Array.from(e.target.files);

    // append the files (e.g, image) to the FormData
    files.forEach( (file, index)=> {
        formData.append(index, file);
    });

}, false);

// Step 1
const registerUser = () => {

    let errorMessages = [];

    // Step 2 
    const firstName = document.getElementsByClassName('field')[0].value;
    const lastName = document.getElementsByClassName('field')[1].value;
    const email = document.getElementsByClassName('field')[2].value;
    const password = document.getElementsByClassName('field')[3].value;
    const phone = document.getElementsByClassName('field')[4].value;
    const termsConditions = document.getElementsByClassName('checkbox')[0].checked;

    // Step 4
    if(firstName.length === 0) {
        errorMessages.push("Please enter your first name!");
    }
    if(lastName.length === 0) {
        errorMessages.push("Please enter your last name!");
    }
    if(email.length === 0) {
        errorMessages.push("Please enter your email!");
    }
    if(password.length === 0) {
        errorMessages.push("Please enter a password!");
    }

    // Step 5
    if(termsConditions === false) {
        errorMessages.push("Please accept terms & conditions!");
    }

    // Step 3
    // If no mistakes, alert success message
    if(errorMessages.length === 0) {

        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('phone', phone);

        fetch('http://localhost:3001/users/register',{
            method: 'POST',
            // headers: {"Content-Type": "multipart/form-data"},
            body: formData
        })
        .then(
            (response) => response.json()
        )
        .then(
            (response) => {
                console.log(response);
                alert(
                    "You have registered successfully" + "\n" +
                    firstName + "\n" +
                    lastName + "\n" +
                    email + "\n" +
                    password + "\n" +
                    phone + "\n"
                );
            }
        )
        .catch(
            (e) => {
                console.log({e: e})
            }
        )
    } else {
        // Reveal the red error message box
        document.getElementsByClassName('error-message')[0].className = "error-message show";

        // Drop error messages in the box
        document.getElementsByClassName('error-message')[0].innerText = errorMessages.join("\n")
    }
}