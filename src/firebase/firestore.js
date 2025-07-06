// Firestore database operations
import { 
    collection, 
    doc, 
    getDocs, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    onSnapshot,
    orderBy,
    query,
    limit,
    where
} from 'firebase/firestore';
import { db } from './config.js';

export class FirestoreService {
    // Get all documents from a collection
    static async getCollection(collectionName, orderByField = null, limitCount = null) {
        try {
            let q = collection(db, collectionName);
            
            if (orderByField) {
                q = query(q, orderBy(orderByField, 'desc'));
            }
            
            if (limitCount) {
                q = query(q, limit(limitCount));
            }
            
            const querySnapshot = await getDocs(q);
            const documents = [];
            
            querySnapshot.forEach((doc) => {
                documents.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            return documents;
        } catch (error) {
            console.error(`Error getting ${collectionName}:`, error);
            return [];
        }
    }
    
    // Add a new document
    static async addDocument(collectionName, data) {
        try {
            const docRef = await addDoc(collection(db, collectionName), {
                ...data,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            
            console.log(`Document added to ${collectionName} with ID:`, docRef.id);
            return docRef.id;
        } catch (error) {
            console.error(`Error adding document to ${collectionName}:`, error);
            throw error;
        }
    }
    
    // Update a document
    static async updateDocument(collectionName, docId, data) {
        try {
            const docRef = doc(db, collectionName, docId);
            await updateDoc(docRef, {
                ...data,
                updatedAt: new Date()
            });
            
            console.log(`Document ${docId} updated in ${collectionName}`);
        } catch (error) {
            console.error(`Error updating document in ${collectionName}:`, error);
            throw error;
        }
    }
    
    // Delete a document
    static async deleteDocument(collectionName, docId) {
        try {
            await deleteDoc(doc(db, collectionName, docId));
            console.log(`Document ${docId} deleted from ${collectionName}`);
        } catch (error) {
            console.error(`Error deleting document from ${collectionName}:`, error);
            throw error;
        }
    }
    
    // Real-time listener
    static subscribeToCollection(collectionName, callback, orderByField = null) {
        let q = collection(db, collectionName);
        
        if (orderByField) {
            q = query(q, orderBy(orderByField, 'desc'));
        }
        
        return onSnapshot(q, (querySnapshot) => {
            const documents = [];
            querySnapshot.forEach((doc) => {
                documents.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            callback(documents);
        });
    }
    
    // Get projects with filtering
    static async getProjects(category = null) {
        try {
            let q = collection(db, 'projects');
            
            if (category && category !== 'all') {
                q = query(q, where('category', '==', category));
            }
            
            q = query(q, orderBy('order', 'asc'));
            
            const querySnapshot = await getDocs(q);
            const projects = [];
            
            querySnapshot.forEach((doc) => {
                projects.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            return projects;
        } catch (error) {
            console.error('Error getting projects:', error);
            return [];
        }
    }
    
    // Submit contact form
    static async submitContactForm(formData) {
        try {
            const docRef = await addDoc(collection(db, 'contacts'), {
                ...formData,
                status: 'new',
                createdAt: new Date()
            });
            
            console.log('Contact form submitted with ID:', docRef.id);
            return docRef.id;
        } catch (error) {
            console.error('Error submitting contact form:', error);
            throw error;
        }
    }
}