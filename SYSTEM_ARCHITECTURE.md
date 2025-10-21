# 🏗️ System Architecture - Cradle Bridge Schools

## 📊 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (React App)                          │
│                    Port: 3000                                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  Public      │  │    Admin      │  │   Services   │         │
│  │  Pages       │  │    Pages      │  │   - API      │         │
│  │  - Home      │  │  - Login      │  │   - Firebase │         │
│  │  - About     │  │  - Dashboard  │  │   - EmailJS  │         │
│  │  - Blog      │  │               │  │              │         │
│  │  - Contact   │  │               │  │              │         │
│  │  - Admissions│  │               │  │              │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTP Requests + Firebase Token
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND (Express Server)                      │
│                    Port: 5000                                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ Middleware   │  │   Routes      │  │   Config     │         │
│  │ - CORS       │  │  - Auth       │  │  - Firebase  │         │
│  │ - Helmet     │  │  - Apps       │  │  - Env Vars  │         │
│  │ - Auth       │  │  - Blog       │  │              │         │
│  │ - Rate Limit │  │  - Contact    │  │              │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                ┌────────────┴────────────┐
                ▼                         ▼
┌─────────────────────────┐  ┌─────────────────────────┐
│  Firebase Authentication│  │   In-Memory Storage     │
│  - User Verification    │  │   - Applications        │
│  - Token Generation     │  │   - Contacts            │
│  - Admin SDK            │  │   - Blog Posts          │
└─────────────────────────┘  └─────────────────────────┘
```

## 🔄 Request Flow Diagrams

### Public Request Flow (No Authentication)

```
User → Frontend → Backend → Response
 |       |         |          |
 1      2         3          4

1. User visits public page (e.g., /blog)
2. Frontend fetches data from backend
3. Backend processes and returns data
4. Frontend displays data to user
```

### Authenticated Request Flow (Admin Routes)

```
User → Login → Firebase → Token → Frontend → Backend → Verify → Response
 |       |        |         |        |          |         |        |
 1      2        3         4        5          6         7        8

1. User enters credentials at /admin/login
2. Frontend sends credentials to Firebase
3. Firebase verifies and generates token
4. Token stored in Firebase SDK
5. Frontend makes API request
6. API interceptor adds token to headers
7. Backend middleware verifies token with Firebase
8. If valid, backend returns protected data
```

## 📁 Detailed Component Structure

### Frontend Architecture

```
frontend/
├── src/
│   ├── components/
│   │   └── layout/
│   │       ├── Navbar.js          → Navigation component
│   │       └── Footer.js          → Footer component
│   │
│   ├── pages/
│   │   ├── Home.js                → Landing page
│   │   ├── About.js               → About school page
│   │   ├── Academics.js           → Academic programs
│   │   ├── SchoolLife.js          → School activities
│   │   ├── Admissions.js          → Application form
│   │   ├── Blog.js                → Blog listing
│   │   ├── BlogPost.js            → Single blog post
│   │   ├── Contact.js             → Contact form
│   │   └── admin/
│   │       ├── Login.js           → Admin authentication
│   │       └── Dashboard.js       → Admin panel
│   │
│   ├── services/
│   │   ├── api.js                 → Axios HTTP client
│   │   ├── firebase.js            → Firebase config
│   │   └── emailService.js        → EmailJS integration
│   │
│   ├── utils/
│   │   └── ScrollToTop.js         → Route scroll helper
│   │
│   ├── App.js                     → Main app component
│   ├── index.js                   → App entry point
│   └── index.css                  → Global styles
│
└── .env                           → Environment config
```

### Backend Architecture

```
backend/
├── config/
│   └── firebase.js                → Firebase Admin SDK setup
│
├── middleware/
│   └── auth.js                    → Authentication middleware
│
├── routes/
│   ├── auth.js                    → Auth endpoints
│   ├── applications.js            → Application CRUD
│   ├── blog.js                    → Blog CRUD
│   ├── contact.js                 → Contact CRUD
│   └── stats.js                   → Statistics endpoint
│
├── server.js                      → Express server setup
└── .env                           → Environment config
```

## 🔌 API Endpoints

### Public Endpoints (No Auth Required)

```
POST   /api/applications/submit    → Submit application
POST   /api/contact/submit         → Submit contact form
GET    /api/blog                   → Get published blog posts
GET    /api/blog/:slug             → Get single blog post
GET    /api/blog/meta/categories   → Get blog categories
GET    /api/stats                  → Get school statistics
GET    /api/health                 → Health check
GET    /api/auth/health            → Auth service check
```

### Protected Endpoints (Auth Required) 🔒

```
Authentication:
POST   /api/auth/verify            → Verify Firebase token
GET    /api/auth/me                → Get current user

Applications:
GET    /api/applications           → Get all applications
GET    /api/applications/:id       → Get single application
PATCH  /api/applications/:id/status → Update application status
DELETE /api/applications/:id       → Delete application

Contacts:
GET    /api/contact                → Get all inquiries
GET    /api/contact/:id            → Get single inquiry
PATCH  /api/contact/:id/status     → Update inquiry status
DELETE /api/contact/:id            → Delete inquiry

Blog:
GET    /api/blog/admin/all         → Get all posts (inc. drafts)
POST   /api/blog                   → Create blog post
PUT    /api/blog/:id               → Update blog post
DELETE /api/blog/:id               → Delete blog post
```

## 🔐 Authentication Architecture

### Firebase Integration

```
┌─────────────────────────────────────────────────────────────┐
│                    Firebase Platform                         │
│  ┌─────────────────┐         ┌─────────────────┐           │
│  │  Authentication │         │   Admin SDK     │           │
│  │  - Email/Pass   │         │  - Verify Token │           │
│  │  - User Mgmt    │         │  - User Info    │           │
│  └────────┬────────┘         └────────┬────────┘           │
│           │                            │                     │
└───────────┼────────────────────────────┼─────────────────────┘
            │                            │
            ▼                            ▼
    ┌──────────────┐            ┌──────────────┐
    │   Frontend   │            │   Backend    │
    │  Firebase SDK│            │ Firebase Admin│
    └──────────────┘            └──────────────┘
```

### Token Flow

```
1. User Login
   └─→ Firebase Auth → Token Generated

2. API Request
   └─→ Token in Header (Authorization: Bearer <token>)

3. Backend Receives
   └─→ Auth Middleware Extracts Token

4. Verification
   └─→ Firebase Admin Verifies Token

5. If Valid
   └─→ Request Proceeds to Route Handler

6. If Invalid
   └─→ 401 Unauthorized Response
```

## 💾 Data Storage Architecture

### Current (Development)

```
┌──────────────────┐
│   Backend Server │
│                  │
│  ┌────────────┐  │
│  │  Arrays    │  │
│  │  - apps[]  │  │
│  │  - contacts│  │
│  │  - posts[] │  │
│  └────────────┘  │
│                  │
│  ⚠️  In-Memory   │
│  (Lost on restart)│
└──────────────────┘
```

### Recommended (Production)

```
┌──────────────────┐
│   Backend Server │
│        ↕         │
│   ┌─────────┐   │
│   │Mongoose │   │
│   │ Models  │   │
│   └────┬────┘   │
└────────┼─────────┘
         │
         ▼
┌──────────────────┐
│     MongoDB      │
│  ┌────────────┐  │
│  │Collections │  │
│  │ - apps     │  │
│  │ - contacts │  │
│  │ - posts    │  │
│  │ - users    │  │
│  └────────────┘  │
└──────────────────┘
```

## 📧 Email Integration Architecture

```
┌─────────────────┐
│  Form Submission│
│  (Frontend)     │
└────────┬────────┘
         │
         ├─────────────────────┐
         ▼                     ▼
┌─────────────────┐   ┌─────────────────┐
│   Backend API   │   │    EmailJS      │
│  - Save Data    │   │  - Send Emails  │
│  - Validate     │   │  - Applicant    │
│  - Return OK    │   │  - Admin        │
└─────────────────┘   └─────────────────┘
```

## 🔒 Security Layers

```
┌─────────────────────────────────────────┐
│  1. CORS                                │
│     - Origin restriction                │
│     - Credentials enabled               │
└─────────────────┬───────────────────────┘
                  ▼
┌─────────────────────────────────────────┐
│  2. Rate Limiting                       │
│     - 100 requests/15min per IP         │
└─────────────────┬───────────────────────┘
                  ▼
┌─────────────────────────────────────────┐
│  3. Helmet.js                           │
│     - Security headers                  │
└─────────────────┬───────────────────────┘
                  ▼
┌─────────────────────────────────────────┐
│  4. Authentication                      │
│     - Firebase token verification       │
└─────────────────┬───────────────────────┘
                  ▼
┌─────────────────────────────────────────┐
│  5. Input Validation                    │
│     - Type checking                     │
│     - XSS prevention                    │
│     - SQL injection prevention          │
└─────────────────────────────────────────┘
```

## 🌐 Deployment Architecture (Future)

```
┌──────────────────────────────────────────────────────┐
│                    PRODUCTION                         │
│                                                       │
│  ┌─────────────────┐         ┌─────────────────┐   │
│  │   Frontend      │         │    Backend      │   │
│  │   (Vercel)      │         │   (Railway)     │   │
│  │  - Static Build │         │  - Node Server  │   │
│  │  - CDN          │         │  - Auto-scale   │   │
│  └────────┬────────┘         └────────┬────────┘   │
│           │                            │             │
│           │                            ▼             │
│           │                   ┌─────────────────┐   │
│           │                   │    MongoDB      │   │
│           │                   │    (Atlas)      │   │
│           │                   └─────────────────┘   │
│           │                                          │
│           └─────────────────┐                        │
│                             ▼                        │
│                   ┌─────────────────┐               │
│                   │    Firebase     │               │
│                   │  - Auth         │               │
│                   │  - Storage      │               │
│                   └─────────────────┘               │
└──────────────────────────────────────────────────────┘
```

## 📊 Data Flow Examples

### Application Submission

```
1. User fills form at /admissions
   ↓
2. Frontend validates input
   ↓
3. POST /api/applications/submit
   ↓
4. Backend validates data
   ↓
5. Save to storage (currently array)
   ↓
6. EmailJS sends confirmation
   ↓
7. Return success to frontend
   ↓
8. Frontend shows success message
```

### Admin Dashboard Load

```
1. User authenticated with Firebase
   ↓
2. Frontend requests data with token
   ↓
3. Backend verifies token
   ↓
4. Token valid → fetch all data
   ↓
5. Return: applications, contacts, posts
   ↓
6. Frontend renders dashboard
   ↓
7. User can manage data
```

## 🎯 Technology Stack

### Frontend
- **Framework:** React 18.2
- **Routing:** React Router DOM 6.21
- **Styling:** Tailwind CSS 3.4
- **Animation:** Framer Motion 10.16
- **HTTP Client:** Axios 1.6
- **Auth:** Firebase 10.7
- **Email:** EmailJS 3.11
- **Notifications:** React Toastify 9.1

### Backend
- **Runtime:** Node.js
- **Framework:** Express 4.18
- **Auth:** Firebase Admin 12.0
- **Validation:** Validator 13.11
- **Security:** Helmet 7.1, CORS 2.8
- **Rate Limiting:** Express Rate Limit 7.1
- **Environment:** Dotenv 16.3

### Services
- **Authentication:** Firebase Authentication
- **Email:** EmailJS (optional)
- **Storage:** In-memory (development)
- **Future:** MongoDB with Mongoose

## 🚀 Performance Considerations

### Frontend
- Code splitting with React.lazy
- Image optimization
- Tailwind CSS purging
- Production build minification

### Backend
- Rate limiting prevents abuse
- Efficient middleware chain
- CORS restrictions
- Helmet security headers

## 🔮 Scalability Path

### Current → Production

```
In-Memory Storage
    ↓
MongoDB (Single Instance)
    ↓
MongoDB Cluster (Replica Set)
    ↓
Sharded MongoDB + Redis Cache
    ↓
Microservices Architecture
```

---

**This architecture is designed to be:**
- ✅ Easy to understand
- ✅ Simple to maintain
- ✅ Ready to scale
- ✅ Secure by default
- ✅ Production-ready

**Current Status:** Fully functional development environment
**Next Step:** Firebase credentials setup
**Future:** Database integration and production deployment
