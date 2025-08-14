# Receipt/Warranty Tracking App - System Architecture

## Architecture Overview

The Receipt/Warranty Tracking App follows a modern, containerized microservices architecture designed for deployment on Coolify. The system consists of a React frontend, Node.js backend, PostgreSQL database, and Redis for caching and queues.

```
┌─────────────────────────────────────────────────────────────────┐
│                        Coolify Platform                        │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Frontend   │  │   Backend    │  │  Background  │          │
│  │   (React)    │  │ (Node/Express│  │   Workers    │          │
│  │   Port 3000  │  │  Port 5000)  │  │  (BullMQ)    │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                 │                 │                  │
│         └─────────────────┼─────────────────┘                  │
│                           │                                    │
│  ┌──────────────┐  ┌──────┴───────┐  ┌──────────────┐          │
│  │ PostgreSQL   │  │    Redis     │  │ File Storage │          │
│  │ Port 5432    │  │  Port 6379   │  │   /uploads   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

## System Components

### 1. Frontend Application (React)

**Technology Stack:**
- React 18 with TypeScript
- Vite for build tooling
- Material-UI for component library
- React Router for navigation
- Axios for HTTP requests
- React Hook Form for form handling

**Key Features:**
- Responsive, mobile-first design
- Progressive Web App (PWA) capabilities
- Real-time notifications
- Drag-and-drop file upload
- Interactive dashboard with charts

**Component Architecture:**
```
src/
├── components/
│   ├── common/           # Reusable UI components
│   ├── receipt/          # Receipt-related components
│   ├── product/          # Product management
│   ├── notification/     # Notification system
│   └── dashboard/        # Dashboard components
├── pages/
│   ├── auth/            # Login, register, forgot password
│   ├── dashboard/       # Main dashboard
│   ├── receipts/        # Receipt management
│   ├── products/        # Product catalog
│   └── settings/        # User settings
├── hooks/               # Custom React hooks
├── services/           # API service layer
├── types/              # TypeScript type definitions
├── utils/              # Helper functions
└── contexts/           # React contexts for state management
```

### 2. Backend API (Node.js/Express)

**Technology Stack:**
- Node.js 20+ with TypeScript
- Express.js framework
- Prisma ORM for database access
- JWT for authentication
- Multer for file uploads
- Tesseract.js for OCR processing
- BullMQ for background jobs

**API Architecture:**
```
src/
├── controllers/         # Request handlers
│   ├── authController.ts
│   ├── receiptController.ts
│   ├── productController.ts
│   ├── warrantyController.ts
│   └── notificationController.ts
├── services/           # Business logic layer
│   ├── ocrService.ts
│   ├── productLookupService.ts
│   ├── warrantyService.ts
│   ├── notificationService.ts
│   └── emailService.ts
├── models/             # Prisma models and types
├── middleware/         # Express middleware
│   ├── authMiddleware.ts
│   ├── validationMiddleware.ts
│   └── errorMiddleware.ts
├── routes/             # API route definitions
├── utils/              # Helper functions
├── config/             # Configuration files
├── jobs/               # Background job definitions
└── prisma/             # Database schema and migrations
```

**API Endpoints:**
```
Authentication:
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
POST   /api/auth/forgot-password
POST   /api/auth/reset-password

Receipts:
GET    /api/receipts
POST   /api/receipts/upload
GET    /api/receipts/:id
PUT    /api/receipts/:id
DELETE /api/receipts/:id
POST   /api/receipts/:id/process

Products:
GET    /api/products
POST   /api/products
GET    /api/products/:id
PUT    /api/products/:id
DELETE /api/products/:id
GET    /api/products/search?upc=:upc

Warranties:
GET    /api/warranties
GET    /api/warranties/expiring
PUT    /api/warranties/:id

Notifications:
GET    /api/notifications
PUT    /api/notifications/:id/read
DELETE /api/notifications/:id
```

### 3. Database Schema (PostgreSQL)

**Entity Relationship Diagram:**
```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email_verified BOOLEAN DEFAULT FALSE,
    notification_preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Receipts table
CREATE TABLE receipts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    merchant_name VARCHAR(255),
    receipt_date DATE,
    total_amount DECIMAL(10,2),
    image_url VARCHAR(500),
    ocr_text TEXT,
    ocr_confidence DECIMAL(5,2),
    processed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100),
    model VARCHAR(100),
    upc VARCHAR(20),
    category_id UUID REFERENCES product_categories(id),
    default_warranty_months INTEGER DEFAULT 12,
    image_url VARCHAR(500),
    manual_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Product Categories table
CREATE TABLE product_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    default_warranty_months INTEGER DEFAULT 12,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Receipt Products table (many-to-many)
CREATE TABLE receipt_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    receipt_id UUID REFERENCES receipts(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    quantity INTEGER DEFAULT 1,
    price DECIMAL(10,2),
    warranty_start_date DATE,
    warranty_end_date DATE,
    return_end_date DATE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    receipt_product_id UUID REFERENCES receipt_products(id),
    type VARCHAR(50) NOT NULL, -- 'warranty_expiring', 'return_expiring'
    title VARCHAR(255) NOT NULL,
    message TEXT,
    scheduled_for TIMESTAMP,
    sent_at TIMESTAMP,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- User Sessions table (for JWT refresh tokens)
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    refresh_token VARCHAR(500) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### 4. Background Job System

**Queue Architecture:**
```typescript
// Job Types
interface WarrantyCheckJob {
  type: 'warranty-check';
  userId: string;
}

interface NotificationJob {
  type: 'send-notification';
  notificationId: string;
}

interface OCRProcessingJob {
  type: 'ocr-processing';
  receiptId: string;
  imageUrl: string;
}

interface ProductLookupJob {
  type: 'product-lookup';
  receiptId: string;
  upcCode: string;
}
```

**Job Scheduling:**
- **Daily Warranty Checks**: Runs at 2 AM UTC daily
- **Notification Processing**: Real-time queue processing
- **OCR Processing**: Immediate processing on upload
- **Product Lookup**: Batched processing every 5 minutes

### 5. File Storage System

**Storage Strategy:**
```
/uploads/
├── receipts/
│   ├── original/     # Original uploaded images
│   ├── processed/    # Processed/optimized images
│   └── thumbnails/   # Thumbnail versions
├── manuals/          # Downloaded product manuals
└── temp/             # Temporary processing files
```

**File Processing Pipeline:**
1. Upload validation (type, size, virus scanning)
2. Image optimization and thumbnail generation
3. OCR text extraction
4. Metadata extraction
5. Secure storage with access controls

## Data Flow Architecture

### 1. Receipt Upload and Processing Flow
```
┌─────────────┐    ┌──────────────┐    ┌─────────────────┐
│   Frontend  │───▶│   Backend    │───▶│   File Storage  │
│             │    │              │    │                 │
└─────────────┘    └──────┬───────┘    └─────────────────┘
                          │
                          ▼
                   ┌─────────────────┐
                   │  OCR Processing │
                   │   (Tesseract)   │
                   └─────────┬───────┘
                             │
                             ▼
                   ┌─────────────────┐    ┌──────────────┐
                   │ Product Lookup  │───▶│   Database   │
                   │   (UPC APIs)    │    │              │
                   └─────────────────┘    └──────────────┘
```

### 2. Warranty Monitoring Flow
```
┌─────────────────┐    ┌──────────────┐    ┌─────────────────┐
│  Daily Cron Job │───▶│   Database   │───▶│ Notification    │
│                 │    │              │    │    Queue        │
└─────────────────┘    └──────────────┘    └─────────┬───────┘
                                                     │
                                                     ▼
┌─────────────────┐    ┌──────────────┐    ┌─────────────────┐
│  Email Service  │◄───│   Backend    │◄───│   Job Worker    │
│                 │    │              │    │                 │
└─────────────────┘    └──────────────┘    └─────────────────┘
```

### 3. User Authentication Flow
```
┌─────────────┐    ┌──────────────┐    ┌──────────────┐
│   Frontend  │───▶│   Backend    │───▶│   Database   │
│             │    │              │    │              │
└─────────────┘    └──────┬───────┘    └──────────────┘
                          │
                          ▼
                   ┌─────────────────┐
                   │  JWT Generation │
                   │                 │
                   └─────────┬───────┘
                             │
                             ▼
                   ┌─────────────────┐
                   │  Session Store  │
                   │    (Redis)      │
                   └─────────────────┘
```

## Security Architecture

### 1. Authentication & Authorization
- **JWT-based authentication** with short-lived access tokens (15 minutes)
- **Refresh token rotation** stored in secure HTTP-only cookies
- **Role-based access control** for future admin features
- **Password hashing** using bcrypt with salt rounds

### 2. Data Protection
- **Input validation** using Joi schemas
- **SQL injection prevention** through Prisma ORM
- **XSS protection** with helmet.js
- **CORS configuration** for cross-origin requests
- **Rate limiting** to prevent abuse

### 3. File Security
- **File type validation** on upload
- **Virus scanning** integration capability
- **Secure file serving** with access controls
- **Image optimization** to prevent malicious payloads

## Performance Optimization

### 1. Database Optimization
- **Indexed queries** on frequently accessed fields
- **Connection pooling** for database connections
- **Query optimization** with Prisma query analysis
- **Database migrations** for schema changes

### 2. Caching Strategy
- **Redis caching** for frequently accessed data
- **Product lookup caching** to reduce API calls
- **Session management** using Redis store
- **API response caching** for static data

### 3. Frontend Optimization
- **Code splitting** for reduced bundle size
- **Lazy loading** for route components
- **Image optimization** with WebP format support
- **Service worker** for offline capabilities

## Monitoring & Observability

### 1. Application Monitoring
- **Structured logging** with Winston
- **Error tracking** with error boundaries
- **Performance metrics** collection
- **Health check endpoints**

### 2. Infrastructure Monitoring
- **Container health** monitoring
- **Database performance** metrics
- **Redis memory usage** tracking
- **File storage utilization**

### 3. User Analytics
- **Feature usage** tracking
- **User journey** analysis
- **Error occurrence** monitoring
- **Performance bottleneck** identification

## Deployment Architecture

### Coolify Deployment Configuration

```yaml
# docker-compose.yml
version: '3.8'
services:
  frontend:
    build: ./client
    ports:
      - "3000:3000"
    environment:
      - VITE_API_URL=${API_URL}
    depends_on:
      - backend

  backend:
    build: ./server
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - postgres
      - redis
    volumes:
      - ./uploads:/app/uploads

  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=${POSTGRES_DB}
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  worker:
    build: ./server
    command: npm run worker
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
    depends_on:
      - redis
      - postgres

volumes:
  postgres_data:
```

### Environment Variables
```env
# Database
DATABASE_URL=postgresql://user:pass@postgres:5432/receipt_tracker
POSTGRES_DB=receipt_tracker
POSTGRES_USER=receipt_user
POSTGRES_PASSWORD=secure_password

# Redis
REDIS_URL=redis://redis:6379

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# File Upload
MAX_FILE_SIZE=10MB
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp

# OCR
OCR_LANGUAGE=eng
OCR_CONFIDENCE_THRESHOLD=60

# Product APIs
UPC_API_KEY=your-upc-api-key
```

## Scalability Considerations

### Horizontal Scaling
- **Stateless backend** design for easy horizontal scaling
- **Load balancing** capability with multiple backend instances
- **Database connection pooling** to handle increased load
- **Redis cluster** support for high availability

### Vertical Scaling
- **Memory optimization** for OCR processing
- **CPU optimization** for image processing
- **Storage optimization** with compression
- **Database query optimization**

## Disaster Recovery

### Backup Strategy
- **Automated daily backups** of PostgreSQL database
- **File storage backup** to cloud storage
- **Configuration backup** including environment variables
- **Application code versioning** with Git

### Recovery Procedures
- **Database restoration** from backup files
- **File storage restoration** procedures
- **Application deployment** rollback procedures
- **Data integrity verification** after recovery

This architecture provides a robust, scalable foundation for the Receipt/Warranty Tracking App with clear separation of concerns, security best practices, and deployment readiness for the Coolify platform.
