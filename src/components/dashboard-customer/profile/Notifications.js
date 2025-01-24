import React, { useState, useEffect } from "react";
import style from "./Notifications.module.scss";

import { getRequest } from "utils/api";
import InlineLoader from "components/shared/InlineLoader";

export default function Notifications() {
  const [notifs, setNotifs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function getNotifications() {
    setIsLoading(true);
    getRequest("/notifications")
      .then((resp) => {
        setNotifs(resp.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <div className={style.wrapper}>
      {isLoading && (
        <div className={style.loaderWrapper}>
          <InlineLoader size={80} />
        </div>
      )}

      {!isLoading && (
        <>
          {notifs.map((notif) => (
            <div className={style.notifItem}>
              <div className={style.icon}>
                <div className={style.image}></div>
              </div>
              <div className={style.content}>
                <div className={style.title}> {notif.title}</div>
                <div className={style.body}>{notif.body}</div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
