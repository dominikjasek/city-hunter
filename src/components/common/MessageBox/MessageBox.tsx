import React, { FC } from 'react';
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const MessageBox: FC<{ type?: AlertColor; message: string }> = ({
  type = 'info',
  message,
}) => {
  return <Alert severity={type}>{message}</Alert>;
};
