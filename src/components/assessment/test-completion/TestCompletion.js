import React from "react";
import style from "./TestCompletion.module.scss";

import Modal from "components/shared/Modal";
import Congrats from "./Congrats";

import { useAppContext } from "contexts/AllContexts";

export default function TestCompletion() {
  const { dispatch } = useAppContext();

  function handleClose() {
    dispatch({ type: "SET_IS_COMPLETE_MODAL", payload: { isOpen: false } });
  }

  return (
    <div className={style.wrapper} id="testCompletionModal">
      <Modal isOpen={true} contentClassName={style.modalWrapper}>
        <div onClick={handleClose} className={style.crossButton}>
          &times;
        </div>
        <Congrats />
      </Modal>
    </div>
  );
}
