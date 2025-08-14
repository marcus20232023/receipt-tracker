import Joi from 'joi';

interface Config {
  nodeEnv: string;
  port: number;
  corsOrigins: string[];
  
  // Database
  databaseUrl: string;
  
  // Redis
  redisUrl: string;
  
  // JWT
  jwtSecret: string;
  jwtExpiresIn: string;
  refreshTokenExpiresIn: string;
  
  // Email
  smtpHost: string;
  smtpPort: number;
  smtpSecure: boolean;
  smtpUser: string;
  smtpPass: string;
  emailFrom: string;
  
  // File Upload
  maxFileSize: string;
  allowedFileTypes: string[];
  uploadDir: string;
  
  // OCR
  ocrLanguage: string;
  ocrConfidenceThreshold: number;
  ocrPsm: number;
  
  // Product APIs
  upcApiKey?: string;
  upcApiUrl: string;
  
  // Notifications
  notificationReminderDays: number[];
  
  // Security
  bcryptRounds: number;
  
  // Logging
  logLevel: string;
  logFormat: string;
}

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(5000),
  CLIENT_URL: Joi.string().default('http://localhost:3000'),
  
  // Database
  DATABASE_URL: Joi.string().required(),
  
  // Redis
  REDIS_URL: Joi.string().default('redis://localhost:6379'),
  
  // JWT
  JWT_SECRET: Joi.string().min(32).required(),
  JWT_EXPIRES_IN: Joi.string().default('15m'),
  REFRESH_TOKEN_EXPIRES_IN: Joi.string().default('7d'),
  
  // Email
  SMTP_HOST: Joi.string().default('localhost'),
  SMTP_PORT: Joi.number().default(587),
  SMTP_SECURE: Joi.boolean().default(false),
  SMTP_USER: Joi.string().default(''),
  SMTP_PASS: Joi.string().default(''),
  EMAIL_FROM: Joi.string().email().default('noreply@receipttracker.com'),
  
  // File Upload
  MAX_FILE_SIZE: Joi.string().default('10MB'),
  ALLOWED_FILE_TYPES: Joi.string().default('image/jpeg,image/png,image/webp'),
  UPLOAD_DIR: Joi.string().default('./uploads'),
  
  // OCR
  OCR_LANGUAGE: Joi.string().default('eng'),
  OCR_CONFIDENCE_THRESHOLD: Joi.number().default(60),
  OCR_PSM: Joi.number().default(3),
  
  // Product APIs
  UPC_API_KEY: Joi.string().optional(),
  UPC_API_URL: Joi.string().default('https://api.upcdatabase.org/product'),
  
  // Notifications
  NOTIFICATION_REMINDER_DAYS: Joi.string().default('30,7,1'),
  
  // Security
  BCRYPT_ROUNDS: Joi.number().default(12),
  CORS_ORIGINS: Joi.string().default('http://localhost:3000'),
  
  // Logging
  LOG_LEVEL: Joi.string().valid('error', 'warn', 'info', 'debug').default('info'),
  LOG_FORMAT: Joi.string().default('combined'),
}).unknown();

const { error, value: envVars } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config: Config = {
  nodeEnv: envVars.NODE_ENV,
  port: envVars.PORT,
  corsOrigins: envVars.CORS_ORIGINS.split(',').map((origin: string) => origin.trim()),
  
  // Database
  databaseUrl: envVars.DATABASE_URL,
  
  // Redis
  redisUrl: envVars.REDIS_URL,
  
  // JWT
  jwtSecret: envVars.JWT_SECRET,
  jwtExpiresIn: envVars.JWT_EXPIRES_IN,
  refreshTokenExpiresIn: envVars.REFRESH_TOKEN_EXPIRES_IN,
  
  // Email
  smtpHost: envVars.SMTP_HOST,
  smtpPort: envVars.SMTP_PORT,
  smtpSecure: envVars.SMTP_SECURE,
  smtpUser: envVars.SMTP_USER,
  smtpPass: envVars.SMTP_PASS,
  emailFrom: envVars.EMAIL_FROM,
  
  // File Upload
  maxFileSize: envVars.MAX_FILE_SIZE,
  allowedFileTypes: envVars.ALLOWED_FILE_TYPES.split(',').map((type: string) => type.trim()),
  uploadDir: envVars.UPLOAD_DIR,
  
  // OCR
  ocrLanguage: envVars.OCR_LANGUAGE,
  ocrConfidenceThreshold: envVars.OCR_CONFIDENCE_THRESHOLD,
  ocrPsm: envVars.OCR_PSM,
  
  // Product APIs
  upcApiKey: envVars.UPC_API_KEY,
  upcApiUrl: envVars.UPC_API_URL,
  
  // Notifications
  notificationReminderDays: envVars.NOTIFICATION_REMINDER_DAYS.split(',').map((day: string) => parseInt(day.trim())),
  
  // Security
  bcryptRounds: envVars.BCRYPT_ROUNDS,
  
  // Logging
  logLevel: envVars.LOG_LEVEL,
  logFormat: envVars.LOG_FORMAT,
};
