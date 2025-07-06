// Skills management and visualization with icons
import { FirestoreService } from '../firebase/firestore.js';

export class SkillsManager {
    constructor() {
        this.skills = [];
        this.container = document.getElementById('skills-container');
    }
    
    async initialize() {
        try {
            // Try to load skills from Firestore
            this.skills = await FirestoreService.getCollection('skills', 'order');
            
            // If no skills in database, use default skills
            if (this.skills.length === 0) {
                this.skills = this.getDefaultSkills();
            }
            
            this.renderSkills();
        } catch (error) {
            console.error('Error initializing skills:', error);
            this.skills = this.getDefaultSkills();
            this.renderSkills();
        }
    }
    
    getDefaultSkills() {
        return [
            { 
                name: 'JavaScript', 
                level: 90, 
                color: '#f7df1e',
                icon: 'fab fa-js-square',
                experience: '3+ years'
            },
            { 
                name: 'React', 
                level: 85, 
                color: '#61dafb',
                icon: 'fab fa-react',
                experience: '2+ years'
            },
            { 
                name: 'Node.js', 
                level: 80, 
                color: '#339933',
                icon: 'fab fa-node-js',
                experience: '2+ years'
            },
            { 
                name: 'Python', 
                level: 75, 
                color: '#3776ab',
                icon: 'fab fa-python',
                experience: '2+ years'
            },
            { 
                name: 'Firebase', 
                level: 85, 
                color: '#ffca28',
                icon: 'fas fa-fire',
                experience: '1+ years'
            },
            { 
                name: 'Photography', 
                level: 95, 
                color: '#ff6b6b',
                icon: 'fas fa-camera',
                experience: '5+ years'
            },
            { 
                name: 'UI/UX Design', 
                level: 70, 
                color: '#9c27b0',
                icon: 'fas fa-palette',
                experience: '2+ years'
            },
            { 
                name: 'Git', 
                level: 85, 
                color: '#f05032',
                icon: 'fab fa-git-alt',
                experience: '3+ years'
            }
        ];
    }
    
    renderSkills() {
        if (!this.container) return;
        
        this.container.innerHTML = `
            <div class="skills-grid">
                ${this.skills.map(skill => `
                    <div class="skill-card" data-aos="fade-up">
                        <div class="skill-icon" style="color: ${skill.color}">
                            <i class="${skill.icon}"></i>
                        </div>
                        <div class="skill-info">
                            <h6 class="skill-name">${skill.name}</h6>
                            <div class="skill-meta">
                                <span class="skill-experience">${skill.experience}</span>
                                <span class="skill-percentage">${skill.level}%</span>
                            </div>
                            <div class="skill-progress">
                                <div class="skill-progress-bar" 
                                     style="--skill-color: ${skill.color}; --skill-width: ${skill.level}%">
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Animate progress bars
        this.animateProgressBars();
    }
    
    animateProgressBars() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target.querySelector('.skill-progress-bar');
                    if (progressBar) {
                        progressBar.style.width = progressBar.style.getPropertyValue('--skill-width');
                    }
                }
            });
        });
        
        document.querySelectorAll('.skill-card').forEach(item => {
            observer.observe(item);
        });
    }
}