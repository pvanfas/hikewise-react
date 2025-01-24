import React from "react";
import style from "./Modal.module.scss";

import clsx from "clsx";

const Modal = ({ className, contentClassName, title, handleClose, isOpen, children }) => {
  return (
    isOpen && (
      <div className={clsx(style.backdrop, className)}>
        <div className={clsx(style.content, contentClassName)}>{children}</div>
      </div>
    )
  );
};

export default Modal;
