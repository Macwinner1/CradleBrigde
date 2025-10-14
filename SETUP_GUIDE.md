# Cradle Bridge Schools Website - Setup Guide

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download](https://git-scm.com/)
- Text editor (VS Code recommended)

## 🚀 Quick Start

### Step 1: Install Dependencies

From the root directory, run:

```bash
npm run install-all
```

This will install dependencies for both frontend and backend.

### Step 2: Configure Environment Variables

#### Backend Configuration

1. Navigate to `backend` folder
2. Copy `.env.example` to `.env`:
   ```bash
   cd backend
   cp .env.example .env
   ```
3. Edit `backend/.env` with your settings:
   ```env
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   SCHOOL_EMAIL=info@cradlebridgeschools.com
   ```

#### Frontend Configuration

1. Navigate to `frontend` folder
2. Copy `.env.example` to `.env`:
   ```bash
   cd frontend
   cp .env.example .env
   ```
3. Configure the following services:

## 📧 EmailJS Setup (Required for Email Functionality)

1. **Create EmailJS Account**
   - Go to [EmailJS](https://www.emailjs.com/)
   - Sign up for a free account

2. **Add Email Service**
   - Go to "Email Services"
   - Click "Add New Service"
   - Choose your email provider (Gmail recommended)
   - Follow the setup instructions
   - Note your **Service ID**

3. **Create Email Templates**

   **Template 1: Applicant Confirmation**
   - Go to "Email Templates"
   - Click "Create New Template"
   - Name: "Application Confirmation"
   - Subject: `Application Received - Cradle Bridge Schools`
   - Content:
     ```
     Dear {{to_name}},

     Thank you for applying to Cradle Bridge Schools!

     We have received your application for {{student_name}} to join {{grade}}.

     Our admissions team will review your application and contact you within 48 hours.

     {{message}}

     Best regards,
     Cradle Bridge Schools Admissions Team
     Udu, Delta State, Nigeria
     ```
   - Note your **Template ID**

   **Template 2: Admin Notification**
   - Create another template
   - Name: "New Application Alert"
   - Subject: `New Application Received`
   - Content:
     ```
     New Application Received

     Applicant Details:
     Name: {{applicant_name}}
     Email: {{applicant_email}}
     Phone: {{applicant_phone}}
     Grade: {{grade}}
     Parent: {{parent_name}}

     Message:
     {{message}}

     Submitted: {{submission_date}}

     Login to the admin dashboard to review.
     ```
   - Note your **Template ID**

4. **Get Public Key**
   - Go to "Account" → "General"
   - Find your **Public Key**

5. **Update frontend/.env**:
   ```env
   REACT_APP_EMAILJS_SERVICE_ID=your_service_id
   REACT_APP_EMAILJS_TEMPLATE_ID_APPLICANT=your_applicant_template_id
   REACT_APP_EMAILJS_TEMPLATE_ID_ADMIN=your_admin_template_id
   REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
   ```

## 🔥 Firebase Setup (Required for Admin Dashboard)

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add Project"
   - Name: "Cradle Bridge Schools"
   - Follow the setup wizard

2. **Enable Authentication**
   - In Firebase Console, go to "Authentication"
   - Click "Get Started"
   - Enable "Email/Password" sign-in method

3. **Create Admin User**
   - Go to "Authentication" → "Users"
   - Click "Add User"
   - Email: `admin@cradlebridgeschools.com`
   - Password: (create a strong password)
   - Save this for admin login

4. **Get Firebase Configuration**
   - Go to Project Settings (gear icon)
   - Scroll to "Your apps"
   - Click "Web" icon (</>) to add web app
   - Register app with nickname "Cradle Bridge Web"
   - Copy the configuration object

5. **Update frontend/.env**:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

## 🎯 Running the Application

### Development Mode

**Option 1: Run Both (Recommended)**
```bash
# From root directory
npm run dev
```

**Option 2: Run Separately**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm start
```

### Access the Application

- **Website**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Admin Login**: http://localhost:3000/admin/login

### Admin Login Credentials

Use the email and password you created in Firebase:
- Email: `admin@cradlebridgeschools.com`
- Password: (your Firebase password)

## 🧪 Testing the Application

### Test Email Functionality

1. Go to http://localhost:3000/admissions
2. Fill out the application form
3. Submit
4. Check:
   - Applicant should receive confirmation email
   - School email should receive notification
   - Application should appear in backend data

### Test Contact Form

1. Go to http://localhost:3000/contact
2. Fill out the inquiry form
3. Submit
4. Check:
   - Sender receives confirmation
   - School email receives inquiry details

### Test Admin Dashboard

1. Go to http://localhost:3000/admin/login
2. Login with Firebase credentials
3. Navigate through:
   - Applications tab (view submitted applications)
   - Inquiries tab (view contact form submissions)
   - Blog tab (view blog posts)

## 🎨 Customization

### Update School Information

Edit the following files:

**Contact Information**:
- `frontend/src/components/layout/Navbar.js`
- `frontend/src/components/layout/Footer.js`
- `frontend/src/pages/Contact.js`

**School Colors**:
- `frontend/tailwind.config.js` - Update the `navy` color palette

**School Logo**:
- Replace the "CB" text in:
  - `frontend/src/components/layout/Navbar.js`
  - `frontend/src/components/layout/Footer.js`

**Stats and Numbers**:
- `backend/routes/stats.js` - Update statistics

### Add Images

Place images in `frontend/public/images/` and reference them:
```javascript
<img src="/images/your-image.jpg" alt="Description" />
```

## 🚀 Production Deployment

### Frontend (Netlify/Vercel)

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the `build` folder to:
   - **Netlify**: Drag and drop or connect Git
   - **Vercel**: Connect Git repository

3. Set environment variables in hosting dashboard

### Backend (Heroku/Railway/Render)

1. Create account on hosting platform
2. Create new app/project
3. Connect Git repository or deploy manually
4. Set environment variables
5. Deploy

### Database (Optional - For Production)

For production, replace in-memory storage with a database:

1. **MongoDB Atlas** (Recommended):
   - Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create free cluster
   - Get connection string
   - Add to `backend/.env`: `MONGODB_URI=your_connection_string`
   - Update backend routes to use database

## 📞 Support

For issues or questions:
- Email: info@cradlebridgeschools.com
- Check documentation in README files

## ✅ Verification Checklist

- [ ] Node.js installed (v16+)
- [ ] Dependencies installed (`npm run install-all`)
- [ ] Backend `.env` configured
- [ ] Frontend `.env` configured
- [ ] EmailJS account created and configured
- [ ] Firebase project created and configured
- [ ] Admin user created in Firebase
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Email sending works (test with application form)
- [ ] Admin login works
- [ ] All pages load correctly

## 🎓 Next Steps

1. Customize content and images
2. Update school information
3. Add real blog posts via admin dashboard
4. Test all functionality thoroughly
5. Set up Google Analytics (optional)
6. Deploy to production

---

© 2025 Cradle Bridge Schools. All rights reserved.
