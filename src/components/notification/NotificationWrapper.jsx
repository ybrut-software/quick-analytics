import "react-toastify/dist/ReactToastify.css";

import React, { Children } from "react";
import { ToastContainer, toast } from "react-toastify";

const NotificationWrapper = ({ children }) => {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
      {children}
    </>
  );
};

export default NotificationWrapper;
