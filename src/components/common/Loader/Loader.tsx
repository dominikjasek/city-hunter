import { FC } from 'react';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Stack, styled } from '@mui/material';
import styles from './loader.module.css';

const LoadingOverlay = styled(Stack)(() => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '5px',
  lineHeight: '2.5rem',
  margin: '1rem',
  textAlign: 'center',
  fontWeight: 'bold',
}));

export const Loader: FC<{ title?: string }> = ({ title }) => {
  return (
    <LoadingOverlay>
      <AutorenewIcon className={styles.animationSpin} />
      {title}
    </LoadingOverlay>
  );
};
