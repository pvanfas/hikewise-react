import React, { useState, useEffect, createRef } from "react";
import style from "./Licenses.module.scss";

import { useSearchParams } from "react-router-dom";
import { Edit2 } from "react-feather";
import InlineLoader from "components/shared/InlineLoader";

import { getRequest, patchRequest } from "utils/api";
import { capitalizeWord } from "utils/helper";

import { format } from "date-fns"

export default function Licenses() {
  const [isLoading, setIsLoading] = useState({ count: false, table: 0 });
  const [licenses, setLicenses] = useState([]);
  const [editedNotes, setEditedNotes] = useState({});

  const [refs, setRefs] = useState([]);

  const [searchParams] = useSearchParams();
  const dept = searchParams.get("dept");

  function getLicenses() {
    setIsLoading((prev) => ({ ...prev, table: true }));

    let url = "";
    if (dept && dept.length) url = `/vendors/licences/?dept=${dept.toUpperCase()}`;
    else url = `/vendors/licences/`;

    getRequest(url, { removeTrailingSlash: dept && dept.length ? true : false })
      .then((resp) => {
        setLicenses(resp.data.map((item) => ({ ...item, isEditingNote: false })));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading((prev) => ({ ...prev, table: false }));
      });
  }

  function toggleNoteEdit(licensePk, index) {
    let toUpdate = [...licenses];
    toUpdate.forEach((item) => {
      if (item.pk === licensePk) {
        item.isEditingNote = !item.isEditingNote;
      }
    });
    setLicenses(toUpdate);

    refs[index].current.disabled = false;
    refs[index].current.focus();
  }

  function getDeptWord(word) {
    return word
      .split(" ")
      .map((item) => capitalizeWord(item))
      .join(" ");
  }

  function capitalise(str) {
    return str
      .split("_")
      .map((word) => capitalizeWord(word))
      .join(" ");
  }

  function changeNotes(licensePk, e) {
    const { value } = e.target;
    setEditedNotes((prev) => ({ ...prev, [licensePk]: value }));
  }

  function submitNotes(licensePk, e) {
    e.preventDefault();
    patchRequest(`/vendors/licences/${licensePk}`, { notes: editedNotes[licensePk] })
      .then((resp) => {
        getLicenses();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => { });
  }

  useEffect(() => {
    getLicenses();
  }, []);

  useEffect(() => {
    setRefs((elRefs) =>
      Array(licenses.length)
        .fill()
        .map((_, i) => elRefs[i] || createRef())
    );
  }, [licenses.length]);

  return (
    <div className={style.wrapper}>
      <div className={style.licensesWrapper}>
        <div className={style.header}> Licenses Created {dept && dept.length ? `(${capitalise(dept)})` : ``}</div>
        {isLoading.table ? (
          <div className={style.loaderWrapper}>
            <InlineLoader />
          </div>
        ) : (
          <div className={style.tableWrapper}>
            <table>
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Access Key</th>
                  <th>Access Secret</th>
                  <th>Last Login</th>
                  <th>Action</th>
                  <th>Notes</th>
                </tr>
              </thead>

              <tbody>
                {licenses.map((license, index) => (
                  <tr key={license.pk}>
                    <td>{getDeptWord(license.dept.toLowerCase())}</td>
                    <td>{license.access_key}</td>
                    <td>{license.access_secret}</td>
                    <td>{format(new Date(license.last_login), "dd MMM, hh:mm")}</td>
                    <td>
                      <button>Copy</button>
                    </td>
                    <td>
                      <span>
                        <form
                          onChange={changeNotes.bind(this, license.pk)}
                          onSubmit={submitNotes.bind(this, license.pk)}
                        >
                          <input
                            type="text"
                            placeholder={license.notes ? license.notes : "No Notes"}
                            ref={refs[index]}
                            disabled={true}
                          />
                        </form>

                        <span>
                          <Edit2 onClick={toggleNoteEdit.bind(this, license.pk, index)} size={15} />
                        </span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
