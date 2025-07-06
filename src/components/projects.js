// Projects management and filtering
import { FirestoreService } from '../firebase/firestore.js';
import { StorageService } from '../firebase/storage.js';

export class ProjectManager {
    constructor() {
        this.projects = [];
        this.currentFilter = 'all';
        this.container = document.getElementById('projects-container');
        this.filterButtons = document.querySelectorAll('.filter-btn');
    }
    
    async initialize() {
        try {
            // Try to load projects from Firestore
            this.projects = await FirestoreService.getProjects();
            
            // If no projects in database, use default projects
            if (this.projects.length === 0) {
                this.projects = await this.getDefaultProjects();
            }
            
            this.renderProjects();
            this.initializeFilters();
        } catch (error) {
            console.error('Error initializing projects:', error);
            this.projects = await this.getDefaultProjects();
            this.renderProjects();
            this.initializeFilters();
        }
    }
    
    async getDefaultProjects() {
        return [
            {
                id: 'portfolio-website',
                title: 'Portfolio Website',
                description: 'A modern, responsive portfolio website built with Firebase and vanilla JavaScript.',
                category: 'web',
                technologies: ['JavaScript', 'Firebase', 'Bootstrap', 'GSAP'],
                image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
                demoUrl: '#',
                githubUrl: '#',
                featured: true
            },
            {
                id: 'mobile-app',
                title: 'Mobile Photography App',
                description: 'A mobile app for photographers to manage and showcase their work.',
                category: 'mobile',
                technologies: ['React Native', 'Firebase', 'Redux'],
                image: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=800',
                demoUrl: '#',
                githubUrl: '#',
                featured: true
            },
            {
                id: 'landscape-series',
                title: 'Landscape Photography Series',
                description: 'A collection of landscape photographs from Scotland and India.',
                category: 'photography',
                technologies: ['Photography', 'Lightroom', 'Photoshop'],
                image: '/assets/images/Edinburgh.jpg',
                demoUrl: '#',
                featured: true
            }
        ];
    }
    
    renderProjects() {
        if (!this.container) return;
        
        const filteredProjects = this.currentFilter === 'all' 
            ? this.projects 
            : this.projects.filter(project => project.category === this.currentFilter);
        
        this.container.innerHTML = filteredProjects.map(project => `
            <div class="col-lg-4 col-md-6 mb-4 project-item" data-category="${project.category}" data-aos="fade-up">
                <div class="project-card">
                    <div class="project-image">
                        <img src="${project.image}" alt="${project.title}" class="img-fluid">
                        <div class="project-overlay">
                            <div class="project-actions">
                                ${project.demoUrl ? `<a href="${project.demoUrl}" target="_blank" class="btn btn-primary btn-sm me-2">
                                    <i class="fas fa-external-link-alt"></i> Demo
                                </a>` : ''}
                                ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="btn btn-outline-light btn-sm">
                                    <i class="fab fa-github"></i> Code
                                </a>` : ''}
                            </div>
                        </div>
                    </div>
                    <div class="project-content">
                        <h5 class="project-title">${project.title}</h5>
                        <p class="project-description">${project.description}</p>
                        <div class="project-technologies">
                            ${project.technologies.map(tech => `
                                <span class="tech-tag">${tech}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    initializeFilters() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Update active button
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Update current filter
                this.currentFilter = button.dataset.filter;
                
                // Re-render projects
                this.renderProjects();
            });
        });
    }
}