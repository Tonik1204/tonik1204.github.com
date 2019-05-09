import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import { toast, ToastContainer } from 'react-toastify';
import { toastTimer } from 'config/config';
import ToastMessage from 'atoms/toast-message';

interface Props {
  show: boolean;
  errorText?: string;
}

const Toast = (props: Props) => {
  const {
    show,
    errorText = 'Sorry, an error has occurred. Please try again',
  } = props;
  const toastId: string = '';

  useEffect(() => {
    if (show && !toast.isActive(toastId)) {
      toast(<ToastMessage>{errorText}</ToastMessage>, {
        toastId,
      });
    }
  }, [show, errorText]);

  return <ToastContainer autoClose={toastTimer} />;
};

export default Toast;
