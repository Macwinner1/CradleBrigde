const admin = require('firebase-admin');

let firebaseApp = null;

/**
 * Initialize Firebase Admin SDK
 * This allows backend to verify Firebase authentication tokens
 */
const initializeFirebase = () => {
  try {
    // Check if Firebase credentials are provided
    if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
      const serviceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      };

      firebaseApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });

      console.log('✅ Firebase Admin SDK initialized successfully');
    } else {
      console.warn('⚠️  Firebase credentials not found in environment variables');
      console.warn('⚠️  Admin authentication will use simple token validation');
    }
  } catch (error) {
    console.error('❌ Firebase initialization error:', error);
  }
};

/**
 * Get Firebase Admin instance
 */
const getFirebaseAdmin = () => {
  return firebaseApp ? admin : null;
};

/**
 * Verify Firebase ID token
 */
const verifyToken = async (idToken) => {
  try {
    if (!firebaseApp) {
      // Fallback: If Firebase Admin is not initialized, return success for development
      console.warn('Firebase Admin not initialized, skipping token verification');
      return { uid: 'dev-admin', email: 'admin@cradlebridgeschools.com' };
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    throw new Error('Invalid authentication token');
  }
};

module.exports = {
  initializeFirebase,
  getFirebaseAdmin,
  verifyToken,
};
