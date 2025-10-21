/**
 * Admin User Creation Script
 * Run this from the frontend directory: node create-admin.js
 * 
 * Admin Credentials:
 * Email: Tega2024@cradlebridgeschools.com
 * Password: Tega2024
 */

require('dotenv').config();
const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');

// Color codes
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  bold: '\x1b[1m',
  magenta: '\x1b[35m',
};

console.log('\n' + colors.magenta + colors.bold + '╔════════════════════════════════════════════════════════╗');
console.log('║              🔐 ADMIN USER CREATION                    ║');
console.log('╚════════════════════════════════════════════════════════╝' + colors.reset + '\n');

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Admin credentials
const ADMIN_EMAIL = 'Tega2024@cradlebridgeschools.com';
const ADMIN_PASSWORD = 'Tega2024';

async function createAdmin() {
  try {
    console.log(colors.blue + '📋 Initializing Firebase...' + colors.reset);
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    console.log(colors.green + '✓ Firebase initialized\n' + colors.reset);

    console.log(colors.blue + '📋 Creating admin user...' + colors.reset);
    console.log(colors.yellow + `   Email: ${ADMIN_EMAIL}` + colors.reset);
    console.log(colors.yellow + `   Password: ${ADMIN_PASSWORD}\n` + colors.reset);

    const userCredential = await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
    
    console.log(colors.green + colors.bold + '╔════════════════════════════════════════════════════════╗');
    console.log('║         ✅ ADMIN USER CREATED SUCCESSFULLY!           ║');
    console.log('╚════════════════════════════════════════════════════════╝' + colors.reset + '\n');
    
    console.log(colors.green + `✓ User ID: ${userCredential.user.uid}` + colors.reset);
    console.log(colors.green + `✓ Email: ${userCredential.user.email}\n` + colors.reset);

    console.log(colors.yellow + '🔐 Login Credentials:' + colors.reset);
    console.log(colors.cyan + '   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' + colors.reset);
    console.log(colors.cyan + `   Email:    ${ADMIN_EMAIL}` + colors.reset);
    console.log(colors.cyan + `   Password: ${ADMIN_PASSWORD}` + colors.reset);
    console.log(colors.cyan + '   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' + colors.reset);

    console.log(colors.yellow + '🚀 Next Steps:' + colors.reset);
    console.log('   1. Start backend:  cd backend && npm start');
    console.log('   2. Start frontend: cd frontend && npm start');
    console.log('   3. Login at: http://localhost:3000/admin/login\n');

    process.exit(0);

  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log(colors.yellow + colors.bold + '╔════════════════════════════════════════════════════════╗');
      console.log('║         ⚠️  ADMIN USER ALREADY EXISTS                 ║');
      console.log('╚════════════════════════════════════════════════════════╝' + colors.reset + '\n');
      
      console.log(colors.green + '✓ The admin user is already created!\n' + colors.reset);
      
      console.log(colors.yellow + '🔐 Login Credentials:' + colors.reset);
      console.log(colors.cyan + '   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' + colors.reset);
      console.log(colors.cyan + `   Email:    ${ADMIN_EMAIL}` + colors.reset);
      console.log(colors.cyan + `   Password: ${ADMIN_PASSWORD}` + colors.reset);
      console.log(colors.cyan + '   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' + colors.reset);

      console.log(colors.yellow + '🚀 You can login at:' + colors.reset);
      console.log('   http://localhost:3000/admin/login\n');
      
      process.exit(0);
    }

    console.log('\n' + colors.red + colors.bold + '╔════════════════════════════════════════════════════════╗');
    console.log('║              ❌ ADMIN CREATION FAILED                  ║');
    console.log('╚════════════════════════════════════════════════════════╝' + colors.reset + '\n');

    console.log(colors.red + `❌ Error: ${error.message}` + colors.reset);
    if (error.code) {
      console.log(colors.red + `   Code: ${error.code}\n` + colors.reset);
    }

    console.log(colors.yellow + '💡 Troubleshooting:' + colors.reset);
    console.log('   1. Enable Email/Password auth in Firebase Console');
    console.log('   2. Check your .env file has correct Firebase credentials');
    console.log('   3. Ensure internet connection is working\n');

    process.exit(1);
  }
}

createAdmin();
