import { getRequest, postRequest } from "utils/api";
import Logo from "assets/images/logo.svg";
import config from "config/config.js";

export async function makePayment({ plan, name, onSuccess, onError }) {
  try {
    const resultCreateOrder = await getRequest(`/payment/new/?plan=${plan}`, {
      removeTrailingSlash: true,
    });

    const { payment } = resultCreateOrder.data;

    const options = {
      key: config.razorpayKey,
      amount: payment.amount - payment.amount_paid,
      currency: payment.currency,
      image: Logo,
      order_id: payment.id,
      name,
      description: "Buy Plan",

      handler: (response) => {
        const data = {
          uid: response.uid,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };

        postRequest("/payment/handle_payment", data)
          .then((res) => {
            onSuccess();
          })
          .catch((err) => {
            console.log(err);
            onError();
          });
      },

      modal: {
        ondismiss: function () {
          onError();
        },
      },

      prefill: {
        name: name,
      },

      theme: {
        color: "#9456c8",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", (err) => {
      console.log(err);
    });
    paymentObject.open();
  } catch (err) {
    console.log(err);
    onError();
  }
}

export async function makePaymentLicenses({ body, name, onSuccess, onError, setIsLoading }) {
  try {
    const resultCreateOrder = await postRequest(`/vendors/payment/new`, body);
    const { payment } = resultCreateOrder.data;
    setIsLoading(false);

    const options = {
      key: config.razorpayKey,
      amount: payment.amount - payment.amount_paid,
      currency: payment.currency,
      image: Logo,
      order_id: payment.id,
      name,
      description: "Buy Licenses",

      handler: (response) => {
        const data = {
          uid: response.uid,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };

        setIsLoading(true);
        postRequest("/vendors/handle_payment", data)
          .then(() => {
            onSuccess();
          })
          .catch((err) => {
            console.log(err);
            onError();
          })
          .finally(() => {
            setIsLoading(false);
          });
      },

      modal: {
        ondismiss: function () {
          setIsLoading(false);
        },
      },

      prefill: {
        name: name,
      },

      theme: {
        color: "#9456c8",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", (err) => {
      console.log(err);
    });
    paymentObject.open();
  } catch (err) {
    console.log(err);
    onError();
  }
}
