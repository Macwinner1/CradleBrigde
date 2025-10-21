# 🔥 Firebase Quick Reference Card

## ✅ Setup Status: COMPLETE

Your Firebase is **working perfectly**! Both frontend and backend are configured and tested.

---

## 📋 Quick Commands

### Start Your Application
```bash
# Backend (Terminal 1)
cd backend
npm start

# Frontend (Terminal 2)
cd frontend
npm start
```

### Test Firebase Connection
```bash
# Test frontend
cd frontend && node test-firebase.js

# Test backend
cd backend && node test-firebase.js

# Test full integration
node test-integration.js
```

---

## 🔑 Your Firebase Credentials

**Project:** cradle-bridge  
**Auth Domain:** cradle-bridge.firebaseapp.com  
**Console:** https://console.firebase.google.com/project/cradle-bridge

**Services Enabled:**
- ✅ Authentication
- ✅ Firestore Database
- ✅ Cloud Storage

---

## 💻 Usage Examples

### Frontend - Authentication
```javascript
import { auth } from './services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Sign in
await signInWithEmailAndPassword(auth, email, password);

// Sign up
await createUserWithEmailAndPassword(auth, email, password);

// Sign out
await signOut(auth);

// Get current user
const user = auth.currentUser;
```

### Frontend - Firestore
```javascript
import { db } from './services/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

// Add document
const docRef = await addDoc(collection(db, 'applications'), {
  name: 'John Doe',
  email: 'john@example.com',
  createdAt: new Date()
});

// Get documents
const snapshot = await getDocs(collection(db, 'applications'));
snapshot.forEach(doc => {
  console.log(doc.id, doc.data());
});
```

### Frontend - Storage
```javascript
import { storage } from './services/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Upload file
const storageRef = ref(storage, `uploads/${file.name}`);
await uploadBytes(storageRef, file);

// Get download URL
const url = await getDownloadURL(storageRef);
```

### Frontend - API Calls (with auto auth)
```javascript
import { applicationsAPI, blogAPI } from './services/api';

// Automatically includes Firebase auth token
await applicationsAPI.submit(formData);
await blogAPI.getAll();
```

---

## 🎯 Test Results

### ✅ Frontend Firebase
- Firebase App: **Connected**
- Authentication: **Ready**
- Firestore: **Ready**
- Storage: **Ready**

### ✅ Backend
- Server: **Configured**
- API Routes: **Ready**
- Firebase Admin: **Development Mode**
- CORS: **Configured**

---

## 🌐 Access URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000/api |
| Admin Login | http://localhost:3000/admin/login |
| API Health | http://localhost:5000/api/health |

---

## 📁 Environment Files

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_FIREBASE_API_KEY=AIzaSyBx4awnectSFe5AAEcKwdcQVfWCv61NlXM
REACT_APP_FIREBASE_AUTH_DOMAIN=cradle-bridge.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=cradle-bridge
REACT_APP_FIREBASE_STORAGE_BUCKET=cradle-bridge.firebasestorage.app
```

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

---

## 📚 Documentation Files

- `FIREBASE_TEST_REPORT.md` - Detailed test results
- `FIREBASE_VERIFICATION_COMPLETE.md` - Complete verification guide
- `frontend/test-firebase.js` - Frontend test script
- `backend/test-firebase.js` - Backend test script
- `test-integration.js` - Full integration test

---

## 🚀 Ready to Use!

Your Firebase setup is **complete and verified**. Start building your application with confidence!

**Happy Coding! 🎉**
