import { Box, Rating, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { ItemButton, CarouselItemImage } from './';
import { normalizeCategory } from '../../helpers';

export const MainItem = () => {
  const { actualItem } = useSelector((state) => state.app);

  return (
    <>
      <Box
        component="section"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: 5,
          boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
          width: '90%',
          margin: 'auto 0',
          maxWidth: '640px',
          minWidth: '288px',
          py: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '90%',
            gap: 4,
          }}
        >
          {actualItem && (
            <Box
              sx={{
                component: 'article',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              {actualItem.images.length <= 1 ? (
                <Box
                  component="img"
                  src={actualItem.thumbnail}
                  sx={{
                    width: '100%',
                    height: '100%',
                    maxWidth: '300px',
                    minWidth: '150px',
                    borderRadius: 5,
                    backgroundColor: 'primary.ultraLight',
                    p: 1,
                  }}
                />
              ) : (
                <CarouselItemImage images={actualItem.images} />
              )}
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                gap={1}
                component="ul"
              >
                <Typography variant="h5" fontWeight={700}>
                  {actualItem.title}
                </Typography>
                <Box
                  component="li"
                  sx={{
                    backgroundColor: 'primary.light',
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    width: 'fit-content',
                  }}
                >
                  <Typography
                    variant="caption"
                    fontWeight={500}
                    sx={{
                      width: 'auto',
                    }}
                  >
                    {normalizeCategory(actualItem.category)}
                  </Typography>
                </Box>
                <Typography variant="h6" fontWeight={700}>
                  {actualItem.price}$
                </Typography>
                <Box
                  display="flex"
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'flex-start', sm: 'center' }}
                  justifyContent="space-between"
                  width="100%"
                >
                  <Typography variant="subtitle1">
                    {actualItem.stock} Disponibles
                  </Typography>
                  <Rating
                    name="read-only"
                    value={actualItem.rating}
                    precision={0.5}
                    readOnly
                  />
                </Box>
                <Typography variant="body1" textAlign="justify">
                  {actualItem.description}
                </Typography>
              </Box>
            </Box>
          )}
          <ItemButton item={actualItem} />
        </Box>
      </Box>
    </>
  );
};
