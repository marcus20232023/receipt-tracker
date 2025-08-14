import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import { Add as AddIcon, CloudUpload as UploadIcon } from '@mui/icons-material';

const ReceiptsPage: React.FC = () => {
  // Mock data - will be replaced with real data from API
  const receipts = [
    {
      id: '1',
      merchantName: 'Best Buy',
      date: '2024-01-15',
      total: 299.99,
      status: 'processed',
      productsCount: 2,
    },
    {
      id: '2',
      merchantName: 'Target',
      date: '2024-01-12',
      total: 45.67,
      status: 'processing',
      productsCount: 0,
    },
    {
      id: '3',
      merchantName: 'Home Depot',
      date: '2024-01-10',
      total: 125.50,
      status: 'processed',
      productsCount: 3,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed':
        return 'success';
      case 'processing':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
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
            Receipts
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage and view all your uploaded receipts
          </Typography>
        </div>
        <Button
          variant="contained"
          startIcon={<UploadIcon />}
          size="large"
        >
          Upload Receipt
        </Button>
      </Box>

      {receipts.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <UploadIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No receipts uploaded yet
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Upload your first receipt to start tracking your purchases and warranties
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />}>
            Upload Your First Receipt
          </Button>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Merchant</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Products</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {receipts.map((receipt) => (
                <TableRow key={receipt.id}>
                  <TableCell component="th" scope="row">
                    {receipt.merchantName}
                  </TableCell>
                  <TableCell>
                    {new Date(receipt.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">
                    ${receipt.total.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={receipt.status}
                      color={getStatusColor(receipt.status) as any}
                      size="small"
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {receipt.productsCount}
                  </TableCell>
                  <TableCell align="center">
                    <Button size="small" variant="outlined">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ReceiptsPage;
