// Timeline component for experience and education
import { FirestoreService } from '../firebase/firestore.js';

export class TimelineManager {
    constructor() {
        this.timelineItems = [];
        this.container = document.getElementById('timeline-container');
    }
    
    async initialize() {
        try {
            // Try to load timeline from Firestore
            this.timelineItems = await FirestoreService.getCollection('timeline', 'startDate');
            
            // If no timeline in database, use default timeline
            if (this.timelineItems.length === 0) {
                this.timelineItems = this.getDefaultTimeline();
            }
            
            this.renderTimeline();
        } catch (error) {
            console.error('Error initializing timeline:', error);
            this.timelineItems = this.getDefaultTimeline();
            this.renderTimeline();
        }
    }
    
    getDefaultTimeline() {
        return [
            {
                id: 'current-role',
                title: 'Software Developer',
                company: 'Tech Company',
                location: 'Remote',
                startDate: '2023-01-01',
                endDate: null,
                type: 'work',
                description: 'Developing modern web applications and mobile solutions.',
                achievements: [
                    'Led development of 5+ web applications',
                    'Improved application performance by 40%',
                    'Mentored junior developers'
                ]
            },
            {
                id: 'education',
                title: 'Computer Science Degree',
                company: 'University',
                location: 'Scotland',
                startDate: '2020-09-01',
                endDate: '2023-06-01',
                type: 'education',
                description: 'Studied computer science with focus on software engineering.',
                achievements: [
                    'First Class Honours',
                    'Dean\'s List for 3 consecutive years',
                    'Led university coding club'
                ]
            },
            {
                id: 'internship',
                title: 'Software Development Intern',
                company: 'Startup Company',
                location: 'Edinburgh',
                startDate: '2022-06-01',
                endDate: '2022-08-01',
                type: 'work',
                description: 'Worked on full-stack development projects.',
                achievements: [
                    'Built responsive web applications',
                    'Collaborated with design team',
                    'Implemented REST APIs'
                ]
            }
        ];
    }
    
    renderTimeline() {
        if (!this.container) return;
        
        this.container.innerHTML = this.timelineItems.map((item, index) => `
            <div class="timeline-item ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'}" data-aos="fade-up">
                <div class="timeline-content">
                    <div class="timeline-icon ${item.type}">
                        <i class="fas ${item.type === 'work' ? 'fa-briefcase' : 'fa-graduation-cap'}"></i>
                    </div>
                    <div class="timeline-card">
                        <div class="timeline-header">
                            <h5 class="timeline-title">${item.title}</h5>
                            <div class="timeline-meta">
                                <span class="timeline-company">${item.company}</span>
                                <span class="timeline-location">
                                    <i class="fas fa-map-marker-alt me-1"></i>
                                    ${item.location}
                                </span>
                            </div>
                            <div class="timeline-date">
                                ${this.formatDate(item.startDate)} - ${item.endDate ? this.formatDate(item.endDate) : 'Present'}
                            </div>
                        </div>
                        <div class="timeline-body">
                            <p class="timeline-description">${item.description}</p>
                            ${item.achievements && item.achievements.length > 0 ? `
                                <ul class="timeline-achievements">
                                    ${item.achievements.map(achievement => `
                                        <li>${achievement}</li>
                                    `).join('')}
                                </ul>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short' 
        });
    }
}