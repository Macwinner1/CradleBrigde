# 🚀 Quick Start Guide - Cradle Bridge Schools Website

## ⚡ 5-Minute Setup

### 1. Install Everything (1 minute)

```bash
npm run install-all
```

### 2. Set Up Environment Files (2 minutes)

**Backend:**
```bash
cd backend
cp .env.example .env
```
Edit `backend/.env` - use defaults for now:
```env
PORT=5000
FRONTEND_URL=http://localhost:3000
```

**Frontend:**
```bash
cd frontend
cp .env.example .env
```
Edit `frontend/.env` - add your keys:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID_APPLICANT=your_template_id
REACT_APP_EMAILJS_TEMPLATE_ID_ADMIN=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_SCHOOL_EMAIL=info@cradlebridgeschools.com
```

### 3. Run the Application (30 seconds)

```bash
npm run dev
```

### 4. Open Your Browser

- **Website**: http://localhost:3000
- **Admin**: http://localhost:3000/admin/login
- **API**: http://localhost:5000/api/health

## 📝 What You Need First

### EmailJS (Free - 5 minutes to set up)
1. Go to https://www.emailjs.com/
2. Sign up
3. Add email service (Gmail works great)
4. Create 2 templates (copy from SETUP_GUIDE.md)
5. Get your IDs and add to `.env`

### Firebase (Free - 5 minutes to set up)
1. Go to https://console.firebase.google.com/
2. Create project
3. Enable Email/Password authentication
4. Create admin user
5. Get config and add to `.env`

## 🎯 Testing Checklist

- [ ] Website loads at http://localhost:3000
- [ ] Backend API responds at http://localhost:5000/api/health
- [ ] All pages accessible (Home, About, Academics, etc.)
- [ ] Application form submits (test with dummy data)
- [ ] Contact form submits
- [ ] Admin login works
- [ ] Admin dashboard displays data

## 🆘 Common Issues

**"Cannot find module"**
```bash
npm run install-all
```

**"Port already in use"**
- Change PORT in `backend/.env` to different number (e.g., 5001)
- Update REACT_APP_API_URL in `frontend/.env` accordingly

**"Firebase not configured"**
- Add Firebase config to `frontend/.env`
- Or comment out Firebase imports temporarily in admin pages

**"CORS error"**
- Ensure backend is running
- Check FRONTEND_URL in `backend/.env` matches frontend port

## 🎨 Customization Quick Wins

**Change Colors:**
Edit `frontend/tailwind.config.js`

**Update School Info:**
- `frontend/src/components/layout/Footer.js`
- `frontend/src/pages/Contact.js`

**Change Stats:**
Edit `backend/routes/stats.js`

## 📚 Full Documentation

- **Complete Setup**: See `SETUP_GUIDE.md`
- **Frontend Docs**: See `frontend/README.md`
- **Backend Docs**: See `backend/README.md`
- **Main README**: See `README.md`

---

**Need Help?** Check SETUP_GUIDE.md for detailed instructions!
