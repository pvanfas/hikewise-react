import React from "react";
import style from "./TestScreen.module.scss";

import ClipLoader from "react-spinners/ClipLoader";

import TestCard from "components/assessment/shared/TestCard";
import DemoTest from "./DemoTest";

import { useEngine } from "./engine/EngineProvider";
import Navbar from "components/navbar/Navbar";

export default function TestScreen() {
  const { state } = useEngine();

  return (
    <div className={style.wrapper}>
      <Navbar background="white" />

      {state.screenState.isLoading && (
        <div className={style.loaderWrapper}>
          <ClipLoader color={"#9456c8"} loading={true} size={150} />
        </div>
      )}

      <TestCard title="Demo Test" className={style.cardContainer}>
        <DemoTest />
      </TestCard>
    </div>
  );
}
