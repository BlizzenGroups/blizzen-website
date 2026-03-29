# Blizzen Creations Backend API

Express.js + MongoDB backend for Blizzen Creations educational platform.

## 🚀 Quick Start

### Installation

```bash
cd server
npm install
```

### Environment Setup

Create a `.env` file:

```bash
cp .env.example .env
```

Configure `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
PORT=5001
NODE_ENV=development
```

### Start Server

```bash
npm start
```

Server runs on `http://localhost:5001`

### Health Check

```bash
curl http://localhost:5001/api/health
```

---

## 📚 Available Scripts

### Development
```bash
npm start          # Start server
npm run dev        # Same as start
```

### Database Seeding
```bash
npm run seed:all                    # Seed all data
npm run seed:courses:v2             # Seed courses
npm run seed:simple-placements      # Seed placements
npm run seed:placement-stats        # Seed stats
npm run seed:contact                # Seed contact info
npm run seed:about                  # Seed about content
npm run seed:home                   # Seed home content
```

### Testing
```bash
npm run test:endpoints              # Test all endpoints
```

---

## 🌐 API Endpoints

### Public Endpoints (Read-only)
```
GET  /api/courses                   # Get all courses
GET  /api/courses/:id               # Get single course
GET  /api/placements                # Get all placements
GET  /api/contact-info              # Get contact information
GET  /api/about                     # Get about content
GET  /api/home-content              # Get home page content
GET  /api/placement-stats           # Get placement statistics
POST /api/enquiries                 # Submit enquiry form
GET  /api/health                    # Health check
```

### Admin Endpoints (Protected)
```
POST   /api/courses                 # Create course
PUT    /api/courses/:id             # Update course
DELETE /api/courses/:id             # Delete course

POST   /api/placements              # Create placement
PUT    /api/placements/:id          # Update placement
DELETE /api/placements/:id          # Delete placement

PUT    /api/contact-info            # Update contact info
PUT    /api/about                   # Update about content
PUT    /api/home-content            # Update home content

GET    /api/enquiries               # Get all enquiries
DELETE /api/enquiries/:id           # Delete enquiry

POST   /api/upload                  # Upload files
```

---

## 📁 Project Structure

```
server/
├── index.js                 # Main server file
├── package.json             # Server dependencies
├── .env.example             # Environment template
├── models/                  # MongoDB schemas
│   ├── Course.js
│   ├── Placement.js
│   ├── Enquiry.js
│   ├── ContactInfo.js
│   ├── AboutContent.js
│   ├── HomeContent.js
│   └── PlacementStats.js
├── routes/                  # API routes
│   ├── courses.js
│   ├── placements.js
│   ├── enquiry.js
│   ├── contact-info.js
│   ├── about.js
│   ├── home-content.js
│   ├── placement-stats.js
│   └── upload.js
├── middleware/              # Custom middleware
│   └── upload.js            # File upload handling
├── seeds/                   # Database seed scripts
│   ├── courses-seed-v2.js
│   ├── placements-seed.js
│   ├── placement-stats-seed.js
│   ├── contact-seed.js
│   ├── about-seed.js
│   └── home-seed.js
└── public/
    └── uploads/             # Uploaded files
```

---

## 🔒 Security Features

- **CORS**: Restricted to production domains and localhost
- **Security Headers**: X-Frame-Options, X-Content-Type-Options
- **Input Validation**: Server-side data validation
- **Error Handling**: Secure error responses
- **Environment Variables**: Sensitive data in .env

---

## 🚀 Deployment

### DigitalOcean / Production

```bash
# 1. Clone repository
git clone https://github.com/theaathish/Blizzen-Creations-Tagverse.git
cd server

# 2. Install dependencies
npm install

# 3. Configure .env
nano .env

# 4. Start with PM2
pm2 start index.js --name "blizzen-backend"
pm2 startup
pm2 save
```

### With Cloudflare Tunnel

See `DIGITALOCEAN_SETUP.md` in root directory for full setup guide.

---

## 🧪 Testing

### Test API Endpoints
```bash
npm run test:endpoints
```

### Manual Testing
```bash
# Health check
curl http://localhost:5001/api/health

# Get courses
curl http://localhost:5001/api/courses

# Get placements
curl http://localhost:5001/api/placements
```

---

## 📊 MongoDB Models

### Course
- title, slug, description, duration, level, price
- instructor, image, syllabus
- curriculum (modules & topics)
- prerequisites, highlights
- timestamps

### Placement
- studentName, company, position
- salary, description
- date, image
- timestamps

### Enquiry
- name, email, phone
- course, message
- source, status
- timestamps

---

## 🛠️ Technologies

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **File Upload**: Multer
- **CORS**: CORS middleware
- **Environment**: Dotenv

---

## 📞 Support

For technical issues or questions:
📧 strucureo@gmail.com

---

## 📄 License

Proprietary - Blizzen Creations

---

**Version**: 1.0.0  
**Last Updated**: November 2025
