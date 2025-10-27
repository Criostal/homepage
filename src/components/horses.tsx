import React, { useCallback } from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';

const imagesHorses = require('../assets/horses/images_horses.json') as { src: string; alt?: string }[];

// helper to resolve typical path forms:
// - absolute http(s) -> unchanged
// - absolute root-path (/...) -> unchanged (served from same origin)
// - relative filename -> assume in public/assets/horses/
const resolveSrc = (raw: string) => {
  if (!raw) return raw;
  if (/^https?:\/\//i.test(raw)) return raw;
  if (raw.startsWith('/')) return raw;
  // remove leading ./ or ../
  const cleaned = raw.replace(/^(\.\/|\.{2}\/)+/, '');
  return `${process.env.PUBLIC_URL || ''}/assets/horses/${cleaned}`;
};

const placeholder =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect fill="%23eee" width="100%" height="100%"/><text fill="%23999" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="20">image not available</text></svg>';

const Horses: React.FC = () => {
  const handleError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.src === placeholder) return;
    img.src = placeholder;
  }, []);

  // debug: log resolved urls to console (remove in production)
  React.useEffect(() => {
    console.log('Resolved horse image urls:', imagesHorses.map(i => resolveSrc(i.src)));
  }, []);

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Horses
      </Typography>

      <img src={resolveSrc(imagesHorses[0].src)}></img>
      <p>{resolveSrc(imagesHorses[0].src)}</p>
    

      <ImageList variant="masonry" cols={2} gap={8}>
        {imagesHorses.map((item, i) => {
          const src = resolveSrc(item.src);
          return (
            <ImageListItem key={i} style={{ breakInside: 'avoid' }}>
              <img
                src={src}
                alt={item.alt ?? `horse-${i}`}
                loading="lazy"
                onError={handleError}
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