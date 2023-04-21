import { NextPageWithLayout } from './_app';
import { Button, Typography } from '@mui/material';
import React from 'react';
import { GetStaticPropsContext } from 'next';

const IndexPage: NextPageWithLayout = () => {
  return (
    <>
      <Typography variant={'h4'}>City Hunter!</Typography>
      <Button variant={'contained'} color={'secondary'}>
        <Typography fontWeight="bold">nice hochu</Typography>
      </Button>
      <br />
    </>
  );
};

export default IndexPage;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {},
  };
};
