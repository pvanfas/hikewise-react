import React, { useState, useEffect } from "react";
import style from "./Plans.module.scss";

import clsx from "clsx";

import { getRequest } from "utils/api";
import { makePayment } from "components/payment/Payment";
import InlineLoader from "components/shared/InlineLoader";

import { useUserContext } from "contexts/AllContexts";
import PlanCard from "components/shared/PlanCard";

export default function Plans() {
  const userContext = useUserContext();

  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function getPaymentPlans() {
    setIsLoading(true);
    getRequest(`/payment/myplans/?department=${userContext.state.profile.department}`)
      .then((resp) => {
        setPlans(resp.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleClickContinue(plan) {
    setIsLoading(true);
    makePayment({
      plan: plan.code,
      name: "Hikewise",
      onSuccess: () => {
        window.location.href = "/dashboard/candidate/home";
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
      },
    });
  }

  useEffect(() => {
    if (userContext.state.profile.department) getPaymentPlans();
  }, [userContext]);

  return (
    <div className={style.wrapper}>
      <div className={style.title}>Available Plans</div>
      {isLoading && (
        <div className={style.loaderWrapper}>
          <InlineLoader size={90} />
        </div>
      )}

      {!isLoading && (
        <div className={style.cards}>
          {plans.map((plan) => (
            <PlanCard
              className={clsx(style.card, plan.isActive ? style.active : style.inActive)}
              plan={plan}
              handleClickContinue={handleClickContinue}
            />
          ))}
        </div>
      )}
    </div>
  );
}
