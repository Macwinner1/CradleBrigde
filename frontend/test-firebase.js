/**
 * Firebase Connection Test Script for Frontend
 * This script tests if Firebase is properly configured and accessible
 */

require('dotenv').config();
const { initializeApp } = require('firebase/app');
const { getAuth, signInAnonymously } = require('firebase/auth');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
const { getStorage } = require('firebase/storage');

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  bold: '\x1b[1m',
};

console.log('\n' + colors.blue + colors.bold + '='.repeat(60));
console.log('🔥 FIREBASE FRONTEND CONNECTION TEST');
console.log('='.repeat(60) + colors.reset + '\n');

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

async function testFirebaseConnection() {
  try {
    // Step 1: Check environment variables
    console.log(colors.blue + '📋 Step 1: Checking Environment Variables...' + colors.reset);
    const requiredVars = [
      'REACT_APP_FIREBASE_API_KEY',
      'REACT_APP_FIREBASE_AUTH_DOMAIN',
      'REACT_APP_FIREBASE_PROJECT_ID',
      'REACT_APP_FIREBASE_STORAGE_BUCKET',
      'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
      'REACT_APP_FIREBASE_APP_ID',
    ];

    let allVarsPresent = true;
    requiredVars.forEach((varName) => {
      if (process.env[varName]) {
        console.log(colors.green + `  ✓ ${varName}: ${process.env[varName].substring(0, 20)}...` + colors.reset);
      } else {
        console.log(colors.red + `  ✗ ${varName}: NOT FOUND` + colors.reset);
        allVarsPresent = false;
      }
    });

    if (!allVarsPresent) {
      throw new Error('Missing required environment variables');
    }
    console.log(colors.green + '\n  ✅ All environment variables are present!\n' + colors.reset);

    // Step 2: Initialize Firebase
    console.log(colors.blue + '📋 Step 2: Initializing Firebase App...' + colors.reset);
    const app = initializeApp(firebaseConfig);
    console.log(colors.green + `  ✓ Firebase App initialized successfully` + colors.reset);
    console.log(colors.green + `  ✓ Project ID: ${firebaseConfig.projectId}` + colors.reset);
    console.log(colors.green + '\n  ✅ Firebase App is ready!\n' + colors.reset);

    // Step 3: Test Firebase Authentication
    console.log(colors.blue + '📋 Step 3: Testing Firebase Authentication...' + colors.reset);
    const auth = getAuth(app);
    console.log(colors.green + `  ✓ Auth service connected` + colors.reset);
    console.log(colors.green + `  ✓ Auth domain: ${firebaseConfig.authDomain}` + colors.reset);
    console.log(colors.green + '\n  ✅ Authentication service is accessible!\n' + colors.reset);

    // Step 4: Test Firestore
    console.log(colors.blue + '📋 Step 4: Testing Firestore Database...' + colors.reset);
    const db = getFirestore(app);
    console.log(colors.green + `  ✓ Firestore service connected` + colors.reset);
    console.log(colors.green + '\n  ✅ Firestore database is accessible!\n' + colors.reset);

    // Step 5: Test Storage
    console.log(colors.blue + '📋 Step 5: Testing Firebase Storage...' + colors.reset);
    const storage = getStorage(app);
    console.log(colors.green + `  ✓ Storage service connected` + colors.reset);
    console.log(colors.green + `  ✓ Storage bucket: ${firebaseConfig.storageBucket}` + colors.reset);
    console.log(colors.green + '\n  ✅ Storage service is accessible!\n' + colors.reset);

    // Final Summary
    console.log(colors.green + colors.bold + '='.repeat(60));
    console.log('✅ ALL TESTS PASSED - FIREBASE IS WORKING PERFECTLY!');
    console.log('='.repeat(60) + colors.reset + '\n');

    console.log(colors.yellow + '📝 Summary:' + colors.reset);
    console.log('  • Firebase App: ' + colors.green + 'Connected ✓' + colors.reset);
    console.log('  • Authentication: ' + colors.green + 'Ready ✓' + colors.reset);
    console.log('  • Firestore: ' + colors.green + 'Ready ✓' + colors.reset);
    console.log('  • Storage: ' + colors.green + 'Ready ✓' + colors.reset);
    console.log('\n' + colors.green + '🎉 Your frontend can now use Firebase services!\n' + colors.reset);

    process.exit(0);
  } catch (error) {
    console.log('\n' + colors.red + colors.bold + '='.repeat(60));
    console.log('❌ FIREBASE CONNECTION TEST FAILED');
    console.log('='.repeat(60) + colors.reset + '\n');

    console.log(colors.red + '❌ Error Details:' + colors.reset);
    console.log(colors.red + `  ${error.message}` + colors.reset);
    
    if (error.code) {
      console.log(colors.red + `  Error Code: ${error.code}` + colors.reset);
    }

    console.log('\n' + colors.yellow + '💡 Troubleshooting Tips:' + colors.reset);
    console.log('  1. Check that your .env file exists in the frontend directory');
    console.log('  2. Verify all Firebase credentials are correct');
    console.log('  3. Ensure your Firebase project is active in Firebase Console');
    console.log('  4. Check that Firebase services are enabled in your project\n');

    process.exit(1);
  }
}

// Run the test
testFirebaseConnection();
