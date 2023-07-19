// Get references to form elements
const form = document.getElementById("myForm");
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");

// Add validation to the form submission
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  // Perform input validation
  if (!validateName() || !validateAge()) {
    return;
  }

  // Get form values
  const name = nameInput.value;
  const age = parseInt(ageInput.value);

  // Create an object to hold the form data
  const formData = {
    name: name,
    age: age
  };

  // Send form data to the server using fetch API
  fetch("/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
    .then(response => {
      if (response.ok) {
        console.log("Form data sent successfully!");
        resetForm();
      } else {
        throw new Error("Error sending form data");
      }
    })
    .catch(error => {
      console.error(error);
    });
});

// Validate the name input
function validateName() {
  const name = nameInput.value.trim();
  if (name === "") {
    showErrorMessage(nameInput, "Name is required");
    return false;
  }
  clearErrorMessage(nameInput);
  return true;
}

// Validate the age input
function validateAge() {
  const age = parseInt(ageInput.value);
  if (isNaN(age) || age < 0 || age > 150) {
    showErrorMessage(ageInput, "Age must be a valid number between 0 and 150");
    return false;
  }
  clearErrorMessage(ageInput);
  return true;
}

// Show an error message for the specified input element
function showErrorMessage(input, message) {
  const errorElement = document.createElement("div");
  errorElement.classList.add("error-message");
  errorElement.innerText = message;
  input.classList.add("invalid");
  input.parentNode.appendChild(errorElement);
}

// Clear the error message for the specified input element
function clearErrorMessage(input) {
  const errorElement = input.parentNode.querySelector(".error-message");
  if (errorElement) {
    input.parentNode.removeChild(errorElement);
  }
  input.classList.remove("invalid");
}

// Reset the form to its initial state
function resetForm() {
  form.reset();
  clearErrorMessage(nameInput);
  clearErrorMessage(ageInput);
}
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', handleFormSubmit);
