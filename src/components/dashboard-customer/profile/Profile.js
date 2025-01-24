import React, { useEffect, useState } from "react";
import style from "./Profile.module.scss";

import { Edit2 } from "react-feather";
import ImageUploading from "react-images-uploading";
import clsx from "clsx";

import { useUserContext } from "contexts/UserContext";

import AccountSetting from "./AccountSetting";
import Privacy from "./Privacy";
import Notifications from "./Notifications";
import Billing from "./Billing";
import { putRequest } from "utils/api";
import InlineLoader from "components/shared/InlineLoader";

export default function Profile() {
  const UserContext = useUserContext();
  const profile = UserContext.state.profile;

  const [imgUploadLoading, setImgUploadLoading] = useState();

  const _Tabs = [
    { name: "Account Setting", isOpen: true },
    { name: "Privacy", isOpen: false },
    { name: "Plans", isOpen: false },
    { name: "Notifications", isOpen: false },
  ];

  const [tabs, setTabs] = useState(_Tabs);
  const [active, setActive] = useState({});

  const onChange = (imageList, addUpdateIndex) => {
    setImgUploadLoading(true);
    let image = imageList[0].file;
    let formData = new FormData();
    formData.append("photo", image);

    putRequest(`/accounts/update_photo`, formData)
      .then(() => {
        UserContext.getProfile();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setImgUploadLoading(false);
      });
  };

  function handleClickTab(index) {
    setTabs((prev) => {
      let toUpdate = [...prev];
      toUpdate.forEach((tab) => (tab.isOpen = false));
      toUpdate[index].isOpen = true;
      return toUpdate;
    });
  }

  function renderSection() {
    switch (active.name) {
      case "Account Setting":
        return <AccountSetting />;
      case "Privacy":
        return <Privacy />;
      case "Notifications":
        return <Notifications />;
      case "Plans":
        return <Billing />;
      default:
        return null;
    }
  }

  function getDeptName(dept) {
    let arrWords = dept.split("_");
    arrWords = arrWords.map((word) => capitalise(word));
    return arrWords.join(" ");
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

  const languages = {
    AS: "Assamese",
    BN: "Bengali",
    EN: "English",
    GU: "Gujarati",
    HI: "Hindi",
    KN: "Kannada",
    ML: "Malayalam",
    MR: "Marathi",
    OD: "Odia",
    PA: "Punjabi",
    TA: "Tamil",
    TE: "Telugu",
    UR: "Urdu",
  };

  useEffect(() => {
    const activeFound = tabs.find((f) => f.isOpen === true);
    setActive(activeFound);
  }, [tabs]);

  return (
    <div className={style.wrapper}>
      <div className={style.banner}></div>
      <div className={style.main}>
        <div className={style.left}>
          <div className={style.header}>
            <div
              className={clsx(style.image, imgUploadLoading && style.border)}
            >
              {imgUploadLoading ? (
                <InlineLoader />
              ) : (
                <img src={` ${profile.photo}`} alt="profile" />
              )}

              {!imgUploadLoading && (
                <ImageUploading onChange={onChange} dataURLKey="data_url">
                  {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                  }) => (
                    <div onClick={onImageUpload} className={style.editIcon}>
                      <Edit2 size={13} />
                    </div>
                  )}
                </ImageUploading>
              )}
            </div>
            <div className={style.name}>
              {profile.first_name} {profile.last_name}
            </div>
          </div>
          {profile.department && (
            <div className={style.body}>
              {[
                { name: "Email Id", value: profile.email },
                { name: "Category:", value: getDeptName(profile.department) },
                { name: "Language:", value: languages[profile.pref_language] },
              ].map((item) => (
                <div className={style.field} key={item.name}>
                  <div>{item.name}</div>
                  <div>{item.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={style.right}>
          <div className={style.tabs}>
            {tabs.map((tab, index) => (
              <div
                className={clsx(style.tab, tab.isOpen && style.open)}
                onClick={handleClickTab.bind(this, index)}
                key={tab.name}
              >
                {tab.name}
              </div>
            ))}
          </div>
          <div className={style.section}>{renderSection()}</div>
        </div>
      </div>
    </div>
  );
}
