// Social media feed integration
export class SocialFeedManager {
    constructor() {
        this.linkedinContainer = document.getElementById('linkedin-posts');
        this.instagramContainer = document.getElementById('instagram-posts');
    }
    
    async initialize() {
        try {
            await Promise.all([
                this.loadLinkedInFeed(),
                this.loadInstagramFeed()
            ]);
        } catch (error) {
            console.error('Error initializing social feeds:', error);
        }
    }
    
    async loadLinkedInFeed() {
        try {
            // In a real implementation, you would use LinkedIn API
            // For demo purposes, we'll use mock data
            const posts = this.getMockLinkedInPosts();
            this.renderLinkedInPosts(posts);
        } catch (error) {
            console.error('Error loading LinkedIn feed:', error);
            this.renderLinkedInError();
        }
    }
    
    async loadInstagramFeed() {
        try {
            // In a real implementation, you would use Instagram Basic Display API
            // For demo purposes, we'll use mock data
            const posts = this.getMockInstagramPosts();
            this.renderInstagramPosts(posts);
        } catch (error) {
            console.error('Error loading Instagram feed:', error);
            this.renderInstagramError();
        }
    }
    
    getMockLinkedInPosts() {
        return [
            {
                id: '1',
                content: 'Excited to share my latest project - a modern portfolio website built with Firebase and vanilla JavaScript! 🚀',
                date: '2024-01-15',
                likes: 42,
                comments: 8,
                shares: 5,
                url: 'https://linkedin.com/posts/mrinmoys'
            },
            {
                id: '2',
                content: 'Just completed a fascinating course on advanced web development. Always learning, always growing! 📚',
                date: '2024-01-10',
                likes: 28,
                comments: 12,
                shares: 3,
                url: 'https://linkedin.com/posts/mrinmoys'
            },
            {
                id: '3',
                content: 'Beautiful sunset captured during my recent photography session in Edinburgh. Nature never fails to inspire! 📸',
                date: '2024-01-05',
                likes: 67,
                comments: 15,
                shares: 8,
                url: 'https://linkedin.com/posts/mrinmoys'
            }
        ];
    }
    
    getMockInstagramPosts() {
        return [
            {
                id: '1',
                image: '/assets/images/Edinburgh.jpg',
                caption: 'Edinburgh skyline at golden hour ✨ #photography #edinburgh #scotland',
                date: '2024-01-12',
                likes: 156,
                comments: 23,
                url: 'https://instagram.com/p/example1'
            },
            {
                id: '2',
                image: '/assets/images/St_Andrews.jpg',
                caption: 'Peaceful morning at St Andrews 🌅 #stAndrews #scotland #landscape',
                date: '2024-01-08',
                likes: 89,
                comments: 12,
                url: 'https://instagram.com/p/example2'
            },
            {
                id: '3',
                image: '/assets/images/Assam_tree.jpg',
                caption: 'The beauty of Assam never ceases to amaze me 🌳 #assam #india #nature',
                date: '2024-01-03',
                likes: 203,
                comments: 34,
                url: 'https://instagram.com/p/example3'
            }
        ];
    }
    
    renderLinkedInPosts(posts) {
        if (!this.linkedinContainer) return;
        
        this.linkedinContainer.innerHTML = posts.map(post => `
            <div class="col-md-6 col-lg-4 mb-4" data-aos="fade-up">
                <div class="social-post linkedin-post">
                    <div class="social-post-header">
                        <div class="social-platform">
                            <i class="fab fa-linkedin text-primary"></i>
                            <span>LinkedIn</span>
                        </div>
                        <div class="social-date">${this.formatDate(post.date)}</div>
                    </div>
                    <div class="social-post-content">
                        <p>${post.content}</p>
                    </div>
                    <div class="social-post-stats">
                        <div class="social-stat">
                            <i class="fas fa-thumbs-up"></i>
                            <span>${post.likes}</span>
                        </div>
                        <div class="social-stat">
                            <i class="fas fa-comment"></i>
                            <span>${post.comments}</span>
                        </div>
                        <div class="social-stat">
                            <i class="fas fa-share"></i>
                            <span>${post.shares}</span>
                        </div>
                    </div>
                    <div class="social-post-actions">
                        <a href="${post.url}" target="_blank" class="btn btn-outline-primary btn-sm">
                            View on LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    renderInstagramPosts(posts) {
        if (!this.instagramContainer) return;
        
        this.instagramContainer.innerHTML = posts.map(post => `
            <div class="col-md-6 col-lg-4 mb-4" data-aos="fade-up">
                <div class="social-post instagram-post">
                    <div class="social-post-header">
                        <div class="social-platform">
                            <i class="fab fa-instagram text-danger"></i>
                            <span>Instagram</span>
                        </div>
                        <div class="social-date">${this.formatDate(post.date)}</div>
                    </div>
                    <div class="social-post-image">
                        <img src="${post.image}" alt="Instagram post" class="img-fluid">
                    </div>
                    <div class="social-post-content">
                        <p>${post.caption}</p>
                    </div>
                    <div class="social-post-stats">
                        <div class="social-stat">
                            <i class="fas fa-heart"></i>
                            <span>${post.likes}</span>
                        </div>
                        <div class="social-stat">
                            <i class="fas fa-comment"></i>
                            <span>${post.comments}</span>
                        </div>
                    </div>
                    <div class="social-post-actions">
                        <a href="${post.url}" target="_blank" class="btn btn-outline-danger btn-sm">
                            View on Instagram
                        </a>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    renderLinkedInError() {
        if (this.linkedinContainer) {
            this.linkedinContainer.innerHTML = `
                <div class="col-12 text-center">
                    <div class="social-error">
                        <i class="fab fa-linkedin fa-3x text-muted mb-3"></i>
                        <p>Unable to load LinkedIn posts at the moment.</p>
                        <a href="https://uk.linkedin.com/in/mrinmoys" target="_blank" class="btn btn-primary">
                            Visit LinkedIn Profile
                        </a>
                    </div>
                </div>
            `;
        }
    }
    
    renderInstagramError() {
        if (this.instagramContainer) {
            this.instagramContainer.innerHTML = `
                <div class="col-12 text-center">
                    <div class="social-error">
                        <i class="fab fa-instagram fa-3x text-muted mb-3"></i>
                        <p>Unable to load Instagram posts at the moment.</p>
                        <a href="https://www.instagram.com/mrinmoy_sonowal_" target="_blank" class="btn btn-danger">
                            Visit Instagram Profile
                        </a>
                    </div>
                </div>
            `;
        }
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }
}