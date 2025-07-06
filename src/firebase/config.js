// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
    // Replace with your Firebase config
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id",
    measurementId: "G-XXXXXXXXXX"
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