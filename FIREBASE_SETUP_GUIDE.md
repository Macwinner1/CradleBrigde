# 🔥 Firebase & Backend Integration Setup Guide

This guide will help you set up Firebase authentication and connect the frontend with the backend for Cradle Bridge Schools website.

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account (free tier is fine)
- EmailJS account (optional, for email notifications)

## 🚀 Quick Start

### Step 1: Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### Step 2: Firebase Setup

#### 2.1 Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter project name: `Cradle Bridge Schools`
4. Follow the setup wizard (you can disable Google Analytics if not needed)

#### 2.2 Enable Email/Password Authentication

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Click on **Email/Password**
3. Enable it and click **Save**
4. Go to **Users** tab and click **Add user**
5. Create an admin user:
   - Email: `admin@cradlebridgeschools.com`
   - Password: Choose a strong password (save it securely!)

#### 2.3 Get Firebase Configuration (Frontend)

1. In Firebase Console, click the gear icon ⚙️ → **Project settings**
2. Scroll down to **Your apps** section
3. Click the **Web** icon `</>`
4. Register your app with a nickname (e.g., "Cradle Bridge Web")
5. Copy the `firebaseConfig` object values
6. Update `frontend/.env` file with these values:

```env
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abcdef
```

#### 2.4 Get Firebase Admin SDK Credentials (Backend - Optional for Development)

For production, you'll need Firebase Admin SDK:

1. In Firebase Console → **Project settings** → **Service accounts**
2. Click **Generate new private key**
3. Save the JSON file securely (DO NOT commit to Git!)
4. Extract these values for `backend/.env`:
   - `FIREBASE_PROJECT_ID`: from `project_id`
   - `FIREBASE_CLIENT_EMAIL`: from `client_email`
   - `FIREBASE_PRIVATE_KEY`: from `private_key` (keep the quotes and newlines)

**Note:** For development, the backend will work without these credentials using a fallback authentication.

### Step 3: EmailJS Setup (Optional but Recommended)

EmailJS allows sending email notifications without a backend email server.

1. Go to [EmailJS](https://www.emailjs.com/)
2. Create a free account
3. Add an email service (e.g., Gmail, Outlook)
4. Create two email templates:
   - **Applicant Confirmation Template**: Sent to applicants
   - **Admin Notification Template**: Sent to school admin
5. Get your credentials:
   - Service ID
   - Template IDs (for both templates)
   - Public Key
6. Update `frontend/.env`:

```env
REACT_APP_EMAILJS_SERVICE_ID=service_xxxxx
REACT_APP_EMAILJS_TEMPLATE_ID_APPLICANT=template_xxxxx
REACT_APP_EMAILJS_TEMPLATE_ID_ADMIN=template_xxxxx
REACT_APP_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxx
```

### Step 4: Update Environment Files

#### Frontend `.env` (already created)
Located at: `frontend/.env`

Make sure all values are filled in (see Step 2.3 and Step 3).

#### Backend `.env` (already created)
Located at: `backend/.env`

Basic configuration is already set. Update if needed:
- `FRONTEND_URL`: Keep as `http://localhost:3000` for development
- `SCHOOL_EMAIL`: Update to your actual school email

### Step 5: Run the Application

#### Terminal 1 - Start Backend Server
```bash
cd backend
npm start
```

Expected output:
```
🚀 Server is running on port 5000
🌐 Environment: development
✅ Firebase Admin SDK initialized successfully
```

If you see a warning about Firebase credentials, it's okay for development.

#### Terminal 2 - Start Frontend Development Server
```bash
cd frontend
npm start
```

The app should open at `http://localhost:3000`

## 🧪 Testing the Setup

### Test 1: Backend Health Check
Open browser and visit: `http://localhost:5000/api/health`

Expected response:
```json
{
  "status": "OK",
  "message": "Cradle Bridge Schools API is running",
  "timestamp": "2025-10-21T..."
}
```

### Test 2: Admin Login
1. Go to `http://localhost:3000/admin/login`
2. Enter the admin credentials you created in Firebase
3. You should be redirected to the dashboard

### Test 3: Submit Application
1. Go to `http://localhost:3000/admissions`
2. Fill out and submit the application form
3. Check the admin dashboard to see the application

## 🔒 Security Notes

### For Development
- The current setup works with in-memory storage (data resets on server restart)
- Firebase authentication is active and secure
- CORS is enabled for localhost:3000

### For Production
You should:
1. Set up a proper database (MongoDB, PostgreSQL, etc.)
2. Add Firebase Admin SDK credentials to backend
3. Set up proper email service
4. Update CORS settings
5. Use environment-specific .env files
6. Enable HTTPS
7. Set up proper logging and monitoring

## 🐛 Troubleshooting

### Firebase Authentication Not Working
- Check if Firebase config is correct in `frontend/.env`
- Verify Email/Password auth is enabled in Firebase Console
- Make sure you created an admin user in Firebase

### Backend Not Connecting
- Check if port 5000 is available
- Verify CORS settings in `backend/server.js`
- Check backend console for errors

### Applications Not Showing in Dashboard
- Make sure you're logged in as admin
- Check browser console for errors
- Verify backend is running and accessible

### CORS Errors
- Make sure backend is running on port 5000
- Frontend should be on port 3000
- Check `FRONTEND_URL` in backend/.env

## 📁 Project Structure

```
CradleBrigde/
├── backend/
│   ├── config/
│   │   └── firebase.js          # Firebase Admin SDK initialization
│   ├── middleware/
│   │   └── auth.js              # Authentication middleware
│   ├── routes/
│   │   ├── auth.js              # Auth routes (new)
│   │   ├── applications.js      # Application routes (protected)
│   │   ├── blog.js              # Blog routes (protected admin)
│   │   ├── contact.js           # Contact routes (protected admin)
│   │   └── stats.js             # Stats routes
│   ├── .env                     # Environment variables
│   ├── package.json
│   └── server.js                # Main server file
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   └── admin/
│   │   │       ├── Login.js     # Admin login page
│   │   │       └── Dashboard.js # Admin dashboard
│   │   ├── services/
│   │   │   ├── api.js           # API service (updated)
│   │   │   ├── firebase.js      # Firebase config
│   │   │   └── emailService.js  # Email service
│   │   └── App.js
│   ├── .env                     # Environment variables
│   └── package.json
```

## 🎯 Features Implemented

✅ Firebase Authentication for admin login
✅ Protected admin routes with JWT verification
✅ Frontend-Backend communication with axios
✅ Application submission and management
✅ Contact form submission
✅ Blog post management
✅ Email notifications via EmailJS
✅ Responsive admin dashboard
✅ Real-time data updates

## 📞 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Make sure both frontend and backend are running
4. Check the troubleshooting section above

## 🔄 Next Steps

After setup:
1. Add more admin users in Firebase Console
2. Customize email templates in EmailJS
3. Set up a database for persistent storage
4. Deploy to production (Vercel, Heroku, etc.)
5. Set up domain and SSL certificate
6. Configure production environment variables

---

**Happy Coding! 🚀**
