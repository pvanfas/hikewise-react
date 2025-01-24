import React, { useState, useEffect } from "react";
import style from "./Navbar.module.scss";

import { Link, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import clsx from "clsx";
import HamburgerMenu from "react-hamburger-menu";
// import ClickAwayListener from "react-click-away-listener";
// import { ChevronDown } from "react-feather";

import WithPadding from "components/shared/WithPadding";
import LogoImg from "assets/images/logo.svg";

import { useUserContext } from "contexts/AllContexts";

function isTokenPresent() {
  return "accessToken" in localStorage || "accessToken" in sessionStorage;
}

const _NavLinks = [
  {
    name: "Home",
    hash: "/",
  },
  {
    name: "Problem",
    hash: "problem",
  },

  {
    name: "How it works",
    hash: "how_it_works",
  },
  {
    name: "Why Hikewise",
    hash: "why_hikewise",
  },
];

export default function NavbarInstitutions({ background }) {
  const navigate = useNavigate();
  const UserContext = useUserContext();

  const [isMobile, setIsMobile] = useState(false);
  const [isHamOpen, setIsHamOpen] = useState(false);

  function isLoggedIn() {
    if (isTokenPresent()) return true;
    else return false;
  }

  function handleClickButton(route) {
    handleHamClick();
    navigate(route);
  }

  const [navLinks, setNavLinks] = useState(
    _NavLinks.map((link) => ({
      ...link,
      isOpen: false,
    }))
  );

  // function handleClickAway(e) {
  //   if (e.target.id === "navLink" || e.target.id === "navLinkSvg") return;

  //   setNavLinks((prev) =>
  //     prev.map((item, ind) => {
  //       item.isOpen = false;
  //       return item;
  //     })
  //   );
  // }

  function openSublinks(index) {
    let toUpdate = [...navLinks].map((item, ind) => ({
      ...item,
      isOpen: ind === index ? item.isOpen : false,
    }));
    toUpdate[index].isOpen = !toUpdate[index].isOpen;

    setNavLinks(toUpdate);
  }

  function handleHamClick() {
    setIsHamOpen(!isHamOpen);
  }

  function resizeHandler() {
    if (window.innerWidth < 1400) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }

  function handleClickDashboard() {
    window.open("https://forms.gle/swTnyThjX6NegdgJ6");
  }

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    resizeHandler();
  }, []);

  const BASE_LINK = `/institutions`;

  return (
    <WithPadding className={style.wrapper} style={{ background: background ? `${background}` : "transparent" }}>
      {!isMobile && (
        <div className={style.desktopWrapper}>
          <div className={style.logo} onClick={() => navigate("/")}>
            <img src={LogoImg} alt="logo" />
          </div>
          <nav className={style.links}>
            {navLinks.map((link, index) => (
              <div key={link.name} className={style.link} to={link.link} onClick={openSublinks.bind(this, index)}>
                <div className={style.top}>
                  {link.name !== "Home" && (
                    <HashLink smooth to={`${BASE_LINK}#${link.hash}`} id="navLink">
                      {link.name}
                    </HashLink>
                  )}
                  {link.name === "Home" && <Link to="/">Home</Link>}
                </div>
              </div>
            ))}
          </nav>

          <div className={style.buttonDashboard}>
            <button onClick={handleClickDashboard} options={{ width: "100px" }}>
              Contact Us
            </button>
          </div>
        </div>
      )}

      {isMobile && (
        <div className={style.mobileWrapper}>
          <div className={style.logo} onClick={() => navigate("/")}>
            <img src={LogoImg} alt="logo" />
          </div>
          <div className={clsx(style.hamWrapper)}>
            <HamburgerMenu isOpen={isHamOpen} menuClicked={handleHamClick} width={25} height={15} color="#9456c8" />
          </div>
          <div className={clsx(style.links, isHamOpen && style.open)}>
            <>
              {navLinks.map((link, index) => (
                <div className={style.link}>
                  <HashLink
                    scroll={(el) => {
                      el.scrollIntoView({ behavior: "smooth", block: "end" });
                      setIsHamOpen(false);
                    }}
                    className={style.link}
                    smooth
                    to={`${BASE_LINK}#${link.hash}`}
                    id="navLink"
                  >
                    {link.name}
                  </HashLink>
                </div>
              ))}
              {isLoggedIn() ? (
                <div className={style.buttonDashboard}>
                  <button onClick={handleClickDashboard} options={{ width: "100px" }}>
                    Visit Dashboard
                  </button>
                </div>
              ) : (
                <div className={style.buttons}>
                  <button onClick={() => handleClickButton("/auth/register")}>Get Started</button>
                  <button onClick={() => handleClickButton("/auth/login")}>Login</button>
                </div>
              )}
            </>
          </div>
        </div>
      )}
    </WithPadding>
  );
}
