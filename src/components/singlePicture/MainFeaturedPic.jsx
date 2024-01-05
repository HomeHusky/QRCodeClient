import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { getPicPath } from '../../utils';

function MainFeaturedPic(props) {
  const { pic } = props;

  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${getPicPath(pic.img)})`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={pic.img} alt={pic.imgLabel} />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {pic.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {pic.description}
            </Typography>
            <Link variant="subtitle1" href="#">
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

MainFeaturedPic.propTypes = {
  post: PropTypes.shape({
    description: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    imgLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default MainFeaturedPic;