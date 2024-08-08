



import React, { useState } from 'react';
import { Box, Grid, Typography, TextField, Button, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const AdminSettings = () => {
  const [userRole, setUserRole] = useState('admin');
  const [emailConfig, setEmailConfig] = useState({ smtpServer: '', port: '' });

  const handleSaveSettings = () => {
    // Handle saving settings logic
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        הגדרות מערכת
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              ניהול משתמשים
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="role-select-label">תפקיד</InputLabel>
              <Select
                labelId="role-select-label"
                id="role-select"
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
              >
                <MenuItem value="admin">אדמין</MenuItem>
                <MenuItem value="manager">מנהל</MenuItem>
                <MenuItem value="user">משתמש</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              הגדרות מייל
            </Typography>
            <TextField
              label="שרת SMTP"
              variant="outlined"
              fullWidth
              sx={{ my: 2 }}
              value={emailConfig.smtpServer}
              onChange={(e) => setEmailConfig({ ...emailConfig, smtpServer: e.target.value })}
            />
            <TextField
              label="פורט"
              variant="outlined"
              fullWidth
              sx={{ my: 2 }}
              value={emailConfig.port}
              onChange={(e) => setEmailConfig({ ...emailConfig, port: e.target.value })}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSaveSettings}>
            שמור הגדרות
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminSettings;
