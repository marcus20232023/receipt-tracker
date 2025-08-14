import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import {
  TrendingUp,
  Receipt,
  Inventory,
  Warning,
} from '@mui/icons-material';

const DashboardPage: React.FC = () => {
  // Mock data - will be replaced with real data from API
  const stats = {
    totalReceipts: 45,
    totalProducts: 128,
    expiringSoon: 7,
    totalValue: 5420.50,
  };

  const StatCard: React.FC<{
    title: string;
    value: string;
    icon: React.ReactNode;
    color: string;
  }> = ({ title, value, icon, color }) => (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h4" component="div" sx={{ color }}>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
          </Box>
          <Box sx={{ color: color, fontSize: 40 }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Welcome to your Receipt & Warranty Tracker
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Receipts"
            value={stats.totalReceipts.toString()}
            icon={<Receipt />}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Products"
            value={stats.totalProducts.toString()}
            icon={<Inventory />}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Expiring Soon"
            value={stats.expiringSoon.toString()}
            icon={<Warning />}
            color="#d32f2f"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Value"
            value={`$${stats.totalValue.toFixed(2)}`}
            icon={<TrendingUp />}
            color="#7b1fa2"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Typography color="text.secondary">
              No recent activity. Start by uploading your first receipt!
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button variant="contained" fullWidth>
                Upload Receipt
              </Button>
              <Button variant="outlined" fullWidth>
                Add Product Manually
              </Button>
              <Button variant="outlined" fullWidth>
                View Warranties
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
