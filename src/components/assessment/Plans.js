import React, { useState, useEffect } from "react";
import style from "./Plans.module.scss";

import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import { CheckCircle } from "react-feather";
import clsx from "clsx";

import OvalImg from "assets/images/landing/purple-oval.svg";

import { getRequest } from "utils/api";
import { makePayment } from "components/payment/Payment";

import Navbar from "components/navbar/Navbar";
import InlineLoader from "components/shared/InlineLoader";

export default function Plans() {
  const navigate = useNavigate();

  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function getPaymentPlans() {
    setIsLoading(true);
    getRequest(`/payment/myplans?department=REDESIGN`)
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
    makePayment({
      plan: plan.code,
      name: "Some Name",
      onSuccess: () => {
        setIsLoading(false);
        navigate("/dashboard/candidate/sessions");
      },
      onError: () => {
        alert("error");
      },
    });
    setIsLoading(true);
  }

  useEffect(() => {
    getPaymentPlans();
  }, []);

  return (
    <div className={style.wrapper}>
      <Navbar background="white" />
      <div className={style.ovalImg}>
        <img src={OvalImg} alt="" />
      </div>
      <div className={style.innerWrapper}>
        <div className={style.frameBorder}>
          <div className={clsx(style.frame, style.top)}></div>
          <div className={clsx(style.frame, style.right)}></div>
          <div className={clsx(style.frame, style.bottom)}></div>
          <div className={clsx(style.frame, style.left)}></div>
        </div>

        <div className={style.content}>
          {isLoading && <div className={style.loaderWrapper}>{<InlineLoader size={100} />}</div>}

          {!isLoading && (
            <>
              <div className={style.header}>
                <div className={style.title}>You've done a great JOB </div>
                <div className={style.text}>
                  <div className={style.sampleText}>View Sample Report</div>
                </div>
                {/* <div className={style.buttons}>
              <button>Students</button>
              <button>School</button>
            </div> */}
              </div>
              <div className={style.cards}>
                {plans.map((plan) => (
                  <div className={clsx(style.card, plan.isActive ? style.active : style.inActive)} key={plan.title}>
                    <div className={style.title}>{parse(plan.title)}</div>
                    <div className={style.pricing}>
                      <span className={style.currency}>&#8377;</span>
                      <span className={style.price}>{plan.amount}</span>
                    </div>
                    <div className={style.features}>
                      {
                        <ul className={style.features}>
                          {plan.description.map((desc) => (
                            <li>
                              <CheckCircle /> {desc}
                            </li>
                          ))}
                        </ul>
                      }
                    </div>

                    <button onClick={handleClickContinue.bind(this, plan)} className={plan.isActive && style.active}>
                      Continue
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
