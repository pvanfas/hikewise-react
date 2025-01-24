import React, { useState } from "react";
import style from "./AccountSetting.module.scss";

import { Formik } from "formik";
import * as yup from "yup";

import TextField from "components/shared/formik/TextField";
import Button from "components/shared/Button";
import InlineLoader from "components/shared/InlineLoader";

import { putRequest } from "utils/api";

export default function AccountSetting() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ old_password: "", password: "", password2: "" });

  const [errors, setErrors] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  function toggleIsEdit() {
    setIsEdit((prev) => !prev);
  }

  function changeFormData(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function submitForm() {
    setIsLoading(true);
    setErrors([]);
    setShowSuccess(false);
    putRequest(`/accounts/update_password`, formData)
      .then(() => {
        setFormData({ old_password: "", password: "", password2: "" });
        setShowSuccess(true);
      })
      .catch((err) => {
        const errResp = err.response;
        if (errResp.status === 400) {
          if (errResp.data.old_password) {
            setErrors((prev) => [...prev, errResp.data.old_password.old_password]);
          }
          if (errResp.data.password) {
            setErrors((prev) => [...prev, ...errResp.data.password]);
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const validationSchema = yup.object().shape({
    old_password: yup.string().required("* Required"),
    password: yup.string().min(8).required("* Required"),
    password2: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("* Required"),
  });

  return (
    <div className={style.wrapper}>
      {!isLoading ? (
        <Formik initialValues={formData} validationSchema={validationSchema} onSubmit={submitForm}>
          {({ handleSubmit }) => (
            <form onChange={changeFormData} onSubmit={handleSubmit}>
              <div className={style.row}>
                <div className={style.col}>
                  <div className={style.field}>
                    <label>Old Password</label>
                    <TextField
                      className={style.textField}
                      type="password"
                      name="old_password"
                      placeholder="Old Password"
                      value={formData.old_password}
                      disabled={!isEdit}
                    />
                  </div>
                </div>
              </div>

              <div className={style.row}>
                <div className={style.col}>
                  <div className={style.field}>
                    <label>New Password</label>
                    <TextField
                      className={style.textField}
                      type="password"
                      name="password"
                      placeholder="New Password"
                      value={formData.password}
                      disabled={!isEdit}
                    />
                  </div>

                  <div className={style.field}>
                    <label>Confirm Password</label>
                    <TextField
                      className={style.textField}
                      type="password"
                      name="password2"
                      placeholder="Confirm Password"
                      value={formData.password2}
                      disabled={!isEdit}
                    />
                  </div>
                </div>
              </div>

              {showSuccess && <div className={style.success}>Password updated successfully</div>}
              {errors.map((error) => (
                <div className={style.error}>{error}</div>
              ))}

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
