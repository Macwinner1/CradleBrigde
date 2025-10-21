/**
 * Admin User Setup Script
 * This script creates an admin user in Firebase Authentication
 * 
 * Admin Credentials:
 * Email: Tega2024@cradlebridgeschools.com
 * Password: Tega2024
 */

// Load environment variables manually
const fs = require('fs');
const path = require('path');

// Read .env file from frontend directory
const envPath = path.join(__dirname, 'frontend', '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      process.env[key] = value;
    }
  });
}
const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  bold: '\x1b[1m',
  magenta: '\x1b[35m',
};

console.log('\n' + colors.magenta + colors.bold + '='.repeat(60));
console.log('🔐 ADMIN USER SETUP');
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

// Admin credentials
const ADMIN_EMAIL = 'Tega2024@cradlebridgeschools.com';
const ADMIN_PASSWORD = 'Tega2024';

async function setupAdmin() {
  try {
    console.log(colors.blue + '📋 Step 1: Initializing Firebase...' + colors.reset);
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    console.log(colors.green + '  ✓ Firebase initialized successfully\n' + colors.reset);

    console.log(colors.blue + '📋 Step 2: Creating Admin User...' + colors.reset);
    console.log(colors.yellow + `  Email: ${ADMIN_EMAIL}` + colors.reset);
    console.log(colors.yellow + `  Password: ${ADMIN_PASSWORD}\n` + colors.reset);

    try {
      // Try to create the admin user
      const userCredential = await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
      
      console.log(colors.green + colors.bold + '  ✅ Admin user created successfully!\n' + colors.reset);
      console.log(colors.green + `  User ID: ${userCredential.user.uid}` + colors.reset);
      console.log(colors.green + `  Email: ${userCredential.user.email}\n` + colors.reset);

    } catch (createError) {
      // If user already exists, try to sign in to verify
      if (createError.code === 'auth/email-already-in-use') {
        console.log(colors.yellow + '  ⚠ Admin user already exists' + colors.reset);
        console.log(colors.blue + '\n📋 Step 3: Verifying Admin Credentials...' + colors.reset);
        
        try {
          const signInCredential = await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
          console.log(colors.green + colors.bold + '  ✅ Admin credentials verified successfully!\n' + colors.reset);
          console.log(colors.green + `  User ID: ${signInCredential.user.uid}` + colors.reset);
          console.log(colors.green + `  Email: ${signInCredential.user.email}\n` + colors.reset);
        } catch (signInError) {
          console.log(colors.red + '  ❌ Failed to verify admin credentials' + colors.reset);
          console.log(colors.red + `  Error: ${signInError.message}\n` + colors.reset);
          throw signInError;
        }
      } else {
        throw createError;
      }
    }

    // Print success summary
    console.log(colors.green + colors.bold + '='.repeat(60));
    console.log('✅ ADMIN SETUP COMPLETE!');
    console.log('='.repeat(60) + colors.reset + '\n');

    console.log(colors.yellow + '📝 Admin Login Credentials:' + colors.reset);
    console.log(colors.white + '  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' + colors.reset);
    console.log(colors.cyan + `  Email:    ${ADMIN_EMAIL}` + colors.reset);
    console.log(colors.cyan + `  Password: ${ADMIN_PASSWORD}` + colors.reset);
    console.log(colors.white + '  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' + colors.reset);

    console.log(colors.yellow + '🚀 How to Login:' + colors.reset);
    console.log('  1. Start your backend: cd backend && npm start');
    console.log('  2. Start your frontend: cd frontend && npm start');
    console.log('  3. Open: http://localhost:3000/admin/login');
    console.log(`  4. Enter email: ${ADMIN_EMAIL}`);
    console.log(`  5. Enter password: ${ADMIN_PASSWORD}\n`);

    console.log(colors.yellow + '✨ Admin Dashboard Features:' + colors.reset);
    console.log('  ✓ View and manage student applications');
    console.log('  ✓ Accept or reject applications');
    console.log('  ✓ View contact inquiries');
    console.log('  ✓ Manage blog posts and events');
    console.log('  ✓ Update website content\n');

    console.log(colors.green + '🎉 You can now login as admin!\n' + colors.reset);

    process.exit(0);

  } catch (error) {
    console.log('\n' + colors.red + colors.bold + '='.repeat(60));
    console.log('❌ ADMIN SETUP FAILED');
    console.log('='.repeat(60) + colors.reset + '\n');

    console.log(colors.red + '❌ Error Details:' + colors.reset);
    console.log(colors.red + `  ${error.message}` + colors.reset);
    
    if (error.code) {
      console.log(colors.red + `  Error Code: ${error.code}` + colors.reset);
    }

    console.log('\n' + colors.yellow + '💡 Troubleshooting:' + colors.reset);
    console.log('  1. Ensure Firebase is properly configured');
    console.log('  2. Check that Email/Password authentication is enabled in Firebase Console');
    console.log('  3. Verify your internet connection');
    console.log('  4. Run: node test-integration.js to verify Firebase setup\n');

    process.exit(1);
  }
}

// Run the setup
setupAdmin();
