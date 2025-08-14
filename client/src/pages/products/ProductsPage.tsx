import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Chip,
  LinearProgress,
} from '@mui/material';
import { Add as AddIcon, Warning as WarningIcon } from '@mui/icons-material';

const ProductsPage: React.FC = () => {
  // Mock data - will be replaced with real data from API
  const products = [
    {
      id: '1',
      name: 'iPhone 15 Pro',
      brand: 'Apple',
      purchaseDate: '2024-01-15',
      warrantyEndDate: '2025-01-15',
      daysRemaining: 280,
      status: 'active',
      image: '/api/placeholder/200/150',
    },
    {
      id: '2',
      name: 'MacBook Pro 16"',
      brand: 'Apple',
      purchaseDate: '2024-01-10',
      warrantyEndDate: '2025-01-10',
      daysRemaining: 275,
      status: 'active',
      image: '/api/placeholder/200/150',
    },
    {
      id: '3',
      name: 'Samsung 4K TV',
      brand: 'Samsung',
      purchaseDate: '2023-12-01',
      warrantyEndDate: '2024-12-01',
      daysRemaining: 30,
      status: 'expiring',
      image: '/api/placeholder/200/150',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'expiring':
        return 'warning';
      case 'expired':
        return 'error';
      default:
        return 'default';
    }
  };

  const getWarrantyProgress = (daysRemaining: number) => {
    const totalDays = 365; // Assuming 1-year warranty
    const progress = Math.max(0, Math.min(100, (daysRemaining / totalDays) * 100));
    return progress;
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <div>
          <Typography variant="h4" component="h1" gutterBottom>
            Products
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track warranty status for all your registered products
          </Typography>
        </div>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          size="large"
        >
          Add Product
        </Button>
      </Box>

      {products.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <AddIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No products registered yet
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Add products manually or upload receipts to start tracking warranties
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />}>
            Add Your First Product
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  sx={{ height: 150, bgcolor: 'grey.200' }}
                  title={product.name}
                >
                  <Box
                    sx={{
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    No Image
                  </Box>
                </CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {product.brand}
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={product.status}
                      color={getStatusColor(product.status) as any}
                      size="small"
                      sx={{ textTransform: 'capitalize' }}
                      icon={product.status === 'expiring' ? <WarningIcon /> : undefined}
                    />
                  </Box>

                  <Typography variant="body2" gutterBottom>
                    Warranty expires: {new Date(product.warrantyEndDate).toLocaleDateString()}
                  </Typography>
                  
                  <Box sx={{ mt: 2 }}>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="caption">
                        Warranty Status
                      </Typography>
                      <Typography variant="caption">
                        {product.daysRemaining} days left
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={getWarrantyProgress(product.daysRemaining)}
                      color={product.status === 'expiring' ? 'warning' : 'primary'}
                    />
                  </Box>
                </CardContent>
                <CardActions>
                  <Button size="small">View Details</Button>
                  <Button size="small">Download Manual</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ProductsPage;
