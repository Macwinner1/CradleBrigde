# 🗺️ Site Map - Cradle Bridge Schools Website

## Navigation Structure

```
Cradle Bridge Schools Website
│
├── 🏠 Home (/)
│   ├── Hero Section
│   ├── School Statistics
│   ├── Why Choose Us
│   ├── Latest News
│   └── Call to Action
│
├── ℹ️ About Us (/about)
│   ├── Our Story
│   ├── Mission & Vision
│   ├── Core Values
│   └── Leadership Philosophy
│
├── 📚 Academics (/academics)
│   ├── Curriculum Overview
│   ├── Programs:
│   │   ├── Nursery (Ages 2-5)
│   │   ├── Primary (Ages 6-11)
│   │   ├── Junior Secondary (Ages 12-14)
│   │   └── Senior Secondary (Ages 15-17)
│   ├── Subject Areas
│   ├── Teaching Approach
│   └── Academic Excellence
│
├── 🎨 School Life (/school-life)
│   ├── Extracurricular Activities:
│   │   ├── Sports
│   │   ├── Music
│   │   ├── Drama & Arts
│   │   ├── Debate & Chess
│   │   ├── Visual Arts
│   │   └── Science Club
│   ├── Student Testimonials
│   └── Photo Gallery
│
├── 📝 Admissions (/admissions)
│   ├── Admission Process
│   ├── Online Application Form
│   ├── Admission Requirements
│   └── Fee Structure
│
├── 📰 Blog (/blog)
│   ├── All Posts
│   ├── Filter by Category:
│   │   ├── Events
│   │   ├── Announcements
│   │   └── Achievements
│   └── Individual Post (/blog/:slug)
│       ├── Post Content
│       ├── Author Info
│       └── Publication Date
│
├── 📞 Contact (/contact)
│   ├── Contact Form
│   ├── School Information
│   ├── Location
│   ├── Office Hours
│   └── Contact Details
│
└── 🔐 Admin Portal (/admin)
    ├── Login (/admin/login)
    │   └── Firebase Authentication
    └── Dashboard (/admin/dashboard)
        ├── Applications Tab
        │   ├── View Applications
        │   ├── Update Status
        │   └── Delete Applications
        ├── Inquiries Tab
        │   ├── View Contact Forms
        │   └── Mark as Read
        └── Blog Posts Tab
            ├── View All Posts
            ├── Published/Draft Status
            └── Manage Posts
```

## User Flows

### 1️⃣ Prospective Parent Journey

```
Home Page
    ↓
Learn About School (About/Academics/School Life)
    ↓
View Admissions Requirements
    ↓
Fill Application Form
    ↓
Receive Confirmation Email
    ↓
School Reviews Application
    ↓
Parent Receives Follow-up
```

### 2️⃣ General Visitor Journey

```
Home Page
    ↓
Browse Content (About/Academics/School Life)
    ↓
Read Blog Posts
    ↓
Contact School (if interested)
    ↓
Receive Response
```

### 3️⃣ Admin Journey

```
Login Page
    ↓
Dashboard
    ↓
Select Tab (Applications/Inquiries/Blog)
    ↓
View/Manage Data
    ↓
Update Status/Respond
    ↓
Logout
```

## Page Details

### Home Page (`/`)
**Purpose**: First impression, overview, engagement  
**Key Elements**:
- Compelling hero with school motto
- Animated statistics
- Feature highlights
- Latest news preview
- Clear CTAs

**Call-to-Actions**:
- "Apply Now" → Admissions
- "Learn More" → About
- "View All News" → Blog

---

### About Us (`/about`)
**Purpose**: Build trust, share values  
**Key Elements**:
- School history and story
- Mission and vision
- Core values showcase
- Leadership philosophy
- Journey timeline

**SEO Keywords**: school history, mission, vision, values, education philosophy

---

### Academics (`/academics`)
**Purpose**: Showcase curriculum, academic excellence  
**Key Elements**:
- Program breakdown by age group
- Subject areas
- Teaching methodology
- Academic achievements
- Success rates

**SEO Keywords**: curriculum, Nigerian education, nursery, primary, secondary, WAEC, NECO

---

### School Life (`/school-life`)
**Purpose**: Showcase holistic development  
**Key Elements**:
- Extracurricular activities
- Sports programs
- Arts and culture
- Student testimonials
- Photo gallery

**SEO Keywords**: extracurricular, sports, music, drama, student life

---

### Admissions (`/admissions`)
**Purpose**: Convert visitors to applicants  
**Key Elements**:
- Clear admission process
- Online application form
- Requirements checklist
- FAQ section
- Contact information

**Form Fields**:
- Student Full Name (required)
- Parent/Guardian Email (required)
- Phone Number (required)
- Parent/Guardian Name (optional)
- Grade Applying For (required)
- Additional Information (optional)

**Form Validation**:
- Email format check
- Phone number validation
- Minimum character requirements
- Required field checks

**Email Flow**:
1. Form submitted → Backend API
2. Confirmation email → Applicant
3. Notification email → School Admin
4. Success message displayed

---

### Blog (`/blog`)
**Purpose**: Share news, engage community  
**Key Elements**:
- Post grid layout
- Category filtering
- Search functionality
- Publication dates
- Author information

**Categories**:
- Events
- Announcements
- Achievements

**Post Structure**:
- Title
- Excerpt
- Featured image
- Category
- Publication date
- Author
- Full content

---

### Contact (`/contact`)
**Purpose**: Easy communication channel  
**Key Elements**:
- Contact form
- School address
- Phone numbers
- Email addresses
- Office hours
- Map (optional)

**Form Fields**:
- Name (required)
- Email (required)
- Phone (optional)
- Subject (required)
- Message (required)

---

### Admin Dashboard (`/admin/dashboard`)
**Purpose**: Manage website content and applications  
**Access**: Password-protected (Firebase Auth)

**Tabs**:
1. **Applications**
   - View all submissions
   - Filter by status
   - Update application status
   - Delete applications
   - Export data (future)

2. **Inquiries**
   - View contact form submissions
   - Mark as read/responded
   - Delete inquiries

3. **Blog Posts**
   - View all posts
   - Create new post (future)
   - Edit post (future)
   - Delete post (future)
   - Publish/unpublish

---

## Mobile Navigation

**Hamburger Menu** (< 768px):
```
☰ Menu
  ├── Home
  ├── About Us
  ├── Academics
  ├── School Life
  ├── Admissions
  ├── Blog
  ├── Contact
  └── Apply Now (CTA Button)
```

## Footer Navigation

**Quick Links**:
- Home
- About Us
- Academics
- Admissions

**Resources**:
- School Life
- News & Events
- Contact Us
- Admin Login

**Social Media Links**:
- Facebook
- Twitter
- Instagram
- LinkedIn

**Contact Information**:
- Address
- Phone
- Email

---

## URL Structure

```
Production URLs:
├── https://cradlebridgeschools.com/
├── https://cradlebridgeschools.com/about
├── https://cradlebridgeschools.com/academics
├── https://cradlebridgeschools.com/school-life
├── https://cradlebridgeschools.com/admissions
├── https://cradlebridgeschools.com/blog
├── https://cradlebridgeschools.com/blog/post-slug
├── https://cradlebridgeschools.com/contact
└── https://cradlebridgeschools.com/admin
    ├── /login
    └── /dashboard
```

## API Endpoints

```
Backend API:
├── GET  /api/health
├── POST /api/applications/submit
├── GET  /api/applications
├── GET  /api/applications/:id
├── PATCH /api/applications/:id/status
├── DELETE /api/applications/:id
├── GET  /api/blog
├── GET  /api/blog/:slug
├── GET  /api/blog/admin/all
├── POST /api/blog
├── PUT  /api/blog/:id
├── DELETE /api/blog/:id
├── GET  /api/blog/meta/categories
├── POST /api/contact/submit
├── GET  /api/contact
├── GET  /api/contact/:id
├── PATCH /api/contact/:id/status
├── DELETE /api/contact/:id
└── GET  /api/stats
```

---

## Accessibility Features

- ✅ Semantic HTML structure
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Focus indicators
- ✅ Alt text for images
- ✅ Color contrast compliance
- ✅ Responsive font sizes
- ✅ Screen reader friendly

---

## SEO Implementation

**Meta Tags**:
- Title tags (unique per page)
- Meta descriptions
- Keywords
- Open Graph tags (Facebook)
- Twitter Card tags
- Canonical URLs

**Structured Data** (Future):
- Schema.org markup
- Local business data
- Educational organization

**Sitemap**:
- XML sitemap (to be generated)
- robots.txt configured

---

**Last Updated**: 2025  
**Version**: 1.0.0
