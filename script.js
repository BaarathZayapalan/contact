const form = document.getElementById("contactForm");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const message = document.getElementById("message");
const consent = document.getElementById("consent");

const queryGroup = document.getElementById("queryGroup");
const consentGroup = document.getElementById("consentGroup");
const successMessage = document.getElementById("successMessage");

let submitted = false;

// Show an error
function showError(id, text) {
  document.getElementById(id).textContent = text;
}

// Set a field to invalid
function setInvalid(field, errorId, text) {
  field.classList.add("invalid");
  showError(errorId, text);
}

// Clear a field's error
function clearFieldError(field, errorId) {
  field.classList.remove("invalid");
  showError(errorId, "");
}

// Clear all errors
function clearAllErrors() {
  document.querySelectorAll(".error").forEach(function (error) {
    error.textContent = "";
  });

  document.querySelectorAll(".invalid").forEach(function (field) {
    field.classList.remove("invalid");
  });
}

// Validate the form
function validateForm() {
  let valid = true;
  let firstInvalid = null;

  clearAllErrors();

  // First name
  if (firstName.value.trim() === "") {
    setInvalid(firstName, "firstNameError", "This field is required.");
    firstInvalid ||= firstName;
    valid = false;
  }

  // Last name
  if (lastName.value.trim() === "") {
    setInvalid(lastName, "lastNameError", "This field is required.");
    firstInvalid ||= lastName;
    valid = false;
  }

  // Email
  const emailValue = email.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailValue === "") {
    setInvalid(email, "emailError", "Please enter your email address.");
    firstInvalid ||= email;
    valid = false;
  } else if (!emailPattern.test(emailValue)) {
    setInvalid(email, "emailError", "Please enter a valid email address.");
    firstInvalid ||= email;
    valid = false;
  }

  // Query type
  const selectedQuery = form.querySelector(
    'input[name="queryType"]:checked'
  );

  if (!selectedQuery) {
    queryGroup.classList.add("invalid");
    showError("queryError", "Please select a query type.");
    firstInvalid ||= document.getElementById("general");
    valid = false;
  }

  // Message
  if (message.value.trim() === "") {
    setInvalid(message, "messageError", "Please enter your message.");
    firstInvalid ||= message;
    valid = false;
  }

  // Consent
  if (!consent.checked) {
    consentGroup.classList.add("invalid");
    showError(
      "consentError",
      "Please give your consent before submitting."
    );
    firstInvalid ||= consent;
    valid = false;
  }

  if (!valid && firstInvalid) {
    firstInvalid.focus();
  }

  return valid;
}

// Submit form
form.addEventListener("submit", function (event) {
  event.preventDefault();

  submitted = true;
  successMessage.textContent = "";

  if (!validateForm()) {
    return;
  }

  // Browser-side success feedback
  successMessage.textContent =
    "Thank you for contacting us! Your form has been validated successfully.";

  form.reset();
  submitted = false;
  clearAllErrors();
});

// Validate text fields as the user types
[firstName, lastName, email, message].forEach(function (field) {
  field.addEventListener("input", function () {
    successMessage.textContent = "";

    if (!submitted) {
      return;
    }

    // Recheck all fields after submission has been attempted
    validateForm();
  });
});

// Query selection
form.querySelectorAll('input[name="queryType"]').forEach(function (radio) {
  radio.addEventListener("change", function () {
    queryGroup.classList.remove("invalid");
    showError("queryError", "");
    successMessage.textContent = "";
  });
});

// Consent checkbox
consent.addEventListener("change", function () {
  if (consent.checked) {
    consentGroup.classList.remove("invalid");
    showError("consentError", "");
  }

  successMessage.textContent = "";
});