# Receipt/Warranty Tracking App

A comprehensive web application for automatically processing receipts, tracking product warranties, and managing return dates with smart notifications.

## 🚀 Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd receipt_tracker

# Start the development environment
docker-compose up -d

# Install dependencies
npm run install:all

# Run database migrations
npm run db:migrate

# Start development servers
npm run dev
```

## 📋 Features

- **Receipt Processing**: Upload receipts and automatically extract product information using OCR
- **Warranty Tracking**: Monitor warranty expiration dates with countdown timers
- **Smart Notifications**: Email and in-app alerts for upcoming warranty and return deadlines
- **Product Database**: Automatic product lookup via UPC/barcode APIs
- **Manual Downloads**: Automatically find and organize product manuals and software
- **Dashboard**: Visual overview of all tracked products and their status

## 🏗️ Architecture

- **Frontend**: React + TypeScript + Material-UI
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Cache/Queue**: Redis with BullMQ
- **OCR**: Tesseract.js for receipt text extraction
- **Deployment**: Docker containers on Coolify platform

## 📚 Documentation

- **[Development Plan](docs/plan.md)**: Detailed project roadmap and milestones
- **[System Architecture](docs/architecture.md)**: Technical architecture and design decisions

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Material-UI component library
- React Router for navigation
- React Hook Form for form handling

### Backend
- Node.js 20+ with Express
- Prisma ORM for database access
- JWT authentication
- Multer for file uploads
- BullMQ for background jobs

### Infrastructure
- PostgreSQL database
- Redis for caching and queues
- Docker containerization
- Coolify deployment platform

## 🔧 Development Setup

### Prerequisites
- Node.js 20+
- Docker and Docker Compose
- Git

### Environment Variables
Copy `.env.example` to `.env` and configure:

```env
DATABASE_URL=postgresql://user:pass@localhost:5432/receipt_tracker
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-jwt-secret
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Development Commands

```bash
# Install all dependencies
npm run install:all

# Start development servers
npm run dev

# Run tests
npm run test

# Build for production
npm run build

# Database operations
npm run db:migrate
npm run db:seed
npm run db:reset
```

## 📁 Project Structure

```
receipt_tracker/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── types/         # TypeScript types
│   └── package.json
├── server/                # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── services/      # Business logic
│   │   ├── models/        # Database models
│   │   └── routes/        # API routes
│   └── package.json
├── docs/                  # Documentation
│   ├── plan.md
│   └── architecture.md
└── docker-compose.yml     # Development environment
```

## 🚢 Deployment

The application is designed for deployment on Coolify platform:

1. Push code to Git repository
2. Connect repository to Coolify
3. Configure environment variables
4. Deploy with automatic Docker builds

See [Architecture Documentation](docs/architecture.md) for detailed deployment instructions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For questions and support:
- Check the [documentation](docs/)
- Create an issue in the repository
- Contact the development team

---

Built with ❤️ for better warranty and receipt management.
