import { Router } from 'express';
import { catchAsync } from '../middleware/errorHandler';

const router = Router();

// GET /api/warranties
router.get('/', catchAsync(async (req, res) => {
  res.status(501).json({
    status: 'error',
    message: 'Get warranties endpoint not implemented yet',
  });
}));

// GET /api/warranties/expiring
router.get('/expiring', catchAsync(async (req, res) => {
  res.status(501).json({
    status: 'error',
    message: 'Get expiring warranties endpoint not implemented yet',
  });
}));

// PUT /api/warranties/:id
router.put('/:id', catchAsync(async (req, res) => {
  res.status(501).json({
    status: 'error',
    message: 'Update warranty endpoint not implemented yet',
  });
}));

export default router;
