import { Alert, Snackbar } from '@mui/material';
import React, { createContext, useContext, useState } from 'react';

type MessageType = 'success' | 'error' | 'info' | 'warning';

interface INotificationContext {
  message: string;
  type: MessageType;
  showNotification: (options: { message: string, type: MessageType }) => void;
  handleClose: () => void;
  open: boolean
}

interface MoreProps {
  message: string;
  type: MessageType;
}

interface NotifyProps {
  children: React.ReactNode
}

const defaultValue: INotificationContext = {
  message: '',
  type: 'success',
  showNotification: () => {},
  handleClose: () => {},
  open: false
};

const NotificationContext = createContext(defaultValue);

const NotificationProvider: React.FC<NotifyProps> = ({ children }) => {
  const [notification, setNotification] = useState<MoreProps>({ message: '', type: 'success' });
  const [open, setOpen] = useState(false);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const showNotification = ({ message, type }: { message: string, type: MessageType }) => {
    setNotification({ message, type });
    setOpen(true)
  };

  return (
    <NotificationContext.Provider value={{ message: notification.message, type: notification.type, showNotification, handleClose, open }}>
      {children}
    </NotificationContext.Provider>
  );
};

const NotificationSnackbar: React.FC = () => {
  const { message, type, handleClose, open } = useContext(NotificationContext);

  return (
    <Snackbar 
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open} 
      autoHideDuration={2000}
      onClose={handleClose}
      sx={{position: 'fixed', zIndex: 1500}}
    >
      <Alert severity={type} onClose={handleClose} sx={{ width: '100%', fontSize: "1.5rem" , fontFamily: "Poppins, sans-serif"}}>
          {message}
      </Alert>
    </Snackbar>
  );
};

export { NotificationContext, NotificationProvider, NotificationSnackbar };

