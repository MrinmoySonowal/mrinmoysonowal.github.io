// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "AIzaSyBsE7J9dLbkNIXPx_6u_7Vjnxggjbv9vus",
  authDomain: "personal-web-65cf6.firebaseapp.com",
  projectId: "personal-web-65cf6",
  storageBucket: "personal-web-65cf6.firebasestorage.app",
  messagingSenderId: "207741318712",
  appId: "1:207741318712:web:d3e03a86fec172c1c3d8cd"
};

let app;
let db;
let storage;
let analytics;

export const initializeFirebase = async () => {
    try {
        // Initialize Firebase
        app = initializeApp(firebaseConfig);
        
        // Initialize Firestore
        db = getFirestore(app);
        
        // Initialize Storage
        storage = getStorage(app);
        
        // Initialize Analytics (only in production)
        if (window.location.hostname !== 'localhost') {
            analytics = getAnalytics(app);
        }
        
        console.log('Firebase initialized successfully');
        return { app, db, storage, analytics };
    } catch (error) {
        console.error('Error initializing Firebase:', error);
        throw error;
    }
};

export { app, db, storage, analytics };