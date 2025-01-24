import React from "react";

import { SidebarContextProvider } from "contexts/SidebarContext";
import { AppContextProvider } from "contexts/AppContext";
import { UserContextProvider } from "contexts/UserContext";

export default function ContextsWrapper({ children }) {
  return (
    <AppContextProvider>
      <UserContextProvider>
        <SidebarContextProvider>{children}</SidebarContextProvider>
      </UserContextProvider>
    </AppContextProvider>
  );
}
