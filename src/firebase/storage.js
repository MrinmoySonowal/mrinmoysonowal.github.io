// Firebase Storage operations
import { 
    ref, 
    uploadBytes, 
    getDownloadURL, 
    listAll, 
    deleteObject 
} from 'firebase/storage';
import { storage } from './config.js';

export class StorageService {
    // Upload file to storage
    static async uploadFile(file, path) {
        try {
            const storageRef = ref(storage, path);
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            
            console.log('File uploaded successfully:', downloadURL);
            return downloadURL;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    }
    
    // Get all files from a folder
    static async getFilesFromFolder(folderPath) {
        try {
            const folderRef = ref(storage, folderPath);
            const result = await listAll(folderRef);
            
            const files = await Promise.all(
                result.items.map(async (itemRef) => {
                    const url = await getDownloadURL(itemRef);
                    return {
                        name: itemRef.name,
                        url: url,
                        path: itemRef.fullPath
                    };
                })
            );
            
            return files;
        } catch (error) {
            console.error('Error getting files from folder:', error);
            return [];
        }
    }
    
    // Delete file from storage
    static async deleteFile(filePath) {
        try {
            const fileRef = ref(storage, filePath);
            await deleteObject(fileRef);
            console.log('File deleted successfully');
        } catch (error) {
            console.error('Error deleting file:', error);
            throw error;
        }
    }
    
    // Get gallery images
    static async getGalleryImages() {
        try {
            const images = await this.getFilesFromFolder('gallery/');
            return images.sort((a, b) => a.name.localeCompare(b.name));
        } catch (error) {
            console.error('Error getting gallery images:', error);
            return [];
        }
    }
    
    // Get project images
    static async getProjectImages(projectId) {
        try {
            const images = await this.getFilesFromFolder(`projects/${projectId}/`);
            return images;
        } catch (error) {
            console.error('Error getting project images:', error);
            return [];
        }
    }
}