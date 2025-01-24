import React from "react";
import style from "./Page404.module.scss";

import Img404 from "assets/images/404.svg";
import Navbar from "components/navbar/Navbar";
import Button from "components/shared/Button";

export default function Page404() {
  return (
    <div className={style.wrapper}>
      <Navbar />
      <img className={style.img404} src={Img404} alt="" />

      <section className={style.text}>
        <h3>Oooops! Page Not Found</h3>
        <div>
          <p>This page does not exist or was removed. We suggest you go back home</p>
        </div>
        <Button options={{ width: "200px" }}>Back To Home</Button>
      </section>
    </div>
  );
}
