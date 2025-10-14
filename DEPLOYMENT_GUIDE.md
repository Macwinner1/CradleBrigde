# 🚀 Deployment Guide - Cradle Bridge Schools Website

This guide covers deploying your Cradle Bridge Schools website to production.

## 📋 Pre-Deployment Checklist

- [ ] All features tested locally
- [ ] EmailJS configured and tested
- [ ] Firebase configured with admin user
- [ ] Environment variables documented
- [ ] Images optimized
- [ ] Content finalized
- [ ] SEO metadata updated
- [ ] Analytics setup (if using Google Analytics)

## 🌐 Frontend Deployment

### Option 1: Netlify (Recommended - Free)

**Advantages**: Free hosting, automatic HTTPS, continuous deployment, easy setup

**Steps:**

1. **Prepare the Build**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy via Drag & Drop** (Quick method)
   - Go to [Netlify Drop](https://app.netlify.com/drop)
   - Drag and drop the `build` folder
   - Your site is live!

3. **Deploy via Git** (Recommended method)
   - Push code to GitHub
   - Log in to [Netlify](https://app.netlify.com/)
   - Click "New site from Git"
   - Connect your repository
   - Configure build settings:
     - **Build command**: `cd frontend && npm run build`
     - **Publish directory**: `frontend/build`
   - Add environment variables in Netlify dashboard
   - Deploy!

4. **Environment Variables**
   - Go to Site Settings → Environment Variables
   - Add all variables from `frontend/.env`:
     ```
     REACT_APP_API_URL
     REACT_APP_EMAILJS_SERVICE_ID
     REACT_APP_EMAILJS_TEMPLATE_ID_APPLICANT
     REACT_APP_EMAILJS_TEMPLATE_ID_ADMIN
     REACT_APP_EMAILJS_PUBLIC_KEY
     REACT_APP_FIREBASE_API_KEY
     REACT_APP_FIREBASE_AUTH_DOMAIN
     REACT_APP_FIREBASE_PROJECT_ID
     REACT_APP_FIREBASE_STORAGE_BUCKET
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID
     REACT_APP_FIREBASE_APP_ID
     REACT_APP_SCHOOL_EMAIL
     ```

5. **Custom Domain** (Optional)
   - Go to Domain Settings
   - Add custom domain (e.g., cradlebridgeschools.com)
   - Update DNS records as instructed

### Option 2: Vercel (Alternative - Free)

**Steps:**

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   cd frontend
   vercel
   ```

3. Follow prompts and add environment variables

### Option 3: Traditional Web Hosting

**Steps:**

1. Build the project:
   ```bash
   cd frontend
   npm run build
   ```

2. Upload `build` folder contents to your web server

3. Configure server to serve `index.html` for all routes:
   
   **Apache** (`.htaccess`):
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

   **Nginx**:
   ```nginx
   location / {
     try_files $uri $uri/ /index.html;
   }
   ```

## 🔧 Backend Deployment

### Option 1: Railway (Recommended - Free tier)

**Advantages**: Free tier, PostgreSQL included, easy setup

**Steps:**

1. **Prepare Backend**
   - Ensure `package.json` has start script
   - Create `Procfile` (optional):
     ```
     web: node server.js
     ```

2. **Deploy**
   - Go to [Railway](https://railway.app/)
   - Sign up/Login
   - Click "New Project"
   - Choose "Deploy from GitHub repo"
   - Select your repository
   - Set root directory to `backend`
   - Add environment variables
   - Deploy!

3. **Environment Variables**
   ```
   PORT=5000
   NODE_ENV=production
   FRONTEND_URL=https://your-netlify-site.netlify.app
   SCHOOL_EMAIL=info@cradlebridgeschools.com
   ```

4. **Get Your Backend URL**
   - Copy the generated URL (e.g., `https://your-app.railway.app`)
   - Update `REACT_APP_API_URL` in frontend deployment

### Option 2: Render (Alternative - Free tier)

**Steps:**

1. Go to [Render](https://render.com/)
2. Click "New Web Service"
3. Connect GitHub repository
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables
6. Deploy

### Option 3: Heroku

**Steps:**

1. Install Heroku CLI
2. Login:
   ```bash
   heroku login
   ```

3. Create app:
   ```bash
   cd backend
   heroku create cradle-bridge-api
   ```

4. Set environment variables:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set FRONTEND_URL=https://your-site.netlify.app
   ```

5. Deploy:
   ```bash
   git subtree push --prefix backend heroku main
   ```

### Option 4: Traditional Server (VPS)

**Requirements**: Ubuntu server, Node.js installed

**Steps:**

1. **SSH into server**:
   ```bash
   ssh user@your-server-ip
   ```

2. **Install Node.js** (if not installed):
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Clone repository**:
   ```bash
   git clone your-repo-url
   cd your-repo/backend
   ```

4. **Install dependencies**:
   ```bash
   npm install --production
   ```

5. **Set up environment**:
   ```bash
   nano .env
   # Add your environment variables
   ```

6. **Install PM2** (process manager):
   ```bash
   sudo npm install -g pm2
   ```

7. **Start application**:
   ```bash
   pm2 start server.js --name "cradle-bridge-api"
   pm2 startup
   pm2 save
   ```

8. **Set up Nginx** (reverse proxy):
   ```bash
   sudo apt install nginx
   sudo nano /etc/nginx/sites-available/api
   ```

   Add:
   ```nginx
   server {
       listen 80;
       server_name api.cradlebridgeschools.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Enable site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/api /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

9. **Set up SSL** (Let's Encrypt):
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d api.cradlebridgeschools.com
   ```

## 🗄️ Database Setup (Production)

For production, replace in-memory storage with MongoDB:

### MongoDB Atlas (Free Tier)

1. **Create Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free

2. **Create Cluster**
   - Choose free tier (M0)
   - Select region closest to your server
   - Create cluster

3. **Configure Access**
   - Database Access: Create database user
   - Network Access: Add IP address (0.0.0.0/0 for all)

4. **Get Connection String**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password

5. **Update Backend**
   - Add to environment variables:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cradlebridge
     ```
   - Install Mongoose:
     ```bash
     npm install mongoose
     ```
   - Create models and update routes

## 🔗 Connecting Frontend to Backend

After deploying backend:

1. **Get Backend URL** (e.g., `https://cradle-bridge-api.railway.app`)

2. **Update Frontend**:
   - In Netlify/Vercel environment variables
   - Update `REACT_APP_API_URL` to your backend URL

3. **Update Backend CORS**:
   - In backend `.env` or environment variables
   - Update `FRONTEND_URL` to your frontend URL

4. **Redeploy** both if needed

## 📊 Post-Deployment

### 1. Verify Functionality

- [ ] All pages load
- [ ] Application form submits
- [ ] Emails send correctly
- [ ] Admin login works
- [ ] Admin dashboard functional
- [ ] Contact form works
- [ ] Blog loads

### 2. Set Up Monitoring

**Backend Monitoring**:
- Use Railway/Render built-in monitoring
- Or set up [UptimeRobot](https://uptimerobot.com/) (free)

**Frontend Monitoring**:
- Netlify Analytics
- Google Analytics
- [Sentry](https://sentry.io/) for error tracking

### 3. Performance Optimization

**Frontend**:
- Enable Netlify CDN (automatic)
- Optimize images
- Enable caching

**Backend**:
- Enable gzip compression
- Add caching headers
- Use CDN for static assets

### 4. Security

- [ ] HTTPS enabled (automatic with Netlify/Railway)
- [ ] Environment variables secured
- [ ] Firebase security rules configured
- [ ] CORS properly configured
- [ ] Rate limiting enabled

## 🔄 Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
        with:
          args: deploy --prod --dir=frontend/build
```

## 🆘 Troubleshooting

**Site not loading**:
- Check build logs
- Verify environment variables
- Check browser console for errors

**API errors**:
- Verify backend is running
- Check CORS configuration
- Verify API URL in frontend

**Email not sending**:
- Verify EmailJS configuration
- Check email template IDs
- Test EmailJS in their dashboard

**Admin login not working**:
- Verify Firebase configuration
- Check Firebase user exists
- Check browser console for errors

## 📈 Scaling Considerations

As your site grows:

1. **Upgrade hosting tiers** if needed
2. **Add CDN** for static assets
3. **Implement caching** (Redis)
4. **Use database** instead of in-memory storage
5. **Add load balancing** for backend
6. **Implement monitoring** and alerts

## 📞 Support Resources

- **Netlify**: [docs.netlify.com](https://docs.netlify.com)
- **Railway**: [docs.railway.app](https://docs.railway.app)
- **MongoDB Atlas**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
- **Firebase**: [firebase.google.com/docs](https://firebase.google.com/docs)

---

**Congratulations!** 🎉 Your Cradle Bridge Schools website is now live!

© 2025 Cradle Bridge Schools. All rights reserved.
