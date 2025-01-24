import React, { useState } from "react";
import style from "./UpdateMeetModal.module.scss";

import "react-datepicker/dist/react-datepicker.css";

import Modal from "components/shared/Modal";
import InlineLoader from "components/shared/InlineLoader";

import { patchRequest } from "utils/api";
import { useAppContext } from "contexts/AppContext";
import { CheckCircle } from "react-feather";
import { useEffect } from "react";
import clsx from "clsx";

export default function CreateSlotModal() {
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useAppContext();

  const [formData, setFormData] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const [apiResponse, setApiResponse] = useState({
    isActive: false,
    message: "",
    isError: false,
  });

  function handleChangeForm(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    let postData = formData;

    if (!postData.meet_link || !postData.meet_link.length) {
      setApiResponse({
        isActive: true,
        message: "Please enter meet url",
        isError: true,
      });
      return;
    }

    setIsLoading(true);

    patchRequest(`/accounts/update_meet`, postData)
      .then((resp) => {
        setIsCompleted(true);
      })
      .catch((err) => {
        console.log(err);
        const message = err.response.data["meet_link"] || "An error occured";
        setApiResponse({ isActive: true, message, isError: true });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleClickClose() {
    dispatch({
      type: "SET_IS_OPEN_UPDATE_MEET_MODAL",
      payload: { isOpen: false },
    });
  }

  return (
    <Modal contentClassName={style.wrapper} isOpen={true}>
      {isLoading ? (
        <div className={style.loaderWrapper}>
          <InlineLoader size={50} />
        </div>
      ) : (
        <>
          <div className={style.close} onClick={handleClickClose}>
            &times;
          </div>
          {isCompleted ? (
            <div className={style.completeWrapper}>
              <div className={style.text}>
                <CheckCircle size={25} /> Meet link updated
              </div>
            </div>
          ) : (
            <>
              <form onChange={handleChangeForm} onSubmit={handleSubmit}>
                <div className={style.title}>Update Meet Link</div>

                <label>Meet link</label>
                <input
                  placeholder="Meet URL"
                  type="text"
                  name="meet_link"
                  required
                />

                <div className={style.buttons}>
                  <button onClick={handleSubmit}>Update</button>
                </div>

                {apiResponse.isError && apiResponse.isActive && (
                  <p className={clsx(style.apiResp, style.apiError)}>
                    {apiResponse.message}
                  </p>
                )}
              </form>
            </>
          )}
        </>
      )}
    </Modal>
  );
}
