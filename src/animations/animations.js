// Animation initialization and management
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';
import Typed from 'typed.js';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export const initializeAnimations = () => {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    // Initialize typing animation
    initializeTypingAnimation();
    
    // Initialize GSAP animations
    initializeGSAPAnimations();
    
    // Initialize scroll animations
    initializeScrollAnimations();
};

const initializeTypingAnimation = () => {
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        new Typed(typedElement, {
            strings: [
                'Software Developer',
                'Creative Photographer',
                'Problem Solver',
                'Tech Enthusiast'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
};

const initializeGSAPAnimations = () => {
    // Hero section animations
    const heroTl = gsap.timeline();
    
    heroTl.from('.hero-title', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    })
    .from('.hero-subtitle', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-description', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power3.out'
    }, '-=0.3')
    .from('.hero-buttons', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power3.out'
    }, '-=0.3')
    .from('.social-links .social-link', {
        duration: 0.5,
        y: 20,
        opacity: 0,
        stagger: 0.1,
        ease: 'power3.out'
    }, '-=0.3');
    
    // Profile image animation
    gsap.from('.profile-image', {
        duration: 1.2,
        scale: 0.8,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.5
    });
    
    // Floating animation for profile image
    gsap.to('.profile-image', {
        duration: 3,
        y: -10,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
    });
};

const initializeScrollAnimations = () => {
    // Navbar background animation
    ScrollTrigger.create({
        trigger: 'body',
        start: 'top -100px',
        end: 'bottom bottom',
        onEnter: () => {
            gsap.to('#mainNav', {
                duration: 0.3,
                backgroundColor: 'rgba(13, 110, 253, 0.95)',
                backdropFilter: 'blur(10px)'
            });
        },
        onLeaveBack: () => {
            gsap.to('#mainNav', {
                duration: 0.3,
                backgroundColor: 'transparent',
                backdropFilter: 'none'
            });
        }
    });
    
    // Section reveal animations
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // Project cards stagger animation
    ScrollTrigger.create({
        trigger: '#projects-container',
        start: 'top 80%',
        onEnter: () => {
            gsap.from('.project-item', {
                duration: 0.8,
                y: 50,
                opacity: 0,
                stagger: 0.2,
                ease: 'power3.out'
            });
        }
    });
    
    // Timeline animations
    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
        gsap.from(item, {
            duration: 1,
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
};

// Utility function to animate elements on scroll
export const animateOnScroll = (selector, animation) => {
    gsap.utils.toArray(selector).forEach(element => {
        gsap.from(element, {
            ...animation,
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
};