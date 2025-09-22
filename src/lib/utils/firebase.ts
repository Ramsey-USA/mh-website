// Utility functions for Firebase operations
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  Timestamp 
} from 'firebase/firestore';
import { getFirebaseDb } from '../firebase/config';
import type { Consultation, ProjectEstimate, Notification, TeamMember } from '../types';

// Consultation operations
export const consultationService = {
  async create(data: Omit<Consultation, 'id' | 'createdAt' | 'updatedAt'>) {
    const consultationData = {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
    
    const docRef = await addDoc(collection(getFirebaseDb(), 'consultations'), consultationData);
    return docRef.id;
  },

  async getAll() {
    const q = query(
      collection(getFirebaseDb(), 'consultations'),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
      scheduledDate: doc.data().scheduledDate.toDate(),
    })) as Consultation[];
  },

  async getByStatus(status: string) {
    const q = query(
      collection(getFirebaseDb(), 'consultations'),
      where('status', '==', status),
      orderBy('scheduledDate', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
      scheduledDate: doc.data().scheduledDate.toDate(),
    })) as Consultation[];
  },

  async update(id: string, data: Partial<Consultation>) {
    const updateData = {
      ...data,
      updatedAt: Timestamp.now(),
    };
    
    await updateDoc(doc(getFirebaseDb(), 'consultations', id), updateData);
  },

  async delete(id: string) {
    await deleteDoc(doc(getFirebaseDb(), 'consultations', id));
  }
};

// Project Estimate operations
export const estimateService = {
  async create(data: Omit<ProjectEstimate, 'id' | 'createdAt'>) {
    const estimateData = {
      ...data,
      createdAt: Timestamp.now(),
    };
    
    const docRef = await addDoc(collection(getFirebaseDb(), 'estimates'), estimateData);
    return docRef.id;
  },

  async getById(id: string) {
    const docSnapshot = await getDoc(doc(getFirebaseDb(), 'estimates', id));
    if (docSnapshot.exists()) {
      return {
        id: docSnapshot.id,
        ...docSnapshot.data(),
        createdAt: docSnapshot.data().createdAt.toDate(),
        validUntil: docSnapshot.data().validUntil.toDate(),
      } as ProjectEstimate;
    }
    return null;
  },

  async getByUser(userId: string) {
    const q = query(
      collection(getFirebaseDb(), 'estimates'),
      where('createdBy', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(10)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      validUntil: doc.data().validUntil.toDate(),
    })) as ProjectEstimate[];
  }
};

// Notification operations
export const notificationService = {
  async create(data: Omit<Notification, 'id' | 'createdAt'>) {
    const notificationData = {
      ...data,
      createdAt: Timestamp.now(),
    };
    
    const docRef = await addDoc(collection(getFirebaseDb(), 'notifications'), notificationData);
    return docRef.id;
  },

  async getUnread(userId: string) {
    const q = query(
      collection(getFirebaseDb(), 'notifications'),
      where('recipientId', '==', userId),
      where('read', '==', false),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    })) as Notification[];
  },

  async markAsRead(id: string) {
    await updateDoc(doc(getFirebaseDb(), 'notifications', id), {
      read: true,
    });
  },

  async markAllAsRead(userId: string) {
    const q = query(
      collection(getFirebaseDb(), 'notifications'),
      where('recipientId', '==', userId),
      where('read', '==', false)
    );
    const snapshot = await getDocs(q);
    
    const updatePromises = snapshot.docs.map(docSnapshot =>
      updateDoc(doc(getFirebaseDb(), 'notifications', docSnapshot.id), { read: true })
    );
    
    await Promise.all(updatePromises);
  }
};

// Team operations
export const teamService = {
  async getAll() {
    const q = query(
      collection(getFirebaseDb(), 'team'),
      where('active', '==', true),
      orderBy('name')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    })) as TeamMember[];
  },

  async getById(id: string) {
    const docSnapshot = await getDoc(doc(getFirebaseDb(), 'team', id));
    if (docSnapshot.exists()) {
      return {
        id: docSnapshot.id,
        ...docSnapshot.data(),
        createdAt: docSnapshot.data().createdAt.toDate(),
      } as TeamMember;
    }
    return null;
  }
};

// Utility functions
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export const formatDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};