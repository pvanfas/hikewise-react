import React from "react";

import { EngineProvider } from "./engine/EngineProvider";
import TestScreen from "./TestScreen";

export default function Container({ type }) {
  return (
    <EngineProvider>
      <TestScreen type={type} />
    </EngineProvider>
  );
}
