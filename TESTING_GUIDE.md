# 🧪 Complete Testing Guide - Cradle Bridge School Website

## ✅ System Status: RUNNING

Both servers are now running and ready for testing!

---

## 🚀 Server Status

### ✅ Backend Server
- **Status:** Running ✓
- **Port:** 5000
- **URL:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health

### ✅ Frontend Server
- **Status:** Running ✓
- **Port:** 3000
- **URL:** http://localhost:3000
- **Compiled:** Successfully ✓

---

## 🔑 Admin Login Credentials

```
Email:    Tega2024@cradlebridgeschools.com
Password: Tega2024
```

---

## 🧪 Complete Testing Checklist

### 1️⃣ Test Public Website (No Login Required)

#### Home Page
- [ ] Visit: http://localhost:3000
- [ ] Check navigation menu works
- [ ] Verify hero section displays
- [ ] Test "Apply Now" button
- [ ] Check footer links

#### About Page
- [ ] Visit: http://localhost:3000/about
- [ ] Verify content displays correctly
- [ ] Check images load

#### Admissions Page
- [ ] Visit: http://localhost:3000/admissions
- [ ] Fill out application form with test data:
  - Full Name: `Test Student`
  - Parent Name: `Test Parent`
  - Email: `test@example.com`
  - Phone: `1234567890`
  - Grade: `1st Grade`
  - Message: `This is a test application`
- [ ] Submit the form
- [ ] Verify success message appears

#### Contact Page
- [ ] Visit: http://localhost:3000/contact
- [ ] Fill out contact form:
  - Name: `Test User`
  - Email: `test@example.com`
  - Subject: `Test Message`
  - Message: `This is a test contact message`
- [ ] Submit the form
- [ ] Verify success message appears

#### Blog Page
- [ ] Visit: http://localhost:3000/blog
- [ ] Check if blog posts display
- [ ] Test navigation

---

### 2️⃣ Test Admin Login System

#### Access Admin Login
- [ ] Visit: http://localhost:3000/admin/login
- [ ] Verify login page displays correctly
- [ ] Check Cradle Bridge branding shows

#### Login with Credentials
- [ ] Enter Email: `Tega2024@cradlebridgeschools.com`
- [ ] Enter Password: `Tega2024`
- [ ] Click **Sign In** button
- [ ] Verify successful login
- [ ] Verify redirect to dashboard

#### Test Invalid Login
- [ ] Try wrong password
- [ ] Verify error message displays
- [ ] Try wrong email
- [ ] Verify error message displays

---

### 3️⃣ Test Admin Dashboard Features

#### Dashboard Overview
- [ ] Verify dashboard loads at: http://localhost:3000/admin/dashboard
- [ ] Check header shows "Admin Dashboard"
- [ ] Verify logout button is visible
- [ ] Check three tabs: Applications, Inquiries, Blog Posts

---

### 4️⃣ Test Applications Management

#### View Applications
- [ ] Click on **Applications** tab
- [ ] Verify the test application you submitted appears
- [ ] Check all details display correctly:
  - Student name
  - Email
  - Phone number
  - Grade
  - Status (should be "Pending")

#### Accept an Application
- [ ] Find your test application
- [ ] Click the **Status** dropdown
- [ ] Select **"Accepted"**
- [ ] Verify status changes immediately
- [ ] Check success message appears

#### Reject an Application
- [ ] Click the **Status** dropdown again
- [ ] Select **"Rejected"**
- [ ] Verify status changes to "Rejected"
- [ ] Check success message appears

#### Change to Reviewed
- [ ] Click the **Status** dropdown
- [ ] Select **"Reviewed"**
- [ ] Verify status changes
- [ ] Check success message appears

#### Delete an Application
- [ ] Click the **Delete** button
- [ ] Verify confirmation popup appears
- [ ] Click **OK** to confirm
- [ ] Verify application is removed from list
- [ ] Check success message appears

---

### 5️⃣ Test Contact Inquiries Management

#### View Contact Messages
- [ ] Click on **Inquiries** tab
- [ ] Verify the test contact message you submitted appears
- [ ] Check message details:
  - Name displays correctly
  - Email displays correctly
  - Subject displays correctly
  - Message content shows
  - Submission date shows

#### Test Multiple Messages
- [ ] Go back to website: http://localhost:3000/contact
- [ ] Submit another test message
- [ ] Return to admin dashboard
- [ ] Verify new message appears
- [ ] Check messages are sorted by date

---

### 6️⃣ Test Blog Posts Management

#### View Blog Posts
- [ ] Click on **Blog Posts** tab
- [ ] Check if any blog posts display
- [ ] Verify post details show:
  - Title
  - Excerpt
  - Category
  - Author
  - Date
  - Status (published/draft)

---

### 7️⃣ Test Admin Security & Navigation

#### Test Logout
- [ ] Click **Logout** button in dashboard
- [ ] Verify you're redirected to login page
- [ ] Verify success message appears
- [ ] Try accessing dashboard: http://localhost:3000/admin/dashboard
- [ ] Verify you're redirected to login (protected route working)

#### Test Session Persistence
- [ ] Login again with credentials
- [ ] Navigate to website: http://localhost:3000
- [ ] Click browser back button
- [ ] Verify you're still logged in (check if dashboard is accessible)

#### Test Protected Routes
- [ ] Logout if logged in
- [ ] Try accessing: http://localhost:3000/admin/dashboard
- [ ] Verify redirect to login page
- [ ] Login successfully
- [ ] Verify redirect back to dashboard

---

### 8️⃣ Test Backend API Directly

#### Health Check
- [ ] Open: http://localhost:5000/api/health
- [ ] Verify JSON response:
  ```json
  {
    "status": "OK",
    "message": "Cradle Bridge Schools API is running",
    "timestamp": "..."
  }
  ```

#### Test CORS (from browser console)
- [ ] Open browser console (F12)
- [ ] Run this code:
  ```javascript
  fetch('http://localhost:5000/api/health')
    .then(res => res.json())
    .then(data => console.log('✅ CORS working:', data))
    .catch(err => console.error('❌ CORS error:', err));
  ```
- [ ] Verify success message in console

---

### 9️⃣ Test Complete User Journey

#### As a Parent/Visitor
1. [ ] Visit website: http://localhost:3000
2. [ ] Browse different pages (Home, About, Academics, etc.)
3. [ ] Go to Admissions page
4. [ ] Fill out and submit application
5. [ ] Go to Contact page
6. [ ] Submit a contact inquiry
7. [ ] Verify both submissions were successful

#### As an Admin
1. [ ] Go to admin login: http://localhost:3000/admin/login
2. [ ] Login with credentials
3. [ ] View the submitted application
4. [ ] Accept the application
5. [ ] View the contact inquiry
6. [ ] Check blog posts
7. [ ] Logout successfully

---

### 🔟 Test Responsiveness & UI

#### Desktop View
- [ ] Test on full screen
- [ ] Verify layout looks good
- [ ] Check navigation menu
- [ ] Test all interactive elements

#### Mobile View (Resize Browser)
- [ ] Resize browser to mobile size (375px width)
- [ ] Check mobile menu (hamburger icon)
- [ ] Verify forms work on mobile
- [ ] Test admin dashboard on mobile
- [ ] Check responsive layout

#### Tablet View
- [ ] Resize to tablet size (768px width)
- [ ] Verify layout adjusts properly
- [ ] Test navigation
- [ ] Check dashboard functionality

---

## 🎯 Expected Results Summary

After completing all tests, you should see:

### ✅ Public Website
- All pages load correctly
- Navigation works smoothly
- Forms submit successfully
- Content displays properly
- Responsive design works

### ✅ Admin Login
- Login page displays correctly
- Valid credentials work
- Invalid credentials show errors
- Protected routes redirect to login

### ✅ Admin Dashboard
- Dashboard loads successfully
- All tabs accessible
- Applications can be viewed/managed
- Contact inquiries display
- Blog posts show

### ✅ Applications Management
- Can view all applications
- Can accept applications
- Can reject applications
- Can delete applications
- Status updates work instantly

### ✅ Security
- Protected routes work
- Logout functions properly
- Session management works
- Firebase authentication active

---

## 🚨 Troubleshooting Common Issues

### Application doesn't appear in dashboard
**Solution:**
- Make sure you submitted it from the website first
- Refresh the dashboard page
- Check browser console for errors

### Can't login with credentials
**Solution:**
- Double-check email: `Tega2024@cradlebridgeschools.com`
- Double-check password: `Tega2024` (case-sensitive)
- Clear browser cache and try again
- Check if both servers are running

### Dashboard shows no data
**Solution:**
- Submit test applications and contacts first
- Refresh the page
- Check backend is running on port 5000

### Error messages in console
**Solution:**
- Check both servers are running
- Verify .env files are in place
- Check Firebase configuration

---

## 📊 Test Results Template

Use this template to track your testing:

```
=== TESTING COMPLETED ===
Date: __________
Tester: __________

Public Website:        [ ] Pass  [ ] Fail
Admin Login:           [ ] Pass  [ ] Fail
Admin Dashboard:       [ ] Pass  [ ] Fail
Applications Mgmt:     [ ] Pass  [ ] Fail
Contact Inquiries:     [ ] Pass  [ ] Fail
Blog Posts:            [ ] Pass  [ ] Fail
Security/Logout:       [ ] Pass  [ ] Fail
Responsiveness:        [ ] Pass  [ ] Fail

Overall Status:        [ ] All Tests Passed  [ ] Issues Found

Notes:
_________________________________
_________________________________
```

---

## 🎉 Success Criteria

Your system is working perfectly if:

✅ Both servers start without errors  
✅ Website loads and all pages work  
✅ Application form submits successfully  
✅ Contact form submits successfully  
✅ Admin login works with correct credentials  
✅ Dashboard displays all data  
✅ Applications can be accepted/rejected/deleted  
✅ Contact inquiries display correctly  
✅ Logout works properly  
✅ Protected routes redirect correctly  
✅ No errors in browser console  

---

## 🌐 Quick Links for Testing

| Page | URL | Purpose |
|------|-----|---------|
| **Home** | http://localhost:3000 | Main website |
| **Admissions** | http://localhost:3000/admissions | Submit test application |
| **Contact** | http://localhost:3000/contact | Submit test inquiry |
| **Admin Login** | http://localhost:3000/admin/login | Login as admin |
| **Dashboard** | http://localhost:3000/admin/dashboard | Manage content |
| **API Health** | http://localhost:5000/api/health | Check backend |

---

**Happy Testing! 🚀**

*Everything should be working perfectly. If you encounter any issues, refer to the troubleshooting section above.*
