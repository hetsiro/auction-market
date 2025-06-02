import {
  Box,
  ButtonBase,
  Divider,
  Grid,
  Rating,
  Typography,
} from '@mui/material';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { normalizeCategory } from '../../helpers/normalizeCategory';

export const ItemsSearched = () => {
  const { itemsSearched } = useSelector((state) => state.app);
  const navigate = useNavigate();

  const handleShowItem = (product) => {
    navigate(`/item/${product.id}`);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        backgroundColor: 'white',
        borderRadius: 5,
        boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.25)',
        width: '100%',
      }}
    >
      {itemsSearched.map((product, index) => {
        return (
          <Fragment key={product.id}>
            {index > 0 && (
              <Divider
                sx={{
                  width: '100%',
                }}
              />
            )}

            <ButtonBase
              sx={{
                paddingX: { xs: 2, sm: 4 },
                paddingY: { xs: 4, sm: 4 },
              }}
              onClick={() => handleShowItem(product)}
            >
              <Grid
                container
                component="ul"
                alignItems="center"
                spacing={2}
                sx={{ width: '100%' }}
              >
                <Grid size={{ xs: 6, sm: 5 }}>
                  <Box
                    component="img"
                    src={product.thumbnail}
                    alt={product.title}
                    sx={{
                      maxWidth: '300px',
                      width: '100%',
                      backgroundColor: 'primary.ultraLight',
                      borderRadius: 5,
                      p: 1,
                    }}
                  ></Box>
                </Grid>
                <Grid
                  size={{ xs: 6, sm: 7 }}
                  display="flex"
                  justifyContent="flex-start"
                  textAlign="start"
                  flexDirection="column"
                  gap={2}
                >
                  <Box display="flex" flexDirection="column" gap={1}>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: { xs: 1, sm: 2 },
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        fontSize: { xs: '1rem', sm: '1.5rem' },
                      }}
                    >
                      {product.title}
                    </Typography>
                    <Box
                      component="li"
                      sx={{
                        backgroundColor: 'primary.light',
                        px: 1,
                        py: 0.5,
                        borderRadius: 2,
                        width: 'fit-content',
                      }}
                    >
                      <Typography variant="caption" fontWeight={500}>
                        {normalizeCategory(product.category)}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: { xs: 2, sm: 3 }, // máximo 3 líneas
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                      }}
                      variant="body1"
                      textAlign="justify"
                    >
                      {product.description}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection={{ xs: 'column-reverse', sm: 'row' }}
                    justifyContent="flex-start"
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                    gap={2}
                  >
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{
                        fontSize: { xs: '1.25rem', sm: '1.5rem' },
                      }}
                    >
                      {product.price}$
                    </Typography>
                    <Rating
                      name="read-only"
                      value={product.rating}
                      precision={0.5}
                      readOnly
                    />
                  </Box>
                </Grid>
              </Grid>
            </ButtonBase>
          </Fragment>
        );
      })}
    </Box>
  );
};
