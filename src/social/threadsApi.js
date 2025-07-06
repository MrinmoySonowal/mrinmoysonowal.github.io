// Threads API integration service
export class ThreadsApiService {
    constructor() {
        this.baseUrl = 'https://graph.threads.net/v1.0';
        this.accessToken = import.meta.env.VITE_THREADS_ACCESS_TOKEN;
        this.userId = 'me'; // Use 'me' for authenticated user
    }
    
    /**
     * Fetch user's Threads posts
     * @param {Object} options - Query options
     * @param {string} options.since - Start date (YYYY-MM-DD format)
     * @param {string} options.until - End date (YYYY-MM-DD format)
     * @param {number} options.limit - Number of posts to fetch (default: 10)
     * @param {string} options.after - Pagination cursor for next page
     * @param {string} options.before - Pagination cursor for previous page
     * @returns {Promise<Object>} Threads posts data
     */
    async getUserThreads(options = {}) {
        try {
            if (!this.accessToken) {
                console.warn('Threads access token not configured');
                return this.getMockThreadsData();
            }
            
            const params = new URLSearchParams({
                fields: this.getRequiredFields(),
                access_token: this.accessToken,
                limit: options.limit || 10,
                ...this.buildDateParams(options),
                ...this.buildPaginationParams(options)
            });
            
            const url = `${this.baseUrl}/${this.userId}/threads?${params}`;
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`Threads API error: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            return this.processThreadsData(data);
            
        } catch (error) {
            console.error('Error fetching Threads data:', error);
            // Fallback to mock data on error
            return this.getMockThreadsData();
        }
    }
    
    /**
     * Get required fields for Threads API
     * @returns {string} Comma-separated field names
     */
    getRequiredFields() {
        return [
            'id',
            'media_product_type',
            'media_type',
            'media_url',
            'permalink',
            'owner',
            'username',
            'text',
            'timestamp',
            'shortcode',
            'thumbnail_url',
            'children',
            'is_quote_post'
        ].join(',');
    }
    
    /**
     * Build date parameters for API request
     * @param {Object} options - Date options
     * @returns {Object} Date parameters
     */
    buildDateParams(options) {
        const params = {};
        
        if (options.since) {
            params.since = options.since;
        }
        
        if (options.until) {
            params.until = options.until;
        }
        
        return params;
    }
    
    /**
     * Build pagination parameters for API request
     * @param {Object} options - Pagination options
     * @returns {Object} Pagination parameters
     */
    buildPaginationParams(options) {
        const params = {};
        
        if (options.after) {
            params.after = options.after;
        }
        
        if (options.before) {
            params.before = options.before;
        }
        
        return params;
    }
    
    /**
     * Process and normalize Threads API response data
     * @param {Object} data - Raw API response
     * @returns {Object} Processed data
     */
    processThreadsData(data) {
        if (!data || !data.data) {
            return { posts: [], paging: null };
        }
        
        const posts = data.data.map(post => ({
            id: post.id,
            type: post.media_product_type,
            mediaType: post.media_type,
            mediaUrl: post.media_url,
            thumbnailUrl: post.thumbnail_url,
            permalink: post.permalink,
            username: post.username,
            text: post.text || '',
            timestamp: post.timestamp,
            shortcode: post.shortcode,
            isQuotePost: post.is_quote_post || false,
            children: post.children || [],
            // Additional processed fields
            formattedDate: this.formatDate(post.timestamp),
            excerpt: this.createExcerpt(post.text),
            hasMedia: !!(post.media_url || post.thumbnail_url),
            postUrl: post.permalink
        }));
        
        return {
            posts,
            paging: data.paging || null,
            hasMore: !!(data.paging && data.paging.cursors && data.paging.cursors.after)
        };
    }
    
    /**
     * Format timestamp to readable date
     * @param {string} timestamp - ISO timestamp
     * @returns {string} Formatted date
     */
    formatDate(timestamp) {
        try {
            const date = new Date(timestamp);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return 'Unknown date';
        }
    }
    
    /**
     * Create text excerpt from post content
     * @param {string} text - Full post text
     * @param {number} maxLength - Maximum excerpt length
     * @returns {string} Text excerpt
     */
    createExcerpt(text, maxLength = 150) {
        if (!text) return '';
        
        if (text.length <= maxLength) {
            return text;
        }
        
        return text.substring(0, maxLength).trim() + '...';
    }
    
    /**
     * Get mock data for development/fallback
     * @returns {Object} Mock Threads data
     */
    getMockThreadsData() {
        return {
            posts: [
                {
                    id: '1234567',
                    type: 'THREADS',
                    mediaType: 'TEXT_POST',
                    mediaUrl: null,
                    thumbnailUrl: null,
                    permalink: 'https://www.threads.net/@mrinmoy_sonowal_/post/example1',
                    username: 'mrinmoy_sonowal_',
                    text: 'Excited to share my latest project - a modern portfolio website built with Firebase and vanilla JavaScript! 🚀 #webdevelopment #javascript #firebase',
                    timestamp: '2024-01-15T10:30:00+0000',
                    shortcode: 'example1',
                    isQuotePost: false,
                    children: [],
                    formattedDate: 'Jan 15, 2024, 10:30 AM',
                    excerpt: 'Excited to share my latest project - a modern portfolio website built with Firebase and vanilla JavaScript! 🚀',
                    hasMedia: false,
                    postUrl: 'https://www.threads.net/@mrinmoy_sonowal_/post/example1'
                },
                {
                    id: '2345678',
                    type: 'THREADS',
                    mediaType: 'IMAGE',
                    mediaUrl: '/assets/images/Edinburgh.jpg',
                    thumbnailUrl: '/assets/images/Edinburgh.jpg',
                    permalink: 'https://www.threads.net/@mrinmoy_sonowal_/post/example2',
                    username: 'mrinmoy_sonowal_',
                    text: 'Beautiful sunset captured during my recent photography session in Edinburgh. Nature never fails to inspire! 📸 #photography #edinburgh #scotland',
                    timestamp: '2024-01-12T18:45:00+0000',
                    shortcode: 'example2',
                    isQuotePost: false,
                    children: [],
                    formattedDate: 'Jan 12, 2024, 6:45 PM',
                    excerpt: 'Beautiful sunset captured during my recent photography session in Edinburgh. Nature never fails to inspire! 📸',
                    hasMedia: true,
                    postUrl: 'https://www.threads.net/@mrinmoy_sonowal_/post/example2'
                },
                {
                    id: '3456789',
                    type: 'THREADS',
                    mediaType: 'TEXT_POST',
                    mediaUrl: null,
                    thumbnailUrl: null,
                    permalink: 'https://www.threads.net/@mrinmoy_sonowal_/post/example3',
                    username: 'mrinmoy_sonowal_',
                    text: 'Just completed a fascinating course on advanced web development. Always learning, always growing! 📚 The tech industry moves fast, but that\'s what makes it exciting. #learning #webdev #growth',
                    timestamp: '2024-01-10T14:20:00+0000',
                    shortcode: 'example3',
                    isQuotePost: false,
                    children: [],
                    formattedDate: 'Jan 10, 2024, 2:20 PM',
                    excerpt: 'Just completed a fascinating course on advanced web development. Always learning, always growing! 📚 The tech industry moves fast...',
                    hasMedia: false,
                    postUrl: 'https://www.threads.net/@mrinmoy_sonowal_/post/example3'
                }
            ],
            paging: {
                cursors: {
                    before: 'BEFORE_CURSOR_EXAMPLE',
                    after: 'AFTER_CURSOR_EXAMPLE'
                }
            },
            hasMore: true
        };
    }
    
    /**
     * Get user profile information
     * @returns {Promise<Object>} User profile data
     */
    async getUserProfile() {
        try {
            if (!this.accessToken) {
                return this.getMockProfileData();
            }
            
            const params = new URLSearchParams({
                fields: 'id,username,name,threads_profile_picture_url,threads_biography',
                access_token: this.accessToken
            });
            
            const url = `${this.baseUrl}/${this.userId}?${params}`;
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Threads API error: ${response.status}`);
            }
            
            return await response.json();
            
        } catch (error) {
            console.error('Error fetching Threads profile:', error);
            return this.getMockProfileData();
        }
    }
    
    /**
     * Get mock profile data
     * @returns {Object} Mock profile data
     */
    getMockProfileData() {
        return {
            id: 'mock_user_id',
            username: 'mrinmoy_sonowal_',
            name: 'Mrinmoy Sonowal',
            threads_profile_picture_url: '/assets/images/DSC_7620.JPG',
            threads_biography: 'Software Developer & Photographer | Creating digital experiences that matter'
        };
    }
}

// Export singleton instance
export const threadsApi = new ThreadsApiService();