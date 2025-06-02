import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from '@mui/material';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Slider from 'react-slick';

import { startGettingTopRatedProducts } from '../../../../store/app/appThunks';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const CarouselTopRated = () => {
  const sliderRef = useRef();

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          dots: false,
          // arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const dispatch = useDispatch();
  const { topRated } = useSelector((state) => state.app);
  const navigate = useNavigate();
  const handleNavigateToProduct = (item) => {
    navigate(`/item/${item}`);
  };

  useEffect(() => {
    dispatch(startGettingTopRatedProducts());
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: 5,
        width: '100%',
        backgroundColor: 'white',
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.25)',
        gap: 2,
        p: 4,
        minWidth: '288px',
      }}
    >
      <Typography
        variant="h4"
        fontWeight={500}
        sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
      >
        Top rated
      </Typography>
      {topRated.length > 0 && (
        <Box
          sx={{
            width: '100%',
          }}
        >
          <Slider {...settings} ref={sliderRef}>
            {topRated.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: 'flex',
                  height: '100%',
                  p: 1,
                }}
              >
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.25)',
                    borderRadius: 5,
                    p: 2,
                    gap: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.thumbnail}
                    alt={item.title}
                    sx={{
                      maxWidth: '300px',
                      backgroundColor: 'primary.ultraLight',
                      borderRadius: 5,
                    }}
                  />
                  <CardContent
                    sx={{
                      maxWidth: '300px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%',
                      gap: { xs: 1, sm: 2 },
                      p: '0 !important',
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: '1rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 1, // máximo 3 líneas
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: { xs: '0.825rem', sm: '1rem' },
                        display: '-webkit-box',
                        WebkitLineClamp: 3, // máximo 3 líneas
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {item.description}
                    </Typography>
                    <Rating
                      name="read-only"
                      value={item.rating}
                      precision={0.5}
                      readOnly
                    />
                    <Button
                      onClick={() => handleNavigateToProduct(item.id)}
                      variant="contained"
                      sx={{
                        fontWeight: 700,
                        color: 'white',
                        my: 3,
                      }}
                    >
                      View product
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Slider>
        </Box>
      )}
    </Box>
  );
};
