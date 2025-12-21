import React, { useCallback } from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';

const imagesHorses = require('../assets/images/images_horses.json') as { src: string; alt?: string }[];

const Horses: React.FunctionComponent = () => {
  return (
    
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Horses
      </Typography>

      <ImageList variant="masonry" cols={2} gap={8}>
        {imagesHorses.map((item, i) => {
          const src = item.src;
          return (
            <ImageListItem key={i} style={{ breakInside: 'avoid' }}>
              <img
                src={require(`../assets/images/${src}`)}
                alt={item.alt ?? `horse-${i}`}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </ImageListItem>
          );
        })}
      </ImageList>
    </>
  );
};

export default Horses;