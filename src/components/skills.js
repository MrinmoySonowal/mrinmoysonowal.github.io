// Skills management and visualization
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
            { name: 'JavaScript', level: 90, color: '#f7df1e' },
            { name: 'React', level: 85, color: '#61dafb' },
            { name: 'Node.js', level: 80, color: '#339933' },
            { name: 'Python', level: 75, color: '#3776ab' },
            { name: 'Firebase', level: 85, color: '#ffca28' },
            { name: 'Photography', level: 95, color: '#ff6b6b' },
            { name: 'UI/UX Design', level: 70, color: '#9c27b0' },
            { name: 'MongoDB', level: 75, color: '#47a248' }
        ];
    }
    
    renderSkills() {
        if (!this.container) return;
        
        this.container.innerHTML = this.skills.map(skill => `
            <div class="skill-item mb-3" data-aos="fade-up">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="skill-name">${skill.name}</span>
                    <span class="skill-percentage">${skill.level}%</span>
                </div>
                <div class="skill-progress">
                    <div class="skill-progress-bar" 
                         style="--skill-color: ${skill.color}; --skill-width: ${skill.level}%">
                    </div>
                </div>
            </div>
        `).join('');
        
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
        
        document.querySelectorAll('.skill-item').forEach(item => {
            observer.observe(item);
        });
    }
}