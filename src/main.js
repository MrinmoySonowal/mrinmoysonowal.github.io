// Main application entry point
import { initializeFirebase } from './firebase/config.js';
import { initializeApp } from './app/app.js';
import { initializeTheme } from './utils/theme.js';
import { initializeAnimations } from './animations/animations.js';
import { initializeParticles } from './effects/particles.js';
import { loadingManager } from './utils/loading.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Show loading screen
        loadingManager.show();
        
        // Initialize Firebase
        await initializeFirebase();
        
        // Initialize theme system
        initializeTheme();
        
        // Initialize particles background
        initializeParticles();
        
        // Initialize animations
        initializeAnimations();
        
        // Initialize main app functionality
        await initializeApp();
        
        // Hide loading screen
        setTimeout(() => {
            loadingManager.hide();
        }, 1500);
        
    } catch (error) {
        console.error('Error initializing application:', error);
        loadingManager.hide();
    }
});