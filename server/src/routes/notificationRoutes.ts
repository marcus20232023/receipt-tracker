import { Router } from 'express';
import { catchAsync } from '../middleware/errorHandler';

const router = Router();

// GET /api/notifications
router.get('/', catchAsync(async (req, res) => {
  res.status(501).json({
    status: 'error',
    message: 'Get notifications endpoint not implemented yet',
  });
}));

// PUT /api/notifications/:id/read
router.put('/:id/read', catchAsync(async (req, res) => {
  res.status(501).json({
    status: 'error',
    message: 'Mark notification as read endpoint not implemented yet',
  });
}));

// DELETE /api/notifications/:id
router.delete('/:id', catchAsync(async (req, res) => {
  res.status(501).json({
    status: 'error',
    message: 'Delete notification endpoint not implemented yet',
  });
}));

export default router;
