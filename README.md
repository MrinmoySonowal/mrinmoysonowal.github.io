# Mrinmoy Sonowal - Portfolio Website

A modern, dynamic portfolio website showcasing my work as a Software Developer and Photographer. Built with vanilla JavaScript, Firebase, and modern web technologies.

## 🌟 Features

- **Modern Design**: Responsive design with dark/light mode toggle
- **Dynamic Content**: Firebase integration for real-time content management
- **Social Integration**: Live feeds from LinkedIn and Threads
- **Interactive Animations**: GSAP and AOS animations for smooth user experience
- **Contact Management**: Firebase-powered contact form with email notifications
- **Performance Optimized**: Lazy loading, code splitting, and PWA capabilities
- **SEO Friendly**: Optimized meta tags and structured data

## 🚀 Live Demo

**Production Site**: [https://sunny-cucurucho-407683.netlify.app](https://sunny-cucurucho-407683.netlify.app)

## 🛠️ Tech Stack

### Frontend
- **Vanilla JavaScript** (ES6+)
- **Bootstrap 5** for responsive design
- **GSAP** for advanced animations
- **AOS** (Animate On Scroll) for scroll animations
- **Typed.js** for typing animations
- **Particles.js** for background effects
- **Chart.js** for data visualization

### Backend & Services
- **Firebase**
  - Firestore (Database)
  - Storage (File storage)
  - Analytics (User tracking)
- **Netlify** (Hosting & Deployment)

### APIs & Integrations
- **Threads API** for social media feed
- **LinkedIn API** for professional updates
- **EmailJS** for contact form submissions

## 📁 Project Structure

```
├── src/
│   ├── animations/          # Animation configurations
│   ├── app/                 # Main application logic
│   ├── components/          # Reusable components
│   ├── effects/             # Visual effects (particles, etc.)
│   ├── firebase/            # Firebase configuration and services
│   ├── social/              # Social media integrations
│   └── utils/               # Utility functions
├── assets/
│   ├── css/                 # Stylesheets
│   ├── js/                  # Legacy JavaScript files
│   ├── images/              # Image assets
│   └── html/                # HTML partials
├── dist/                    # Built files for production
├── index.html               # Main HTML file
├── style.css                # Main stylesheet
├── manifest.json            # PWA manifest
└── vite.config.js           # Vite configuration
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account
- Threads API access token
- LinkedIn API credentials (optional)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/mrinmoysonowal/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Setup**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Firestore Database
   - Enable Storage
   - Enable Analytics
   - Copy your Firebase config and update `src/firebase/config.js`

4. **Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_THREADS_ACCESS_TOKEN=your_threads_access_token
   VITE_LINKEDIN_ACCESS_TOKEN=your_linkedin_access_token
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

## 🔑 API Configuration

### Threads API Setup

1. **Get Access Token**
   - Visit [Threads API Documentation](https://developers.facebook.com/docs/threads)
   - Create a Threads app and get your access token
   - Add the token to your environment variables

2. **API Endpoints Used**
   ```
   GET https://graph.threads.net/v1.0/me/threads
   ```

3. **Required Fields**
   - `id`, `media_product_type`, `media_type`, `media_url`
   - `permalink`, `owner`, `username`, `text`, `timestamp`
   - `shortcode`, `thumbnail_url`, `is_quote_post`

### LinkedIn API Setup (Optional)

1. **Create LinkedIn App**
   - Go to [LinkedIn Developer Portal](https://developer.linkedin.com)
   - Create a new app and get your credentials
   - Request access to LinkedIn Share API

2. **Configure Permissions**
   - `r_liteprofile` - Basic profile info
   - `r_emailaddress` - Email address
   - `w_member_social` - Share content

## 🚀 Deployment

### Netlify Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add environment variables in Netlify dashboard

3. **Custom Domain (Optional)**
   - Add your custom domain in Netlify settings
   - Configure DNS records as instructed

### Manual Deployment

1. **Build and upload**
   ```bash
   npm run build
   # Upload dist/ folder to your hosting provider
   ```

## 📊 Features Overview

### Dynamic Content Management
- **Projects**: Managed through Firebase Firestore
- **Skills**: Dynamic skill bars with progress animation
- **Timeline**: Work experience and education timeline
- **Gallery**: Images stored in Firebase Storage

### Social Media Integration
- **Threads Feed**: Real-time posts from Threads API
- **LinkedIn Updates**: Professional posts and articles
- **Instagram**: Photography showcase (manual curation)

### Performance Features
- **Lazy Loading**: Images and content load on demand
- **Code Splitting**: Optimized bundle sizes
- **Service Worker**: Offline functionality
- **Image Optimization**: Automatic image compression

### Analytics & Tracking
- **Firebase Analytics**: User behavior tracking
- **Contact Form Analytics**: Submission tracking
- **Performance Monitoring**: Core Web Vitals
- **Social Engagement**: Click tracking on social links

## 🎨 Customization

### Themes
- Light/Dark mode toggle
- Custom CSS variables for easy theming
- Responsive design for all devices

### Content Updates
- **Projects**: Add/edit through Firebase console
- **Skills**: Update skill levels and add new technologies
- **Social Posts**: Automatic updates via API integration
- **Contact Info**: Centralized in Firebase configuration

## 🔒 Security & Privacy

### Data Protection
- **GDPR Compliance**: Cookie consent and data handling
- **Secure APIs**: Environment variables for sensitive data
- **Rate Limiting**: Contact form submission limits
- **Input Validation**: XSS and injection protection

### Firebase Security Rules
```javascript
// Firestore Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /projects/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /contacts/{document} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

## 📈 Performance Metrics

### Target Scores
- **Lighthouse Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 95+
- **SEO**: 95+
- **Page Load Speed**: < 3 seconds

### Optimization Techniques
- Image compression and WebP format
- CSS and JavaScript minification
- Critical CSS inlining
- Resource preloading
- CDN usage for static assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Mrinmoy Sonowal**
- **Email**: mrinmoy.mly.sonowal@gmail.com
- **LinkedIn**: [linkedin.com/in/mrinmoys](https://uk.linkedin.com/in/mrinmoys)
- **Instagram**: [@mrinmoy_sonowal_](https://www.instagram.com/mrinmoy_sonowal_)
- **GitHub**: [github.com/mrinmoysonowal](https://github.com/mrinmoysonowal)

## 🙏 Acknowledgments

- **Bootstrap** for the responsive framework
- **Firebase** for backend services
- **GSAP** for smooth animations
- **Netlify** for hosting and deployment
- **Unsplash/Pexels** for placeholder images
- **Font Awesome** for icons
- **Google Fonts** for typography

---

⭐ **Star this repository if you found it helpful!**

Built with ❤️ by Mrinmoy Sonowal