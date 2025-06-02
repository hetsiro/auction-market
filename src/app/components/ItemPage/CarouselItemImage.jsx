import { Box } from '@mui/material';
import Slider from 'react-slick';

export function CarouselItemImage({ images }) {
  const settings = {
    customPaging: function (i) {
      return (
        <Box
          component="img"
          src={images[i]}
          sx={{
            cursor: 'pointer',
            maxWidth: '128px',
            minWidth: '64px',
            width: '100%',
            backgroundColor: 'secondary.ultraLight',
            borderRadius: 5,
            ':hover': {
              border: '2px solid #1976d2',
            },
          }}
        />
      );
    },
    dots: true,
    arrows: false,
    dotsClass: 'slick-dots-item slick-thumb',
    className: 'slick-slider-item',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Slider {...settings}>
        {images.map((image, index) => (
          <Box
            key={image}
            component="img"
            src={image}
            alt={`Slide ${index}`}
            sx={{
              backgroundColor: 'primary.ultraLight',
              width: '100%',
              maxWidth: '300px',
              minWidth: '150px',
              borderRadius: 5,
            }}
          />
        ))}
      </Slider>
    </Box>
  );
}
