# 🔐 Admin Login Credentials

## ✅ Admin User Successfully Created!

Your admin account is ready to use.

---

## 🔑 Login Credentials

```
Email:    Tega2024@cradlebridgeschools.com
Password: Tega2024
```

**User ID:** `HID4JZl07WOG4cHmxKqCbtDWSem1`

---

## 🌐 Admin Access URLs

| Service | URL |
|---------|-----|
| **Admin Login Page** | http://localhost:3000/admin/login |
| **Admin Dashboard** | http://localhost:3000/admin/dashboard |
| **Main Website** | http://localhost:3000 |
| **Backend API** | http://localhost:5000/api |

---

## 🚀 How to Login

### Step 1: Start Your Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend  
npm start
```

### Step 2: Access Admin Login

1. Open browser to: **http://localhost:3000/admin/login**
2. Enter email: `Tega2024@cradlebridgeschools.com`
3. Enter password: `Tega2024`
4. Click **Sign In**

### Step 3: Access Dashboard

After successful login, you'll be redirected to: **http://localhost:3000/admin/dashboard**

---

## 📊 Admin Dashboard Features

Once logged in, you have full admin access to:

### ✅ Applications Management
- **View** all student applications
- **Accept** applications (change status to "Accepted")
- **Reject** applications (change status to "Rejected")
- **Review** applications (change status to "Reviewed")  
- **Delete** applications
- View complete applicant details:
  - Student name
  - Parent name
  - Email address
  - Phone number
  - Grade applying for
  - Additional messages
  - Submission date

### ✅ Contact Inquiries
- View all contact form submissions
- Read messages from parents/visitors
- View contact details (name, email, phone)
- Track inquiry dates
- Respond to inquiries

### ✅ Blog Posts & Events
- View all blog posts
- Create new blog posts/events
- Edit existing posts
- Manage post categories
- Publish/unpublish content
- Update website events

### ✅ Website Content Management
- Update school events
- Manage announcements
- Control what visitors see
- Real-time updates

---

## 🎯 Common Admin Tasks

### Accept an Application
1. Go to **Dashboard** → **Applications** tab
2. Find the application you want to accept
3. Click the **Status** dropdown
4. Select **"Accepted"**
5. Application status is automatically updated!

### Reject an Application  
1. Go to **Dashboard** → **Applications** tab
2. Find the application you want to reject
3. Click the **Status** dropdown
4. Select **"Rejected"**
5. Application status is automatically updated!

### Delete an Application
1. Go to **Dashboard** → **Applications** tab
2. Find the application you want to delete
3. Click the **Delete** button
4. Confirm deletion
5. Application is permanently removed!

### Create a Blog Post/Event
1. Go to **Dashboard** → **Blog Posts** tab
2. Click **Create New Post**
3. Fill in event/post details
4. Click **Publish**
5. Event appears on the website!

---

## 🔒 Security Features

✅ **Firebase Authentication** - Secure user management  
✅ **Protected Routes** - Only authenticated admins can access  
✅ **Token-based Auth** - All API requests include auth tokens  
✅ **Auto-logout** - Session expires for security  
✅ **Password Protection** - Firebase handles secure passwords  

---

## 🛠️ Troubleshooting

### Cannot Login - "Invalid email or password"
**Solutions:**
- Double-check email: `Tega2024@cradlebridgeschools.com`
- Double-check password: `Tega2024` (case-sensitive)
- Make sure both servers are running
- Clear browser cache and try again

### Redirected to Login Page After Login
**Solutions:**
- Check browser console for errors (F12)
- Make sure backend server is running
- Verify Firebase authentication is enabled
- Try in incognito/private mode

### Cannot See Applications/Data
**Solutions:**
- Make sure you're logged in
- Check that backend server is running on port 5000
- Verify API endpoint in browser console
- Submit a test application from the website first

### "Firebase not configured" Error
**Solutions:**
- Check that `.env` file exists in frontend directory
- Verify Firebase credentials in `.env`
- Run: `node test-firebase.js` to test Firebase connection

---

## 📝 Important Notes

### For Development
- Current credentials are perfect for development
- You can login immediately and start testing
- All admin features are fully functional

### Before Production
When deploying to live/production:
1. **Change the password** to a strong password
2. Use a professional admin email
3. Enable email verification
4. Set up Firebase security rules
5. Configure Firebase Admin SDK
6. Add two-factor authentication (recommended)

---

## 🎓 Testing Your Admin Panel

### Test Workflow:

1. **Start servers** (backend + frontend)
2. **Submit a test application:**
   - Go to http://localhost:3000/admissions
   - Fill out the application form
   - Submit

3. **Login as admin:**
   - Go to http://localhost:3000/admin/login
   - Use credentials above
   - Login

4. **Manage the application:**
   - See your test application in the dashboard
   - Change status to "Accepted" or "Rejected"
   - Test the delete function

5. **Explore other features:**
   - Check contact inquiries
   - View blog posts
   - Test all admin capabilities

---

## 📞 Quick Reference Card

**Print or save this for easy access:**

```
╔════════════════════════════════════════════════════╗
║           CRADLE BRIDGE ADMIN ACCESS               ║
╠════════════════════════════════════════════════════╣
║ Email:    Tega2024@cradlebridgeschools.com         ║
║ Password: Tega2024                                 ║
║                                                    ║
║ Login:    http://localhost:3000/admin/login        ║
║ Dashboard: http://localhost:3000/admin/dashboard   ║
╚════════════════════════════════════════════════════╝
```

---

## ✨ You're All Set!

Your admin account is active and ready to use. You can now:

- ✅ Login to the admin dashboard
- ✅ View and manage student applications
- ✅ Accept or reject applications
- ✅ Manage contact inquiries
- ✅ Create and manage blog posts/events
- ✅ Update website content

**Start managing your school website today! 🎉**

---

*Created: 2025-10-21*  
*Firebase User ID: HID4JZl07WOG4cHmxKqCbtDWSem1*
