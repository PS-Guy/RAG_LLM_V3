import React from 'react';
import { Box, FormControlLabel, Switch } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


function ToggleButtons({ isDarkMode, setIsDarkMode, isLoggingEnabled, setIsLoggingEnabled }) {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 16,
        right: 16,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 2,
        p: 1,
        borderRadius: 2,
        border: '1px solid',
        bgcolor: 'background.paper',
        boxShadow: 5,
      }}
    >
      <FormControlLabel
        control={
          <Switch
            checked={isLoggingEnabled}
            onChange={(e) => setIsLoggingEnabled(e.target.checked)}
          />
        }
        label="Logging"
        labelPlacement="start"
      />

      <FormControlLabel
        control={
          <Switch
            checked={isDarkMode}
            onChange={(e) => setIsDarkMode(e.target.checked)}
            icon={<Brightness7Icon />}
            checkedIcon={<Brightness4Icon />}
          />
        }
        label="Dark Mode"
        labelPlacement="start"
      />
    </Box>
  );
}

export default ToggleButtons;
