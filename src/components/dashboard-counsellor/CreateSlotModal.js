import React, { useState } from "react";
import style from "./CreateSlotModal.module.scss";

import Select from "react-select";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

import Modal from "components/shared/Modal";
import { postRequest } from "utils/api";
import InlineLoader from "components/shared/InlineLoader";

import { useAppContext } from "contexts/AppContext";
import clsx from "clsx";

const options = [
  { value: "08-09", label: "08 AM - 09 AM" },
  { value: "09-10", label: "09 AM - 10 AM" },
  { value: "10-11", label: "10 AM - 11 AM" },
  { value: "11-12", label: "11 AM - 12 AM" },
  { value: "12-13", label: "12 AM - 01 PM" },
  { value: "13-14", label: "01 PM - 02 PM" },
  { value: "14-15", label: "02 PM - 03 PM" },
  { value: "15-16", label: "03 PM - 04 PM" },
  { value: "16-17", label: "04 PM - 05 PM" },
  { value: "17-18", label: "05 PM - 06 PM" },
  { value: "18-19", label: "06 PM - 07 PM" },
  { value: "19-20", label: "07 PM - 08 PM" },
  { value: "20-21", label: "08 PM - 09 PM" },
  { value: "21-22", label: "09 PM - 10 PM" },
  { value: "22-23", label: "10 PM - 11 PM" },
];

export default function CreateSlotModal() {
  const [dateSelected, setDateSelected] = useState(new Date());
  const [slotSelected, setSlotSelected] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [apiResponse, setApiResponse] = useState({
    isActive: false,
    isError: false,
    message: "",
  });

  const { dispatch } = useAppContext();

  const customStyles = {
    control: (base) => ({
      ...base,
      height: 35,
      minHeight: 35,
      border: "1px solid #eeeeee",
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: "30px",
      padding: "0 6px",
    }),

    input: (provided, state) => ({
      ...provided,
      margin: "0px",
      height: 35,
      minHeight: 35,
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "30px",
    }),
  };

  function handleDateChange(date) {
    setDateSelected(date);
  }

  function handleChangeSlot(e) {
    setSlotSelected(e.value);
  }

  function handleSubmit() {
    if (!slotSelected) {
      setApiResponse({
        isActive: true,
        isError: true,
        message: "*Please select a slot",
      });
      return;
    }

    setApiResponse({ isActive: true, isError: false, message: "" });

    setIsLoading(true);
    let postData = {
      date: moment(dateSelected).format("YYYY-MM-DD"),
      slot: slotSelected,
    };
    postRequest(`/cde/new/slot`, postData)
      .then(() => {
        window.location.href = "/dashboard/counsellor/calendar";
      })
      .catch((err) => {
        console.log(err);
        const message =
          err.response.data["slot"] || "An error occured. Please try again";
        setApiResponse({ isActive: true, isError: true, message });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleClickClose() {
    dispatch({
      type: "SET_IS_OPEN_CREATE_SLOT_MODAL",
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
              <div className={style.text}>Slot Created !</div>
              <button>Book Another</button>
            </div>
          ) : (
            <>
              <div className={style.title}>Create A Slot</div>
              <div className={style.row}>
                <label>Select date</label>
                <DatePicker
                  selected={dateSelected}
                  onChange={handleDateChange}
                />
              </div>
              <div className={style.row}>
                <label>Select Slot</label>
                <Select
                  options={options}
                  styles={customStyles}
                  onChange={handleChangeSlot}
                />
              </div>
              <div className={style.buttons}>
                <button onClick={handleSubmit}>Create</button>
              </div>

              {apiResponse.isActive && apiResponse.isError && (
                <p className={clsx(style.apiResp, style.apiError)}>
                  {apiResponse.message}
                </p>
              )}
            </>
          )}
        </>
      )}
    </Modal>
  );
}
