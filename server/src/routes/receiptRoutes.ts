import { Router } from 'express';
import { catchAsync } from '../middleware/errorHandler';

const router = Router();

// GET /api/receipts
router.get('/', catchAsync(async (req, res) => {
  res.status(501).json({
    status: 'error',
    message: 'Get receipts endpoint not implemented yet',
  });
}));

// POST /api/receipts/upload
router.post('/upload', catchAsync(async (req, res) => {
  res.status(501).json({
    status: 'error',
    message: 'Receipt upload endpoint not implemented yet',
  });
}));

// GET /api/receipts/:id
router.get('/:id', catchAsync(async (req, res) => {
  res.status(501).json({
    status: 'error',
    message: 'Get receipt endpoint not implemented yet',
  });
}));

// PUT /api/receipts/:id
router.put('/:id', catchAsync(async (req, res) => {
  res.status(501).json({
    status: 'error',
    message: 'Update receipt endpoint not implemented yet',
  });
}));

// DELETE /api/receipts/:id
router.delete('/:id', catchAsync(async (req, res) => {
  res.status(501).json({
    status: 'error',
    message: 'Delete receipt endpoint not implemented yet',
  });
}));

// POST /api/receipts/:id/process
router.post('/:id/process', catchAsync(async (req, res) => {
  res.status(501).json({
    status: 'error',
    message: 'Process receipt endpoint not implemented yet',
  });
}));

export default router;
