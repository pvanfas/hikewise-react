import { useEffect, useState } from "react";
import style from "./Gif.module.scss";

import { useEngine } from "./engine/EngineProvider";
import WvpImg from "assets/images/assessment/wvp_gif_desktop.gif";
import WvpImgMob from "assets/images/assessment/wvp_gif_mob.gif";

export default function Gif({ question }) {
  const [src, setSrc] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const { navigateNext } = useEngine();

  function handleResize() {
    if (window.innerWidth < 750) setIsMobile(true);
    else setIsMobile(false);
  }

  function getSrc() {
    if (question.tabKey === "wvp") {
      if (isMobile) return WvpImgMob;
      else return WvpImg;
    }
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={style.wrapper}>
      <img style={{ width: "100%", height: "auto" }} alt="info-gif" src={getSrc()} />
      <footer>
        <button onClick={navigateNext}>Next</button>
      </footer>
    </div>
  );
}
