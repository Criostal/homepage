import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface GridItemProps {
  title: string;
  subtitle?: string;
  onClick?: () => void;
}

const MyGridItem: React.FC<GridItemProps> = ({ title, subtitle, onClick }) => {
  return (
    <Card onClick={onClick} sx={{ cursor: onClick ? 'pointer' : 'default', height: '100%' }}>
      <CardContent>
        <Box>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MyGridItem;
