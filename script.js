// Function to validate password format
function isValidPassword(password) {
    // Minimum 8 characters, at least one uppercase, one lowercase, and one number
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
}

// Validate email format
function validateEmail(email) {
    var emailReg = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return emailReg.test(email);
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
        missingfield += "<p>Enter Email</p>";
    }
    if ($("#phoneno").val() == "") {
        missingfield += "<p>Enter Phone Number</p>";
    }
    if ($("#password").val() == "") {
        missingfield += "<p>Enter Password</p>";
    }

    // Validate email format
    if (!validateEmail($("#email").val())) {
        errormessage += "<p>Invalid Email Format</p>";
    }

    // Validate phone number
    var phoneNumber = $("#phoneno").val();
    if (!$.isNumeric(phoneNumber)) {
        errormessage += "<p>Phone Number is not valid. Only digits are allowed.</p>";
    } else if (phoneNumber.length != 10) {
        errormessage += "<p>Invalid Phone Number Format (10 digits required)</p>";
    }

    // Validate password format
    if ($("#password").val() && !isValidPassword($("#password").val())) {
        errormessage += "<p>Password must be at least 8 characters long and include uppercase, lowercase, and a number.</p>";
    }

    // Check password match
    if ($("#password").val() != $("#cpassword").val()) {
        errormessage += "<p>Password and Confirm Password do not match</p>";
    }

    // Display messages
    if (errormessage == "" && missingfield == "") {
        $("#errors").html("");
        $("#success").html("<p>Form submitted successfully !</p>");
    } else {
        $("#success").html("");
        $("#errors").html(errormessage + missingfield);
    }
});

// Restrict phone number input to digits only and max length of 10
$("#phoneno").on("input", function () {
    this.value = this.value.replace(/[^0-9]/g, ''); // Allow only digits
    if (this.value.length > 10) {
        this.value = this.value.slice(0, 10); // Limit to 10 digits
    }
});
