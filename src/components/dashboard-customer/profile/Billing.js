import React, { useState, useEffect } from "react";
import style from "./Billing.module.scss";

import moment from "moment";
import HTMLReactParser from "html-react-parser";

import InlineLoader from "components/shared/InlineLoader";
import { getRequest } from "utils/api";

export default function Billing() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function getOrders() {
    setIsLoading(true);
    getRequest("/payment/orders")
      .then((resp) => {
        setOrders(resp.data.filter((item) => item.is_paid));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className={style.wrapper}>
      {/* <div className={style.title}>Billing History</div> */}

      {!orders.length && !isLoading && <div className={style.nothingText}>There are no orders</div>}

      {isLoading && (
        <div className={style.loaderWrapper}>
          <InlineLoader size={50} />
        </div>
      )}

      {!isLoading && orders.length ? (
        <div className={style.tableWrapper}>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Plan</th>
                <th>Amount</th>
              </tr>
            </thead>
            {orders.map((order) => (
              <tr>
                <td>{moment(order.created).format("DD MMMM YYYY")}</td>

                <td>{HTMLReactParser(order.plan)}</td>
                <td> &#8377; {order.amount}</td>
              </tr>
            ))}
          </table>
        </div>
      ) : null}
    </div>
  );
}
