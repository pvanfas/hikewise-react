import React from "react";

import TestScreen from "./TestScreen";
import { EngineProvider } from "./engine/EngineProvider";

export default function Container() {
  return (
    <EngineProvider>
      <TestScreen />
    </EngineProvider>
  );
}
