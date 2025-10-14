# Cradle Bridge Schools - Backend API

Express.js backend server for Cradle Bridge Schools website.

## Features

- RESTful API endpoints
- Input validation and sanitization
- Rate limiting
- CORS enabled
- Security headers with Helmet
- Error handling

## API Endpoints

### Applications
- `POST /api/applications/submit` - Submit new application
- `GET /api/applications` - Get all applications (Admin)
- `GET /api/applications/:id` - Get single application
- `PATCH /api/applications/:id/status` - Update application status
- `DELETE /api/applications/:id` - Delete application

### Blog
- `GET /api/blog` - Get all published posts
- `GET /api/blog/:slug` - Get single post by slug
- `GET /api/blog/admin/all` - Get all posts including drafts (Admin)
- `POST /api/blog` - Create new post (Admin)
- `PUT /api/blog/:id` - Update post (Admin)
- `DELETE /api/blog/:id` - Delete post (Admin)
- `GET /api/blog/meta/categories` - Get all categories

### Contact
- `POST /api/contact/submit` - Submit contact inquiry
- `GET /api/contact` - Get all inquiries (Admin)
- `GET /api/contact/:id` - Get single inquiry
- `PATCH /api/contact/:id/status` - Update inquiry status
- `DELETE /api/contact/:id` - Delete inquiry

### Stats
- `GET /api/stats` - Get school statistics

### Health Check
- `GET /api/health` - API health status

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Configure environment variables in `.env`

4. Start development server:
```bash
npm run dev
```

5. Start production server:
```bash
npm start
```

## Environment Variables

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS
- `MONGODB_URI` - MongoDB connection string (optional)
- `SCHOOL_EMAIL` - School contact email

## Data Storage

Currently using in-memory storage for development. For production:
- Integrate MongoDB or PostgreSQL
- Update route handlers to use database models
- Implement proper authentication middleware

## Security Features

- Helmet for security headers
- CORS protection
- Rate limiting (100 requests per 15 minutes)
- Input validation and sanitization
- XSS protection

## Next Steps

- [ ] Integrate database (MongoDB/PostgreSQL)
- [ ] Implement Firebase Admin SDK for authentication
- [ ] Add file upload for images and documents
- [ ] Implement email notifications (optional backup to EmailJS)
- [ ] Add comprehensive logging
- [ ] Write API tests

## License

© 2025 Cradle Bridge Schools
