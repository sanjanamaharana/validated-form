// Validate email format
function validateEmail($email) {
    var emailReg = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    // var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test($email);
}

// Function to validate password format : 
function isValidPassword(password) {
    // Minimum 8 characters, at least one uppercase, one lowercase, and one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
}

// Toggle password visibility
$(".toggle-password").click(function () {
    const inputSelector = $(this).attr("toggle");
    const input = $(inputSelector);
    const inputType = input.attr("type") === "password" ? "text" : "password";
    input.attr("type", inputType);
    $(this).text(inputType === "password" ? "Show" : "Hide");
});

// Form submit event
$("#submitbutton").click(function (event) {

    event.preventDefault();

    var errormessage = "";
    var missingfield = "";

    // Check for empty fields
    if ($("#email").val() == "") {
        missingfield += "<p>Email is required.</p>";
    }
    if ($("#phoneno").val() == "") {
        missingfield += "<p>Phone Number is required.</p>"
    }
    if ($("#password").val() == "") {
        missingfield += "<p>Password is required.</p>"
    }

    // Validate email format
    if (validateEmail($("#email").val()) == false) {
        errormessage += "<p>Invalid email format.</p>";
    }

    // Validate phone number
    if ($.isNumeric($("#phoneno").val()) == false) {
        errormessage += "<p>phone Number is not valid</p>";
    }
    else if ($("#phoneno").val().length != 10) { // Example for a 10-digit number
        errormessage += "<p>Phone Number must be 10 digits long</p>";
    }

    // Validate password format
    if ($("#password").val() && !isValidPassword($("#password").val())) {
        errormessage += "<p>Password must be at least 8 characters long and include uppercase, lowercase, and a number.</p>";
    }

    // Check password match
    if ($("#password").val() != $("#cpassword").val()) {
        errormessage += "<p>Passwords do not match</p>";

    }
    // Display messages
    if (errormessage == "" && missingfield == "") {
        $("#errors").html("");
        $("#success").html("<p>You are registered successfully!</p>");
    } else {
        $("#success").html("");
        $("#errors").html(errormessage + missingfield);
    }


});

