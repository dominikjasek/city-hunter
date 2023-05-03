import React from 'react';
import { NextPage } from 'next';

const UserPage: NextPage = () => {
  return <div>Uživatelská sekce</div>;
};

export default UserPage;

export async function getStaticProps() {
  return {
    props: {},
  };
}
