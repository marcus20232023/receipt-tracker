import { Router } from 'express';
import { catchAsync } from '../middleware/errorHandler';

const router = Router();

// GET /api/products
router.get('/', catchAsync(async (req, res) => {
  res.status(501).json({
    status: 'error',
    message: 'Get products endpoint not implemented yet',
  });
}));

// POST /api/products
router.post('/', catchAsync(async (req, res) => {
  res.status(501).json({
    status: 'error',
    message: 'Create product endpoint not implemented yet',
  });
}));

// GET /api/products/:id
router.get('/:id', catchAsync(async (req, res) => {
  res.status(501).json({
    status: 'error',
    message: 'Get product endpoint not implemented yet',
  });
}));

// PUT /api/products/:id
router.put('/:id', catchAsync(async (req, res) => {
  res.status(501).json({
    status: 'error',
    message: 'Update product endpoint not implemented yet',
  });
}));

// DELETE /api/products/:id
router.delete('/:id', catchAsync(async (req, res) => {
  res.status(501).json({
    status: 'error',
    message: 'Delete product endpoint not implemented yet',
  });
}));

// GET /api/products/search?upc=:upc
router.get('/search', catchAsync(async (req, res) => {
  res.status(501).json({
    status: 'error',
    message: 'Product search endpoint not implemented yet',
  });
}));

export default router;
