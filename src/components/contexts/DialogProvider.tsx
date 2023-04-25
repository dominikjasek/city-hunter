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
  setOpenLoginDialog: (newState: boolean) => void;
}

const DialogContext = createContext<DialogContextType | null>(null);

export const DialogProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [openLoginDialog, setOpenLoginDialog] = useState(false);

  const providerValue = useMemo<DialogContextType>(
    () => ({
      setOpenLoginDialog,
    }),
    [setOpenLoginDialog],
  );

  return (
    <DialogContext.Provider value={providerValue}>
      <Dialog
        onClose={() => setOpenLoginDialog(false)}
        PaperProps={{
          style: { borderRadius: '1rem', textAlign: 'center' },
        }}
        open={openLoginDialog}
      >
        <SignIn
          appearance={{
            elements: {
              rootBox: {
                maxWidth: '100%',
                '& .cl-signIn-start': {
                  maxWidth: '100%',
                  margin: 0,
                },
              },
            },
          }}
        />
      </Dialog>
      {children}
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
