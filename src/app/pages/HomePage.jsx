import { Box } from '@mui/material';

import { CarouselTopRated } from '../components/HomePage';
import { Layout } from '../layout';

export const HomePage = () => {
  return (
    <Layout>
      <Box display="flex" flexDirection="column" width="100%" gap={2}>
        <CarouselTopRated />
      </Box>
    </Layout>
  );
};
