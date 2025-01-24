import React from "react";
import { useNavigate } from "react-router-dom";

import style from "./PreFooterBanner.module.scss";

import Modal from "components/shared/Modal";
import GetInTouch from "components/shared/GetInTouch";
import { useState } from "react";

export default function PreFooterBanner({ onClick }) {
  const navigate = useNavigate();

  const [isOpenModal, setIsOpenModal] = useState(false);

  function handleClickBtn() {
    // setIsOpenModal((prev) => !prev);
    window.open(" https://jivo.chat/e8yuMmV12o");
  }

  return (
    <div className={style.wrapper}>
      <Modal onClose={handleClickBtn} isOpen={isOpenModal}>
        <div className={style.modalWrapper}>
          <GetInTouch onClose={handleClickBtn} />
        </div>
      </Modal>

      <div className={style.main}>
        <div className={style.mainText}>Ready to start your journey towards a perfect career ?</div>
        <div className={style.subtext}>Get started with India's best career development mechanism</div>
        <button onClick={handleClickBtn}>Chat with an expert</button>
      </div>
    </div>
  );
}
