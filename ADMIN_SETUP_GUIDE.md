# 🔐 Admin User Setup Guide

## Admin Credentials

**Username (Email):** `Tega2024@cradlebridgeschools.com`  
**Password:** `Tega2024`

---

## Quick Setup Steps

### Step 1: Enable Email Authentication in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/project/cradle-bridge)
2. Click on **Authentication** in the left sidebar
3. Click on **Get Started** (if not already enabled)
4. Go to **Sign-in method** tab
5. Click on **Email/Password**
6. Enable **Email/Password** authentication
7. Click **Save**

### Step 2: Create Admin User

You have **TWO OPTIONS** to create the admin user:

---

## OPTION 1: Using Firebase Console (Easiest) ⭐ RECOMMENDED

1. Go to [Firebase Console](https://console.firebase.google.com/project/cradle-bridge/authentication/users)
2. Click on **Authentication** → **Users** tab
3. Click **Add user** button
4. Enter:
   - **Email:** `Tega2024@cradlebridgeschools.com`
   - **Password:** `Tega2024`
5. Click **Add user**

✅ **Done! You can now login with these credentials.**

---

## OPTION 2: Using the Application (Alternative)

### Method A: Run the Setup Script

1. Open terminal in the project root
2. Run:
   ```bash
   cd frontend
   npm install
   node ../create-admin-user.js
   ```

### Method B: Use Browser Console

1. Start your application:
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm start

   # Terminal 2 - Frontend  
   cd frontend
   npm start
   ```

2. Open browser to: http://localhost:3000
3. Open browser console (F12)
4. Paste and run this code:

```javascript
// Import Firebase auth
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// Get auth instance
const auth = getAuth();

// Create admin user
createUserWithEmailAndPassword(auth, 'Tega2024@cradlebridgeschools.com', 'Tega2024')
  .then((userCredential) => {
    console.log('✅ Admin user created successfully!');
    console.log('User ID:', userCredential.user.uid);
    console.log('Email:', userCredential.user.email);
  })
  .catch((error) => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('✅ Admin user already exists!');
    } else {
      console.error('Error:', error.message);
    }
  });
```

---

## Step 3: Login to Admin Dashboard

1. Make sure both backend and frontend are running:
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm start

   # Terminal 2 - Frontend
   cd frontend
   npm start
   ```

2. Open browser: http://localhost:3000/admin/login

3. Enter credentials:
   - **Email:** `Tega2024@cradlebridgeschools.com`
   - **Password:** `Tega2024`

4. Click **Sign In**

---

## Admin Dashboard Features

Once logged in, you can:

### ✅ Manage Applications
- View all student applications
- **Accept** or **Reject** applications
- Change application status (Pending, Reviewed, Accepted, Rejected)
- Delete applications
- View applicant details (name, email, phone, grade)

### ✅ Manage Contact Inquiries
- View all contact form submissions
- Read messages from parents and visitors
- Track inquiry dates

### ✅ Manage Blog Posts & Events
- View all blog posts
- Create new blog posts/events
- Edit existing content
- Publish or unpublish posts
- Manage categories and authors

### ✅ Update Website Content
- All content updates from the dashboard
- Real-time changes
- Secure access control

---

## Troubleshooting

### "Email/Password authentication not enabled"
**Solution:** Follow Step 1 above to enable Email/Password in Firebase Console

### "User already exists"
**Solution:** This means the admin user was already created. Just login with the credentials!

### "Invalid email or password"
**Solution:** 
- Make sure you're using the exact credentials:
  - Email: `Tega2024@cradlebridgeschools.com`
  - Password: `Tega2024`
- Check for typos (password is case-sensitive)

### Cannot access admin dashboard
**Solution:**
1. Make sure both servers are running
2. Check that you're logged in (visit /admin/login first)
3. Clear browser cache and try again

---

## Security Notes

### For Development
The current credentials are fine for development and testing.

### Before Production
When deploying to production:
1. **Change the password** to a strong, secure password
2. Use Firebase Admin SDK for additional security
3. Set up Firebase security rules
4. Enable email verification
5. Add two-factor authentication (optional but recommended)

---

## Quick Reference

| Item | Value |
|------|-------|
| **Admin Email** | Tega2024@cradlebridgeschools.com |
| **Admin Password** | Tega2024 |
| **Login URL** | http://localhost:3000/admin/login |
| **Dashboard URL** | http://localhost:3000/admin/dashboard |
| **Backend API** | http://localhost:5000/api |
| **Firebase Console** | https://console.firebase.google.com/project/cradle-bridge |

---

## Next Steps After Login

1. ✅ Test the admin dashboard
2. ✅ Submit a test application from the website
3. ✅ Accept or reject the test application
4. ✅ Create a blog post/event
5. ✅ Test all admin features

---

## Need Help?

If you encounter any issues:
1. Check that Firebase Email/Password authentication is enabled
2. Verify both servers are running
3. Check browser console for errors (F12)
4. Clear browser cache and cookies
5. Try in incognito/private browsing mode

---

**🎉 You're all set! Login and start managing your school website!**
