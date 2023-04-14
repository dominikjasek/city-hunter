import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';
import { SignIn } from '@clerk/nextjs';
import { Dialog } from '@mui/material';

interface DialogContextType {
  openLoginDialog: () => void;
}

const DialogContext = createContext<DialogContextType | null>(null);

export const DialogProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [openLoginDialog, setOpenLoginDialog] = useState(false);

  const providerValue = useMemo<DialogContextType>(
    () => ({
      openLoginDialog: () => {
        setOpenLoginDialog(true);
      },
    }),
    [setOpenLoginDialog],
  );

  return (
    <DialogContext.Provider value={providerValue}>
      {children}
      <Dialog
        onClose={() => setOpenLoginDialog(false)}
        PaperProps={{
          style: { borderRadius: '1rem' },
        }}
        open={openLoginDialog}
      >
        <SignIn />
      </Dialog>
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};
