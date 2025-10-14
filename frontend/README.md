# Cradle Bridge Schools - Frontend

Modern, responsive React application for Cradle Bridge Schools website.

## 🎨 Features

- **Modern UI**: Built with React and Tailwind CSS
- **Responsive Design**: Mobile-first approach with navy blue and white color scheme
- **Smooth Animations**: Framer Motion for engaging interactions
- **Email Integration**: EmailJS for automated notifications
- **Admin Panel**: Firebase Authentication for secure admin access
- **SEO Ready**: Optimized meta tags and structure

## 🛠️ Tech Stack

- **Framework**: React 18.2
- **Styling**: Tailwind CSS 3.4
- **Routing**: React Router DOM 6.21
- **Animations**: Framer Motion 10.16
- **HTTP Client**: Axios 1.6
- **Email Service**: EmailJS 3.11
- **Authentication**: Firebase 10.7
- **Notifications**: React Toastify 9.1
- **Icons**: React Icons 4.12

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   └── layout/
│   │       ├── Navbar.js
│   │       └── Footer.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── About.js
│   │   ├── Academics.js
│   │   ├── SchoolLife.js
│   │   ├── Admissions.js
│   │   ├── Blog.js
│   │   ├── BlogPost.js
│   │   ├── Contact.js
│   │   └── admin/
│   │       ├── Login.js
│   │       └── Dashboard.js
│   ├── services/
│   │   ├── api.js
│   │   ├── emailService.js
│   │   └── firebase.js
│   ├── utils/
│   │   └── ScrollToTop.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in the `frontend` folder:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# EmailJS Configuration
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID_APPLICANT=your_applicant_template_id
REACT_APP_EMAILJS_TEMPLATE_ID_ADMIN=your_admin_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key

# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

# School Email
REACT_APP_SCHOOL_EMAIL=info@cradlebridgeschools.com
```

### Development

Start the development server:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

### Production Build

Create an optimized production build:
```bash
npm run build
```

The build folder will contain the optimized files ready for deployment.

## 🎨 Color Scheme

The design uses a navy blue and white color palette with gradients and animations:

- **Primary Navy**: #001F3F
- **Secondary White**: #FFFFFF
- **Accent Colors**: Various navy blue shades (50-900)
- **Gradients**: Navy to lighter blues for visual appeal

## 📧 EmailJS Setup

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create a new email service
3. Create two email templates:
   - **Applicant Template**: Confirmation email sent to applicants
   - **Admin Template**: Notification email sent to school admin
4. Add your Service ID, Template IDs, and Public Key to `.env`

### Email Template Variables

**Applicant Template:**
- `to_email`: Recipient email
- `to_name`: Recipient name
- `student_name`: Student's full name
- `grade`: Grade applying for
- `message`: Confirmation message

**Admin Template:**
- `to_email`: School email
- `applicant_name`: Applicant's name
- `applicant_email`: Applicant's email
- `applicant_phone`: Phone number
- `grade`: Grade applying for
- `message`: Additional message
- `submission_date`: Date of submission

## 🔐 Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Email/Password authentication
3. Get your Firebase configuration
4. Add configuration to `.env` file
5. Create an admin user in Firebase Authentication

## 📄 Pages Overview

- **Home**: Hero section, stats, features, latest news
- **About Us**: School history, mission, vision, values
- **Academics**: Curriculum overview, programs, teaching approach
- **School Life**: Extracurricular activities, student testimonials
- **Admissions**: Application form with validation and email integration
- **Blog**: Dynamic blog posts with filtering
- **Contact**: Contact form and school information
- **Admin Dashboard**: Manage applications, view inquiries, manage blog posts

## 🎯 Key Features

### Application Form
- Client-side validation
- EmailJS integration for confirmations
- Backend API integration
- Real-time error feedback

### Admin Dashboard
- Firebase authentication
- View and manage applications
- View contact inquiries
- Manage blog posts
- Secure logout

### Blog System
- Dynamic blog posts
- Category filtering
- Individual post pages
- Admin management

## 🌐 SEO Optimization

The website includes:
- Semantic HTML structure
- Meta tags for description and keywords
- Open Graph tags for social sharing
- Twitter Card tags
- Sitemap ready structure
- robots.txt configuration

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎨 Custom Tailwind Configuration

Custom colors, animations, and utilities defined in `tailwind.config.js`:
- Navy color palette (50-900)
- Custom animations (fade-in, slide-up, scale-in, bounce-slow)
- Gradient backgrounds
- Custom utility classes

## 🔧 Scripts

- `npm start`: Start development server
- `npm run build`: Create production build
- `npm test`: Run tests
- `npm run eject`: Eject from Create React App (⚠️ irreversible)

## 📦 Deployment

### Netlify/Vercel
1. Build the project: `npm run build`
2. Deploy the `build` folder
3. Set environment variables in hosting platform

### Traditional Hosting
1. Build the project: `npm run build`
2. Upload contents of `build` folder to web server
3. Configure server to serve `index.html` for all routes

## 🐛 Troubleshooting

**Issue**: Environment variables not loading
- **Solution**: Ensure `.env` file is in frontend root directory
- Restart development server after changing `.env`

**Issue**: CORS errors
- **Solution**: Check backend CORS configuration
- Ensure `REACT_APP_API_URL` is correct

**Issue**: Firebase authentication errors
- **Solution**: Verify Firebase configuration in `.env`
- Check Firebase console for enabled authentication methods

## 📄 License

© 2025 Cradle Bridge Schools. All rights reserved.
