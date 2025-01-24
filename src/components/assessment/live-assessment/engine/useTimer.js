import { useEffect } from "react";

let timer = null;

export default function useTimer({ dispatch }) {
  function startSubcatTimer() {
    const interval = 1000;
    timer = window.setInterval(() => {
      dispatch({ type: "DEC_SUBCAT_COUNTDOWN" });
    }, interval);
  }

  function stopSubcatTimer() {
    window.clearInterval(timer);
    timer = null;
  }

  useEffect(() => {
    return () => stopSubcatTimer();
  }, []);

  return { startSubcatTimer, stopSubcatTimer };
}
