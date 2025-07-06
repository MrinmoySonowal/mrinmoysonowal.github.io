// Main application logic
import { FirestoreService } from '../firebase/firestore.js';
import { StorageService } from '../firebase/storage.js';
import { SocialFeedManager } from '../social/socialFeed.js';
import { ContactManager } from '../components/contact.js';
import { SkillsManager } from '../components/skills.js';
import { StatsManager } from '../components/stats.js';

export const initializeApp = async () => {
    try {
        // Initialize all managers
        const socialFeed = new SocialFeedManager();
        const contactManager = new ContactManager();
        const skillsManager = new SkillsManager();
        const statsManager = new StatsManager();
        
        // Load initial data
        await Promise.all([
            socialFeed.initialize(),
            skillsManager.initialize(),
            statsManager.initialize()
        ]);
        
        // Initialize contact form
        contactManager.initialize();
        
        // Initialize smooth scrolling
        initializeSmoothScrolling();
        
        // Initialize navbar scroll effect
        initializeNavbarScroll();
        
        console.log('Application initialized successfully');
        
    } catch (error) {
        console.error('Error initializing application:', error);
    }
};

// Smooth scrolling for navigation links
const initializeSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

// Navbar scroll effect
const initializeNavbarScroll = () => {
    const navbar = document.getElementById('mainNav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
};