import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Divider,
  Alert,
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const SettingsPage: React.FC = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Manage your account preferences and notification settings
      </Typography>

      <Paper sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Profile" />
            <Tab label="Notifications" />
            <Tab label="Security" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom>
            Profile Information
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
            <TextField
              label="First Name"
              variant="outlined"
              defaultValue="John"
            />
            <TextField
              label="Last Name"
              variant="outlined"
              defaultValue="Doe"
            />
            <TextField
              label="Email"
              variant="outlined"
              defaultValue="john.doe@example.com"
              disabled
            />
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{ alignSelf: 'flex-start' }}
            >
              Save Changes
            </Button>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            Notification Preferences
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Email notifications for warranty expiration"
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Email notifications for return period expiration"
            />
            <FormControlLabel
              control={<Switch />}
              label="Weekly summary emails"
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="In-app notifications"
            />
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle1" gutterBottom>
              Reminder Schedule
            </Typography>
            <TextField
              label="Warranty reminder days before expiration"
              variant="outlined"
              defaultValue="30, 7, 1"
              helperText="Comma-separated values (e.g., 30, 7, 1)"
              sx={{ maxWidth: 400 }}
            />
            <TextField
              label="Return period reminder days before expiration"
              variant="outlined"
              defaultValue="7, 1"
              helperText="Comma-separated values (e.g., 7, 1)"
              sx={{ maxWidth: 400 }}
            />
            
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{ alignSelf: 'flex-start', mt: 2 }}
            >
              Save Preferences
            </Button>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            Security Settings
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
            <Alert severity="info">
              Change your password to keep your account secure
            </Alert>
            <TextField
              label="Current Password"
              type="password"
              variant="outlined"
            />
            <TextField
              label="New Password"
              type="password"
              variant="outlined"
            />
            <TextField
              label="Confirm New Password"
              type="password"
              variant="outlined"
            />
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{ alignSelf: 'flex-start' }}
            >
              Update Password
            </Button>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle1" gutterBottom>
              Account Actions
            </Typography>
            <Button variant="outlined" color="error">
              Delete Account
            </Button>
          </Box>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default SettingsPage;
