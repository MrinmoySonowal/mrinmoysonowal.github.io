// Contact form management
import { FirestoreService } from '../firebase/firestore.js';

export class ContactManager {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.successToast = document.getElementById('successToast');
    }
    
    initialize() {
        if (this.form) {
            this.form.addEventListener('submit', this.handleSubmit.bind(this));
        }
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Validate form data
        if (!this.validateForm(data)) {
            return;
        }
        
        try {
            // Show loading state
            const submitButton = this.form.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            submitButton.disabled = true;
            
            // Submit to Firestore
            await FirestoreService.submitContactForm(data);
            
            // Show success message
            this.showSuccessToast();
            
            // Reset form
            this.form.reset();
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
        } catch (error) {
            console.error('Error submitting contact form:', error);
            
            // Show error message
            this.showErrorMessage('Failed to send message. Please try again.');
            
            // Reset button
            const submitButton = this.form.querySelector('button[type="submit"]');
            submitButton.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Message';
            submitButton.disabled = false;
        }
    }
    
    validateForm(data) {
        const errors = [];
        
        if (!data.name || data.name.trim().length < 2) {
            errors.push('Name must be at least 2 characters long');
        }
        
        if (!data.email || !this.isValidEmail(data.email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (!data.subject || data.subject.trim().length < 5) {
            errors.push('Subject must be at least 5 characters long');
        }
        
        if (!data.message || data.message.trim().length < 10) {
            errors.push('Message must be at least 10 characters long');
        }
        
        if (errors.length > 0) {
            this.showErrorMessage(errors.join('\n'));
            return false;
        }
        
        return true;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    showSuccessToast() {
        if (this.successToast) {
            const toast = new bootstrap.Toast(this.successToast);
            toast.show();
        }
    }
    
    showErrorMessage(message) {
        // Create and show error alert
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-danger alert-dismissible fade show mt-3';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        this.form.appendChild(alertDiv);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }
}