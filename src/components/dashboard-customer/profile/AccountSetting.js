import React, { useState, useEffect } from "react";
import style from "./AccountSetting.module.scss";

import { Formik } from "formik";
import * as yup from "yup";

import TextField from "components/shared/formik/TextField";
import Button from "components/shared/Button";
import InlineLoader from "components/shared/InlineLoader";

import { useUserContext } from "contexts/AllContexts";
import { putRequest } from "utils/api";

export default function AccountSetting() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    pref_language: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const userContext = useUserContext();

  const [isEdit, setIsEdit] = useState(false);

  function toggleIsEdit() {
    setIsEdit((prev) => !prev);
  }

  function changeFormData(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function submitForm() {
    const { first_name, last_name, email } = formData;
    const postData = { first_name, last_name, email };

    setIsLoading(true);
    setShowSuccess(false);

    putRequest(`/accounts/update_profile`, postData)
      .then(() => {
        setShowSuccess(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function setInitialFormData() {
    const { profile } = userContext.state;
    setFormData({
      first_name: profile.first_name,
      last_name: profile.last_name,
      email: profile.email,
      pref_language: profile.pref_language,
    });
  }

  const validationSchema = yup.object().shape({
    first_name: yup.string().required("* Required"),
    last_name: yup.string().required("* Required"),
    email: yup.string().email("Must be a valid email").max(255).required("* Required"),
    pref_language: yup.string().required("* Required"),
  });

  useEffect(() => {
    if (userContext.state && userContext.state.profile) setInitialFormData();
  }, [userContext.state]);

  return (
    <div className={style.wrapper}>
      {formData.first_name ? (
        <Formik initialValues={formData} validationSchema={validationSchema} onSubmit={submitForm}>
          {({ handleSubmit }) => (
            <form onChange={changeFormData} onSubmit={handleSubmit}>
              <div className={style.field}>
                <label>First Name</label>
                <TextField
                  className={style.textField}
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  placeholder="First Name"
                  disabled={!isEdit}
                />
              </div>

              <div className={style.field}>
                <label>Second name</label>
                <TextField
                  className={style.textField}
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  placeholder="Last Name"
                  disabled={!isEdit}
                />
              </div>

              <div className={style.col}>
                <div className={style.field}>
                  <label>Email</label>
                  <TextField
                    className={style.textField}
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled={!isEdit}
                  />
                </div>
                {/* 
                  <div className={style.field}>
                    <label>Language</label>
                    <TextField
                      className={style.textField}
                      type="text"
                      name="pref_language"
                      value={formData.pref_language}
                    />
                  </div> */}
              </div>

              {showSuccess && <div className={style.success}>Details updated successfully</div>}
              <div className={style.btnContainer}>
                {isEdit && (
                  <Button submit disabled={isLoading} options={{ width: "100px", height: "35px" }}>
                    {isLoading ? <InlineLoader size={20} color="white" /> : "Submit"}
                  </Button>
                )}
                {!isEdit && (
                  <button className={style.editBtn} onClick={toggleIsEdit}>
                    Edit
                  </button>
                )}
              </div>
            </form>
          )}
        </Formik>
      ) : (
        <div className={style.loaderWrapper}>
          <InlineLoader />
        </div>
      )}
    </div>
  );
}
