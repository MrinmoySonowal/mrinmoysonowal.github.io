// Social media feed integration
import { threadsApi } from './threadsApi.js';

export class SocialFeedManager {
    constructor() {
        this.linkedinContainer = document.getElementById('linkedin-posts');
        this.instagramContainer = document.getElementById('instagram-posts');
        this.threadsContainer = document.getElementById('threads-posts');
        this.loadingStates = new Map();
    }
    
    async initialize() {
        try {
            await Promise.all([
                this.loadThreadsFeed(),
                this.loadLinkedInFeed(),
                this.loadInstagramFeed()
            ]);
        } catch (error) {
            console.error('Error initializing social feeds:', error);
        }
    }
    
    /**
     * Load Threads feed using the new API service
     */
    async loadThreadsFeed() {
        try {
            this.setLoadingState('threads', true);
            
            // Fetch recent threads (last 30 days)
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            
            const options = {
                since: thirtyDaysAgo.toISOString().split('T')[0],
                limit: 6
            };
            
            const threadsData = await threadsApi.getUserThreads(options);
            this.renderThreadsPosts(threadsData.posts);
            
        } catch (error) {
            console.error('Error loading Threads feed:', error);
            this.renderThreadsError();
        } finally {
            this.setLoadingState('threads', false);
        }
    }
    
    /**
     * Render Threads posts
     * @param {Array} posts - Array of Threads posts
     */
    renderThreadsPosts(posts) {
        if (!this.threadsContainer) return;
        
        this.threadsContainer.innerHTML = posts.map(post => `
            <div class="col-md-6 col-lg-4 mb-4" data-aos="fade-up">
                <div class="social-post threads-post">
                    <div class="social-post-header">
                        <div class="social-platform">
                            <i class="fab fa-threads text-dark"></i>
                            <span>Threads</span>
                        </div>
                        <div class="social-date">${post.formattedDate}</div>
                    </div>
                    
                    ${post.hasMedia ? `
                        <div class="social-post-image">
                            <img src="${post.mediaUrl || post.thumbnailUrl}" 
                                 alt="Threads post media" 
                                 class="img-fluid"
                                 loading="lazy">
                        </div>
                    ` : ''}
                    
                    <div class="social-post-content">
                        <p>${this.formatPostText(post.text)}</p>
                        ${post.isQuotePost ? '<span class="quote-indicator">📝 Quote Post</span>' : ''}
                    </div>
                    
                    <div class="social-post-meta">
                        <div class="post-type">
                            <span class="badge bg-secondary">${post.mediaType.replace('_', ' ')}</span>
                        </div>
                        ${post.children && post.children.length > 0 ? `
                            <div class="post-children">
                                <span class="badge bg-info">${post.children.length} attachment${post.children.length > 1 ? 's' : ''}</span>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="social-post-actions">
                        <a href="${post.postUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-dark btn-sm">
                            <i class="fas fa-external-link-alt me-1"></i>
                            View on Threads
                        </a>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    /**
     * Format post text with hashtags and mentions
     * @param {string} text - Raw post text
     * @returns {string} Formatted HTML text
     */
    formatPostText(text) {
        if (!text) return '';
        
        // Convert hashtags to styled spans
        text = text.replace(/#(\w+)/g, '<span class="hashtag">#$1</span>');
        
        // Convert mentions to styled spans
        text = text.replace(/@(\w+)/g, '<span class="mention">@$1</span>');
        
        // Convert URLs to links
        text = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
        
        return text;
    }
    
    /**
     * Render Threads error state
     */
    renderThreadsError() {
        if (this.threadsContainer) {
            this.threadsContainer.innerHTML = `
                <div class="col-12 text-center">
                    <div class="social-error">
                        <i class="fab fa-threads fa-3x text-muted mb-3"></i>
                        <p>Unable to load Threads posts at the moment.</p>
                        <a href="https://www.threads.net/@mrinmoy_sonowal_" target="_blank" rel="noopener noreferrer" class="btn btn-dark">
                            <i class="fab fa-threads me-2"></i>
                            Visit Threads Profile
                        </a>
                    </div>
                </div>
            `;
        }
    }
    
    async loadLinkedInFeed() {
        try {
            this.setLoadingState('linkedin', true);
            // In a real implementation, you would use LinkedIn API
            // For demo purposes, we'll use mock data
            const posts = this.getMockLinkedInPosts();
            this.renderLinkedInPosts(posts);
        } catch (error) {
            console.error('Error loading LinkedIn feed:', error);
            this.renderLinkedInError();
        } finally {
            this.setLoadingState('linkedin', false);
        }
    }
    
    async loadInstagramFeed() {
        try {
            this.setLoadingState('instagram', true);
            // In a real implementation, you would use Instagram Basic Display API
            // For demo purposes, we'll use mock data
            const posts = this.getMockInstagramPosts();
            this.renderInstagramPosts(posts);
        } catch (error) {
            console.error('Error loading Instagram feed:', error);
            this.renderInstagramError();
        } finally {
            this.setLoadingState('instagram', false);
        }
    }
    
    /**
     * Set loading state for a social platform
     * @param {string} platform - Platform name
     * @param {boolean} isLoading - Loading state
     */
    setLoadingState(platform, isLoading) {
        this.loadingStates.set(platform, isLoading);
        
        const container = this.getContainerByPlatform(platform);
        if (container && isLoading) {
            container.innerHTML = `
                <div class="col-12 text-center">
                    <div class="social-loading">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <p class="mt-2">Loading ${platform} posts...</p>
                    </div>
                </div>
            `;
        }
    }
    
    /**
     * Get container element by platform name
     * @param {string} platform - Platform name
     * @returns {HTMLElement|null} Container element
     */
    getContainerByPlatform(platform) {
        switch (platform) {
            case 'threads':
                return this.threadsContainer;
            case 'linkedin':
                return this.linkedinContainer;
            case 'instagram':
                return this.instagramContainer;
            default:
                return null;
        }
    }
    
    /**
     * Refresh all social feeds
     */
    async refreshFeeds() {
        await this.initialize();
    }
    
    /**
     * Refresh specific platform feed
     * @param {string} platform - Platform to refresh
     */
    async refreshPlatform(platform) {
        switch (platform) {
            case 'threads':
                await this.loadThreadsFeed();
                break;
            case 'linkedin':
                await this.loadLinkedInFeed();
                break;
            case 'instagram':
                await this.loadInstagramFeed();
                break;
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
                        <img src="${post.image}" alt="Instagram post" class="img-fluid" loading="lazy">
                    </div>
                    <div class="social-post-content">
                        <p>${this.formatPostText(post.caption)}</p>
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