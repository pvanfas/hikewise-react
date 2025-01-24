import Modal from "components/shared/Modal";
import React from "react";
import style from "./ContentModal.module.scss";

export default function ContentModal({ isOpen, onClose, content }) {
  return (
    <Modal isOpen={isOpen} contentClassName={style.wrapper}>
      <div className={style.title}>
        <div>{content.title}</div>
        <div onClick={onClose}> &times;</div>
      </div>
      <div className={style.content}>
        {content.points.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    </Modal>
  );
}
