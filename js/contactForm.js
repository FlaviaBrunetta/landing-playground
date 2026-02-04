/**
 * 
 * @param {string} name 
 * @param {string} email 
 * @param {string} message 
 * @returns {object} An object containing validation results
 */

export function validateContactForm(name, email, message) {
    const errors = {};
    
    // Validate name
    if (!name || name.trim() === '') {
        errors.name = 'Name is required.';
    } else if (name.length < 2) {
        errors.name = 'Name must be at least 2 characters long.';
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.trim() === '') {
        errors.email = 'Email is required.';
    } else if (!emailPattern.test(email)) {
        errors.email = 'Invalid email format.';
    }
    
    // Validate message
    if (!message || message.trim() === '') {
        errors.message = 'Message is required.';
    } 

    return errors;

}