import { FC } from 'react';
import { Typography } from '@mui/material';

const Unauthorized: FC = () => {
  return (
    <div>
      <Typography>
        Pro zobrazení této stránky nemáte práva. Kontaktujte administrátora.
      </Typography>
    </div>
  );
};

export default Unauthorized;

export async function getStaticProps() {
  return {
    props: {},
  };
}
