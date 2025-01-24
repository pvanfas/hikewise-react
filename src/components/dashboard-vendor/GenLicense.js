import React, { useEffect, useState } from "react";
import style from "./GenLicense.module.scss";

import { useNavigate } from "react-router-dom";

import { makePaymentLicenses } from "components/payment/Payment";
import InlineLoader from "components/shared/InlineLoader";

import DiscountImg from "assets/images/dashboard/vendor/discount.svg";
import { getRequest } from "utils/api";

const _ArrDept = ["Rise", "Sail", "Redesign", "Redesign Plus"];
const _ArrNames = ["rise_count", "sail_count", "redesign_count", "redesign_plus_count"];
const _ArrColors = ["#00D797", "#FEA9A9", "#B72323", "#229975"];

export default function GenLicense() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState();

  const [basePrice, setBasePrice] = useState(0);
  const [discountTable, setDiscountTable] = useState([]);

  const [formData, setFormData] = useState({
    rise_count: 0,
    sail_count: 0,
    redesign_count: 0,
    redesign_plus_count: 0,
  });

  const [currBill, setCurrBill] = useState({
    quantity: 0,
    totalBase: 0,
    discountPercent: 0,
    discounted: 0,
  });

  function getVendorProfile() {
    getRequest(`/vendors/profile`)
      .then((resp) => {
        setBasePrice(resp.data.base_price);
        setDiscountTable([
          ["5-9", resp.data.discount_for_5],
          ["10-19", resp.data.discount_for_10],
          ["20-49", resp.data.discount_for_20],
          ["50-99", resp.data.discount_for_50],
          ["100-499", resp.data.discount_for_100],
          ["500 & above", resp.data.discount_for_500],
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleGenerateLicenses() {
    setIsLoading(true);
    makePaymentLicenses({
      body: {
        ...formData,
      },
      name: "Buy Licenses",
      onSuccess: () => {
        setIsLoading(false);
        navigate("/dashboard/vendor/home");
      },
      onError: () => {
        alert("error");
        setIsLoading(false);
      },
      setIsLoading,
    });
  }

  function changeFormData(e) {
    let { name, value } = e.target;
    if (!value) value = 0;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function getDiscountPercent(quantity) {
    if ((quantity >= 5) & (quantity < 10)) return discountTable[0];
    if (quantity >= 10 && quantity < 20) return discountTable[1];
    if (quantity >= 20 && quantity < 50) return discountTable[2];
    if (quantity >= 50 && quantity < 100) return discountTable[3];
    if (quantity >= 100 && quantity < 500) return discountTable[4];
    if (quantity >= 500) return discountTable[5];
    else return ["Less than 5", 0];
  }

  useEffect(() => {
    const quantity = Object.entries(formData).reduce((accum, curr) => accum + parseInt(curr[1]), 0);
    const discountPercent = getDiscountPercent(quantity);

    if (discountPercent) {
      const totalBase = quantity * basePrice;
      const discounted = parseFloat(totalBase - (discountPercent[1] * totalBase) / 100);

      setCurrBill({ quantity, discountPercent, totalBase, discounted });
    }
  }, [formData]);

  useEffect(() => {
    getVendorProfile();
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.header}>Generate License</div>
      {isLoading ? (
        <div className={style.loaderWrapper}>
          <InlineLoader size={70} />
        </div>
      ) : (
        <div className={style.inner}>
          <form
            className={style.mainCard}
            onChange={changeFormData}
            onSubmit={handleGenerateLicenses}
          >
            <div className={style.depts}>
              <div className={style.row}>
                {_ArrDept.slice(0, 2).map((dept, index) => (
                  <div key={dept} className={style.dept}>
                    <span>{dept}</span>
                    <span>
                      <input
                        required
                        min={0}
                        max={1000}
                        name={_ArrNames[index]}
                        type="number"
                        style={{ color: _ArrColors[index] }}
                        value={formData[_ArrNames[index]]}
                      />
                    </span>
                  </div>
                ))}
              </div>
              <div className={style.row}>
                {_ArrDept.slice(2, 4).map((dept, index) => (
                  <div key={dept} className={style.dept}>
                    <span>{dept}</span>
                    <span>
                      <input
                        required
                        min={0}
                        max={1000}
                        name={_ArrNames[index + 2]}
                        type="number"
                        style={{ color: _ArrColors[index + 2] }}
                        value={formData[_ArrNames[index + 2]]}
                      />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className={style.footer}>
              <div className={style.left}>
                <div>
                  Total Amount <span>&#8377; {currBill.discounted}</span>
                </div>
                {currBill.discountPercent ? (
                  <>
                    <div>
                      {currBill.quantity} &times; {basePrice} = &#8377;
                      {parseFloat(currBill.quantity * basePrice)}
                    </div>
                    <div>
                      - &#8377;{(currBill.discountPercent[1] * currBill.totalBase) / 100} (
                      {currBill.discountPercent[1]}%)
                    </div>
                    <div>Total &#8377;{currBill.discounted} </div>
                  </>
                ) : null}
              </div>
              <button>Generate License</button>
            </div>
          </form>

          <div className={style.discountCard}>
            <div className={style.graphic}>
              <img src={DiscountImg} alt="graphic" />
            </div>
            <div className={style.amount}>&#8377; {basePrice}</div>

            <div className={style.discounts}>
              {discountTable.map((discount) => (
                <div key={discount} className={style.discount}>
                  <span className={style.licenseCount}>{discount[0]}</span>
                  <span className={style.discountPercent}>
                    {discount[1]}% <span>discount</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
