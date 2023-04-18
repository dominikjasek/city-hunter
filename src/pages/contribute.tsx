import React from 'react';
import { NextPage } from 'next';
import { UploadImageForm } from '~/components/form/UploadImageForm';

export const Contribute: NextPage = () => {
  return (
    <div>
      <UploadImageForm />
    </div>
  );
};

export default Contribute;

export async function getStaticProps() {
  return {
    props: {},
  };
}
