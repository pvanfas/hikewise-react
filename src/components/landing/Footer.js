import React from "react";
import style from "./Footer.module.scss";

import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import clsx from "clsx";

import Button from "components/shared/Button";
import WithPadding from "components/shared/WithPadding";

import LogoImg from "assets/images/logo.svg";

import FacebookImg from "assets/images/landing/facebook.png";
import TwitterImg from "assets/images/landing/twitter.png";
import YoutubeImg from "assets/images/landing/youtube.png";
import InstaImg from "assets/images/landing/instagram.png";

const images = [
  { img: FacebookImg, link: "https://www.facebook.com/hikewise/" },
  { img: TwitterImg, link: "https://twitter.com/lcat_official" },
  { img: YoutubeImg, link: "https://twitter.com/lcat_official" },
  { img: InstaImg, link: "https://twitter.com/lcat_official" },
];

export default function Footer() {
  const navigate = useNavigate();

  function handleClickDemo() {
    navigate(`/assessment/demo`);
  }

  return (
    <WithPadding className={style.wrapper}>
      <div className={style.header}>
        <div className={style.left}>
          <div className={style.text}>
            <div>Got career-related doubts?</div>
            <div>Talk to our experts!</div>
          </div>
          <Button onClick={handleClickDemo} options={{ width: "150px", height: "40px" }}>
            Take Free Demo
          </Button>
        </div>
        <div className={style.right}>
          <div className={clsx(style.text, style.textGray)}>
            <div>Stay Connected</div>
            <div>Stay updated with latest career trends and insights.</div>
          </div>
          <div className={style.socialHandles}>
            {images.map((image) => (
              <a href={image.link}>
                <img src={image.img} alt="" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={style.main}>
        <div className={clsx(style.logo, style.col)}>
          <div className={style.image}>
            <img src={LogoImg} alt="" />
          </div>
          <div>© 2022 Hikewise | vLEAD </div>
          <div>Management</div>
          <div>Consultancy Private Limited</div>
        </div>
        <div className={style.linksWrapper}>
          <div className={clsx(style.linksOne, style.col, style.links)}>
            <Link className={style.link} to="/">
              About Us
            </Link>
            <Link className={style.link} to="/">
              Hikewise for Schools
            </Link>
            <Link className={style.link} to="/">
              Hikewise for Counsellors
            </Link>
            <Link className={style.link} to="/">
              Success Stories
            </Link>
            <Link className={style.link} to="/">
              Career Library
            </Link>
          </div>
          <div className={clsx(style.linksTwo, style.col, style.links)}>
            <Link className={style.link} to="/">
              Terms and Conditions
            </Link>
            <Link className={style.link} to="/">
              Privacy Policy
            </Link>
            <Link className={style.link} to="/">
              Disclaimer
            </Link>
            <Link className={style.link} to="/">
              Contact Us
            </Link>
          </div>
          <div className={clsx(style.linksThree, style.col, style.address)}>
            <div className={style.line}>Empora Views, Malaparamba Jn,</div>
            <div className={style.line}>Kozhikode, Kerala - 673017</div>
            <div className={style.line}>hello@hikewise.com</div>
            <div className={style.line}>+91 7593929394</div>
          </div>
        </div>
      </div>
    </WithPadding>
  );
}
