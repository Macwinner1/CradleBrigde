/**
 * Firebase Storage Test Script
 * Tests Firebase Storage configuration and upload functionality
 */

import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

console.log(colors.cyan + '\n🔥 Firebase Storage Test\n' + colors.reset);

// Load environment variables
const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};

envContent.split('\n').forEach(line => {
  const trimmedLine = line.trim();
  if (trimmedLine && !trimmedLine.startsWith('#')) {
    const [key, ...valueParts] = trimmedLine.split('=');
    if (key && valueParts.length > 0) {
      env[key.trim()] = valueParts.join('=').trim();
    }
  }
});

const firebaseConfig = {
  apiKey: env.REACT_APP_FIREBASE_API_KEY,
  authDomain: env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.REACT_APP_FIREBASE_APP_ID,
};

console.log(colors.blue + '📋 Firebase Configuration:' + colors.reset);
console.log('   Project ID:', firebaseConfig.projectId);
console.log('   Storage Bucket:', firebaseConfig.storageBucket);
console.log('   Auth Domain:', firebaseConfig.authDomain);

try {
  // Initialize Firebase
  console.log(colors.blue + '\n📋 Step 1: Initializing Firebase...' + colors.reset);
  const app = initializeApp(firebaseConfig);
  console.log(colors.green + '   ✅ Firebase initialized successfully' + colors.reset);

  // Initialize Storage
  console.log(colors.blue + '\n📋 Step 2: Initializing Firebase Storage...' + colors.reset);
  const storage = getStorage(app);
  console.log(colors.green + '   ✅ Firebase Storage initialized successfully' + colors.reset);
  console.log('   Storage bucket:', storage.app.options.storageBucket);

  // Test upload
  console.log(colors.blue + '\n📋 Step 3: Testing image upload...' + colors.reset);
  
  // Create a test file
  const testImageData = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64');
  const fileName = `test/test_${Date.now()}.png`;
  const storageRef = ref(storage, fileName);
  
  console.log('   Uploading test file:', fileName);
  
  uploadBytes(storageRef, testImageData, {
    contentType: 'image/png'
  })
    .then(() => {
      console.log(colors.green + '   ✅ File uploaded successfully' + colors.reset);
      return getDownloadURL(storageRef);
    })
    .then((downloadURL) => {
      console.log(colors.green + '   ✅ Download URL obtained successfully' + colors.reset);
      console.log(colors.cyan + '\n📸 Test Image URL:' + colors.reset);
      console.log('   ' + downloadURL);
      
      console.log(colors.green + '\n✅ All Firebase Storage tests passed!' + colors.reset);
      console.log(colors.yellow + '\n💡 Firebase Storage is working correctly!' + colors.reset);
      console.log(colors.yellow + '   You can now upload images from your admin dashboard.' + colors.reset);
      
      process.exit(0);
    })
    .catch((error) => {
      console.error(colors.red + '\n❌ Error during upload test:' + colors.reset);
      console.error('   Code:', error.code);
      console.error('   Message:', error.message);
      
      if (error.code === 'storage/unauthorized') {
        console.log(colors.yellow + '\n⚠️  PERMISSION DENIED - Firebase Storage Rules Issue' + colors.reset);
        console.log(colors.yellow + '\nTo fix this, update your Firebase Storage Rules:' + colors.reset);
        console.log(colors.cyan + '\n1. Go to: https://console.firebase.google.com/project/' + firebaseConfig.projectId + '/storage/rules' + colors.reset);
        console.log(colors.cyan + '2. Update rules to:\n' + colors.reset);
        console.log(`rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
`);
        console.log(colors.cyan + '3. Click "Publish"' + colors.reset);
      }
      
      process.exit(1);
    });

} catch (error) {
  console.error(colors.red + '\n❌ Firebase initialization error:' + colors.reset);
  console.error(error);
  process.exit(1);
}
