import { NextPage } from 'next';
import { Box } from '@mui/material';

const FaqPage: NextPage = () => {
  return <Box>FAQ</Box>;
};

export default FaqPage;

export const getStaticProps = async () => {
  return {
    props: {},
  };
};
