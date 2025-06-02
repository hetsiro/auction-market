import { Box, ButtonBase, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { startSearchingProducts } from '../../../store/app/appThunks';

export const Results = () => {
  const { categories, search, page, totalProducts } = useSelector(
    (state) => state.app
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState(null);
  const [viewMore, setViewMore] = useState(true);

  const handleViewMore = () => {
    setViewMore((viewMore) => !viewMore);
  };

  useEffect(() => {
    setIsSelected(false);
  }, [search]);

  const handleFilterCategory = (category) => {
    setIsSelected((isSelected) => {
      const newValue = isSelected === category ? null : category;
      if (newValue === category) {
        const mappedCategory = category.split(' ').join('-').toLowerCase();
        navigate(`/search/?q=${search}&page=1&category=${mappedCategory}`);
        dispatch(startSearchingProducts(search, 1, mappedCategory));
      } else {
        dispatch(startSearchingProducts(search, page));
        navigate(`/search/?q=${search}&page=${page}`);
      }
      return newValue;
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mb: 2,
        p: 4,
        gap: 4,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 5,
        boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.25)',
      }}
    >
      <Box component="ul" display="flex" flexDirection="column" gap={0}>
        <Typography component="li" fontSize={20} variant="body1">
          <strong>{totalProducts}</strong> Resultados de{' '}
          <strong>&quot;{search}&quot;</strong>
        </Typography>
      </Box>

      {categories.length !== 0 && (
        <Box
          component="ul"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: ' center',
            gap: 2,
            listStyle: 'none',
          }}
        >
          {categories.map((category, index) => {
            if (index >= 3 && viewMore) return;
            return (
              <ButtonBase key={category.title}>
                <Box
                  onClick={() => handleFilterCategory(category.title)}
                  component="li"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    bgcolor:
                      isSelected === category.title
                        ? 'primary.light'
                        : 'primary.ultraLight',
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body2" fontWeight={500} sx={{}}>
                    {category.title}
                  </Typography>
                  <Typography variant="body2" fontWeight={500} sx={{}}>
                    {category.count}
                  </Typography>
                </Box>
              </ButtonBase>
            );
          })}
          {categories.length >= 4 && (
            <ButtonBase onClick={handleViewMore}>
              <Typography
                variant="body1"
                sx={{
                  backgroundColor: 'secondary.main',
                  height: '56px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  px: 3,
                  borderRadius: 2,
                  fontWeight: 500,
                }}
              >
                {viewMore ? '...' : 'View less...'}{' '}
              </Typography>
            </ButtonBase>
          )}
        </Box>
      )}
    </Box>
  );
};
