import 'dotenv/config';
import { Worker } from 'bullmq';
import { config } from './config/config';
import { logger } from './utils/logger';

// Job processors (will be implemented later)
import { processOCRJob } from './jobs/ocrJob';
import { processWarrantyCheckJob } from './jobs/warrantyCheckJob';
import { processNotificationJob } from './jobs/notificationJob';
import { processProductLookupJob } from './jobs/productLookupJob';

const workers: Worker[] = [];

// OCR Processing Worker
const ocrWorker = new Worker('ocr-processing', processOCRJob, {
  connection: {
    host: config.redisUrl.includes('://') ? new URL(config.redisUrl).hostname : config.redisUrl.split(':')[0],
    port: config.redisUrl.includes('://') ? parseInt(new URL(config.redisUrl).port) : parseInt(config.redisUrl.split(':')[1]) || 6379,
  },
  concurrency: 2,
});

// Warranty Check Worker
const warrantyWorker = new Worker('warranty-check', processWarrantyCheckJob, {
  connection: {
    host: config.redisUrl.includes('://') ? new URL(config.redisUrl).hostname : config.redisUrl.split(':')[0],
    port: config.redisUrl.includes('://') ? parseInt(new URL(config.redisUrl).port) : parseInt(config.redisUrl.split(':')[1]) || 6379,
  },
  concurrency: 1,
});

// Notification Worker
const notificationWorker = new Worker('send-notification', processNotificationJob, {
  connection: {
    host: config.redisUrl.includes('://') ? new URL(config.redisUrl).hostname : config.redisUrl.split(':')[0],
    port: config.redisUrl.includes('://') ? parseInt(new URL(config.redisUrl).port) : parseInt(config.redisUrl.split(':')[1]) || 6379,
  },
  concurrency: 5,
});

// Product Lookup Worker
const productWorker = new Worker('product-lookup', processProductLookupJob, {
  connection: {
    host: config.redisUrl.includes('://') ? new URL(config.redisUrl).hostname : config.redisUrl.split(':')[0],
    port: config.redisUrl.includes('://') ? parseInt(new URL(config.redisUrl).port) : parseInt(config.redisUrl.split(':')[1]) || 6379,
  },
  concurrency: 3,
});

workers.push(ocrWorker, warrantyWorker, notificationWorker, productWorker);

// Worker event handlers
workers.forEach((worker) => {
  worker.on('ready', () => {
    logger.info(`🔧 Worker ${worker.name} is ready`);
  });

  worker.on('completed', (job) => {
    logger.info(`✅ Job ${job.id} in queue ${worker.name} completed`);
  });

  worker.on('failed', (job, err) => {
    logger.error(`❌ Job ${job?.id} in queue ${worker.name} failed:`, err);
  });

  worker.on('error', (err) => {
    logger.error(`🚨 Worker ${worker.name} error:`, err);
  });
});

logger.info('🚀 Background workers started');

// Graceful shutdown
const gracefulShutdown = async (signal: string) => {
  logger.info(`${signal} received. Shutting down workers...`);
  
  try {
    await Promise.all(workers.map(worker => worker.close()));
    logger.info('All workers shut down gracefully');
    process.exit(0);
  } catch (error) {
    logger.error('Error during worker shutdown:', error);
    process.exit(1);
  }
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
