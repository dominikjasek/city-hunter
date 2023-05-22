import React, { FC, ReactNode } from 'react';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const MessageBox: FC<{ type?: AlertColor; message: string | ReactNode }> = ({ type = 'info', message }) => {
  return <Alert severity={type}>{message}</Alert>;
};
