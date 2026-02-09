import { validateContactForm } from "./contactForm.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");
    const sucessMessage = document.getElementById("success-message");

    const submitButton = form.querySelector('button[type="submit"]');
    
    if (!form) return;
    
    form.addEventListener("submit", async (e) => {
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
            await handleSuccessfulSubmission(name, email, message);
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
    
    async function handleSuccessfulSubmission(name, email, message ) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        //loading state
        sucessMessage.textContent = "Sending your message...";

        try{
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("message", message);

            const response = await fetch("https://formsubmit.co/flaviabdaboit@gmail.com", {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                console.log("Form submitted successfully.");
                sucessMessage.textContent = "Thank you for your message! I will get back to you soon.";
                form.reset();
            } else {
                throw new Error("Network response was not ok.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            sucessMessage.textContent = "Sorry, there was an error sending your message. Please try again later.";
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Send Message";
        }
    }

});
