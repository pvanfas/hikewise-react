import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import AppRouter from "./AppRouter";
import ContextsWrapper from "./ContextsWrapper";
// import { LiveChatWidget } from "@livechat/widget-react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./OverWrite.scss";

import "swiper/swiper.min.css";
import "swiper/swiper-bundle.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import NewUserModal from "components/auth/NewUserModal";

async function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function App() {
  function handleNewEvent(event) {}

  async function loadRazorpay() {
    await loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }

  useEffect(() => {
    window.addEventListener("online", () => {
      toast.success("Hurray, You're back online", { icon: false });
    });

    // debugger;

    window.addEventListener("offline", () => {
      toast.error("Oops, You're offline", { icon: false });
    });
    loadRazorpay();
  }, []);

  return (
    <>
      {/* <LiveChatWidget license="ataUeCyfD6" visibility="maximized" onNewEvent={handleNewEvent} /> */}
      <BrowserRouter>
        <ContextsWrapper>
          {/* <NewUserModal /> */}
          <ToastContainer
            position="bottom-right"
            autoClose={2037}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
          />
          <AppRouter />
        </ContextsWrapper>
      </BrowserRouter>
    </>
  );
}

export default App;
