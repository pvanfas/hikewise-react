import React, { useState, useEffect } from "react";
import style from "./Home.module.scss";

import { useNavigate } from "react-router-dom";

import InlineLoader from "components/shared/InlineLoader";
import { getRequest, multiGetRequest } from "utils/api";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { format } from "date-fns";

const _ARR_CARDS = [
  { title: "Rise", color: "#00D797" },
  {
    title: "Sail",
    color: "#FFBABA",
  },
  { title: "Redesign", color: "#B72323" },
  { title: "Redesign Plus", color: "#229975" },
];

export default function Home() {
  const [licenses, setLicenses] = useState([]);
  const [licenseCount, setLicenseCount] = useState({ rise: 0, sail: 0, redesign: 0, redesign_plus: 0 });

  const [isLoading, setIsLoading] = useState({ count: false, table: 0 });

  const navigate = useNavigate();

  function getLicenses() {
    setIsLoading((prev) => ({ ...prev, table: true }));

    getRequest(`/vendors/licences`)
      .then((resp) => {
        setLicenses(resp.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading((prev) => ({ ...prev, table: false }));
      });
  }

  function getAllIndividualLicenses() {
    const arrUrls = ["RISE", "SAIL", "REDESIGN", "REDESIGN_PLUS"].map((dept) => `/vendors/licences/?dept=${dept}`);

    setIsLoading((prev) => ({ ...prev, count: true }));
    multiGetRequest(arrUrls, { removeTrailingSlash: true })
      .then((resp) => {
        setLicenseCount({
          Sail: resp[1].data.length,
          Rise: resp[0].data.length,
          Redesign: resp[2].data.length,
          "Redesign Plus": resp[3].data.length,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading((prev) => ({ ...prev, count: false }));
      });
  }

  function getDeptWord(word) {
    return word
      .split(" ")
      .map((item) => capitalise(item))
      .join(" ");
  }

  function capitalise(word) {
    if (!word) return "";
    let newWord = "";
    newWord += word.charAt(0).toUpperCase();
    for (let i = 1; i < word.length; i++) {
      newWord += word.charAt(i).toLowerCase();
    }

    return newWord;
  }

  function handleClickView(dept) {
    dept = dept.split(" ").join("_");
    navigate(`/dashboard/vendor/licenses?dept=${dept.toLowerCase()}`);
  }

  function navigateToCandidate(accessKey) {
    window.open(`/dashboard/vendor/candidate/${accessKey}`);
  }

  useEffect(() => {
    getLicenses();
    getAllIndividualLicenses();
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.cards}>
        {isLoading.count ? (
          <div className={style.loaderWrapper}>
            <InlineLoader />
          </div>
        ) : (
          <>
            {_ARR_CARDS.map((card) => (
              <div className={style.licenseCard}>
                <div className={style.title}>{card.title}</div>
                <div className={style.body}>
                  <div className={style.left} style={{ color: card.color }}>
                    {licenseCount[card.title]}
                  </div>
                  <div className={style.right}>
                    <button onClick={handleClickView.bind(this, card.title)}>View</button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <div className={style.licensesWrapper}>
        <div className={style.header}>Recent Licenses</div>
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
                </tr>
              </thead>

              <tbody>
                {licenses.map((license) => (
                  <tr>
                    <td>{getDeptWord(license.dept)}</td>
                    <td>{license.access_key}</td>
                    <td>{license.access_secret}</td>
                    <td>{format(new Date(license.last_login), "dd MMM, hh:mm")}</td>
                    <td>
                      <button onClick={navigateToCandidate.bind(this, license.access_key)}>View</button>
                      <CopyToClipboard
                        text={`Access Key : ${license.access_key}  Access Secret : ${license.access_secret}`}
                      >
                        <button>Copy</button>
                      </CopyToClipboard>
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
