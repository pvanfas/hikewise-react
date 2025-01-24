import moment from "moment";
import React, { useEffect, useState } from "react";
import { getRequest } from "utils/api";
import style from "./Orders.module.scss";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  function getOrders() {
    getRequest(`/vendors/orders`)
      .then((resp) => {
        setOrders(
          resp.data.map((item) => ({
            ...item,
            totalCount:
              parseInt(item.redesign_count) +
              parseInt(item.redesign_plus_count) +
              parseInt(item.rise_count) +
              parseInt(item.sail_count),
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.header}>Orders</div>
      <div className={style.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>Payment Id</th>
              <th>Date</th>
              <th>No. of Licenses</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={order.pid}>
                <td>{order.id}</td>
                <td>{moment(order.created).format("DD/MM/YY")}</td>
                <td>{order.totalCount}</td>
                <td>&#8377; {order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
