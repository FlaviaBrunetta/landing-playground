import { validateContactForm } from "./contactForm";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");
    const sucessMessage = document.getElementById("success-message");
    
    if (!form) return;
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        // Clear previous errors
        clearErrors();

        const name = nameInput.value;
        const email = emailInput.value;
        const message = messageInput.value;

        const validationErrors = validateContactForm(name, email, message);
        
        if (Object.keys(validationErrors).length > 0) {
            displayErrors(validationErrors);
        } else {
            console.log("Form submitted:", { name, email, message });
            handleSuccessfulSubmission();
        }
    });

    function clearErrors() {
        nameInput.classList.remove("invalid");
        nameError.textContent = "";
        emailInput.classList.remove("invalid");
        emailError.textContent = "";
        messageInput.classList.remove("invalid");
        messageError.textContent = "";
    }

    function displayErrors(errors) {
        if (errors.name) {
            nameInput.classList.add("invalid");
            nameError.textContent = errors.name;
        }
        if (errors.email) {
            emailInput.classList.add("invalid");
            emailError.textContent = errors.email;
        }
        if (errors.message) {
            messageInput.classList.add("invalid");
            messageError.textContent = errors.message;
        }
    }
    
    function handleSuccessfulSubmission() {
        sucessMessage.textContent = "Thank you for your message! I will get back to you soon.";
        form.reset();

        console.log("Form submitted successfully.", {
            name: nameInput.value,
            email: emailInput.value,
            message: messageInput.value
        });
    }

}   );
