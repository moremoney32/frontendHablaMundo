import React, { useEffect, useState } from 'react';
import "./snackbar.css";

export const SnackBarGrammars = ({ message, image, timeToHide = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (timeToHide !== 'infinite') {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, timeToHide);

      return () => clearTimeout(timer);
    }
  }, [timeToHide, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    isVisible && (
      <div id="snackbar" className="snackbar-visible">
        <img src={image} id="snackbarImg" alt="snackbar icon" />
        {message}
        <span id="actionSnackbar" onClick={handleClose}>×</span>
      </div>
    )
  );
};
