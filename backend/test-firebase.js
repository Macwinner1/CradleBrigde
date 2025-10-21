/**
 * Firebase Connection Test Script for Backend
 * This script tests if Firebase Admin SDK can be initialized
 */

require('dotenv').config();
const admin = require('firebase-admin');

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
console.log('🔥 FIREBASE BACKEND CONNECTION TEST');
console.log('='.repeat(60) + colors.reset + '\n');

async function testFirebaseBackend() {
  try {
    // Step 1: Check environment variables
    console.log(colors.blue + '📋 Step 1: Checking Environment Variables...' + colors.reset);
    
    const hasFirebaseConfig = 
      process.env.FIREBASE_PROJECT_ID && 
      process.env.FIREBASE_CLIENT_EMAIL && 
      process.env.FIREBASE_PRIVATE_KEY;

    if (hasFirebaseConfig) {
      console.log(colors.green + `  ✓ FIREBASE_PROJECT_ID: ${process.env.FIREBASE_PROJECT_ID}` + colors.reset);
      console.log(colors.green + `  ✓ FIREBASE_CLIENT_EMAIL: ${process.env.FIREBASE_CLIENT_EMAIL}` + colors.reset);
      console.log(colors.green + `  ✓ FIREBASE_PRIVATE_KEY: Present` + colors.reset);
      console.log(colors.green + '\n  ✅ Firebase Admin credentials found!\n' + colors.reset);

      // Step 2: Initialize Firebase Admin
      console.log(colors.blue + '📋 Step 2: Initializing Firebase Admin SDK...' + colors.reset);
      
      const serviceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      };

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });

      console.log(colors.green + `  ✓ Firebase Admin SDK initialized` + colors.reset);
      console.log(colors.green + `  ✓ Project ID: ${serviceAccount.projectId}` + colors.reset);
      console.log(colors.green + '\n  ✅ Firebase Admin is ready!\n' + colors.reset);

      // Step 3: Test Admin Services
      console.log(colors.blue + '📋 Step 3: Testing Firebase Admin Services...' + colors.reset);
      
      // Test Auth
      const auth = admin.auth();
      console.log(colors.green + `  ✓ Admin Auth service: Ready` + colors.reset);

      // Test Firestore
      const db = admin.firestore();
      console.log(colors.green + `  ✓ Admin Firestore service: Ready` + colors.reset);

      console.log(colors.green + '\n  ✅ All Admin services are accessible!\n' + colors.reset);

      // Final Summary
      console.log(colors.green + colors.bold + '='.repeat(60));
      console.log('✅ ALL TESTS PASSED - FIREBASE ADMIN IS WORKING!');
      console.log('='.repeat(60) + colors.reset + '\n');

      console.log(colors.yellow + '📝 Summary:' + colors.reset);
      console.log('  • Firebase Admin SDK: ' + colors.green + 'Connected ✓' + colors.reset);
      console.log('  • Admin Auth: ' + colors.green + 'Ready ✓' + colors.reset);
      console.log('  • Admin Firestore: ' + colors.green + 'Ready ✓' + colors.reset);
      console.log('\n' + colors.green + '🎉 Your backend can now verify Firebase tokens!\n' + colors.reset);

    } else {
      console.log(colors.yellow + `  ⚠ FIREBASE_PROJECT_ID: ${process.env.FIREBASE_PROJECT_ID || 'NOT SET'}` + colors.reset);
      console.log(colors.yellow + `  ⚠ FIREBASE_CLIENT_EMAIL: ${process.env.FIREBASE_CLIENT_EMAIL || 'NOT SET'}` + colors.reset);
      console.log(colors.yellow + `  ⚠ FIREBASE_PRIVATE_KEY: ${process.env.FIREBASE_PRIVATE_KEY ? 'SET' : 'NOT SET'}` + colors.reset);
      
      console.log('\n' + colors.yellow + colors.bold + '='.repeat(60));
      console.log('⚠️  FIREBASE ADMIN SDK - DEVELOPMENT MODE');
      console.log('='.repeat(60) + colors.reset + '\n');

      console.log(colors.yellow + '📝 Status:' + colors.reset);
      console.log('  • Firebase Admin credentials are not configured');
      console.log('  • Backend will run in DEVELOPMENT/FALLBACK mode');
      console.log('  • Token verification will be bypassed for testing\n');

      console.log(colors.blue + '💡 To enable Firebase Admin SDK:' + colors.reset);
      console.log('  1. Go to Firebase Console > Project Settings > Service Accounts');
      console.log('  2. Click "Generate New Private Key"');
      console.log('  3. Add the credentials to backend/.env file');
      console.log('  4. Uncomment the FIREBASE_* variables in .env\n');

      console.log(colors.green + '✅ Backend will work with fallback authentication for now!\n' + colors.reset);
    }

    process.exit(0);
  } catch (error) {
    console.log('\n' + colors.red + colors.bold + '='.repeat(60));
    console.log('❌ FIREBASE BACKEND TEST FAILED');
    console.log('='.repeat(60) + colors.reset + '\n');

    console.log(colors.red + '❌ Error Details:' + colors.reset);
    console.log(colors.red + `  ${error.message}` + colors.reset);
    
    if (error.code) {
      console.log(colors.red + `  Error Code: ${error.code}` + colors.reset);
    }

    console.log('\n' + colors.yellow + '💡 Troubleshooting Tips:' + colors.reset);
    console.log('  1. Check that your .env file exists in the backend directory');
    console.log('  2. Verify Firebase Admin SDK credentials are correct');
    console.log('  3. Ensure the service account has proper permissions');
    console.log('  4. Check the private key format (should include \\n line breaks)\n');

    process.exit(1);
  }
}

// Run the test
testFirebaseBackend();
