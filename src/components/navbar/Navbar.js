import React, { useState, useEffect } from "react";
import style from "./Navbar.module.scss";

import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import HamburgerMenu from "react-hamburger-menu";
import ClickAwayListener from "react-click-away-listener";
import { ChevronDown } from "react-feather";
import { RiWhatsappFill } from "react-icons/ri";

import WithPadding from "components/shared/WithPadding";
import LogoImg from "assets/images/logo.svg";

import { useUserContext } from "contexts/AllContexts";

function isTokenPresent() {
  return "accessToken" in localStorage || "accessToken" in sessionStorage;
}

const _NavLinks = [
  {
    name: "Students",
    link: "/",
    sublinks: [
      {
        name: "Class 8-9 Students",
        link: "/rise",
      },
      {
        name: "Class 10-12 Students",
        link: "/sail",
      },
      {
        name: "College Students-Graduates",
        link: "/redesign",
      },
    ],
  },
  {
    name: "Working Professionals",
    link: "/working-professionals",
  },
  {
    name: "Career Counsellors",
    link: "/",
    sublinks: [
      {
        name: "Certified Career Development Executive (CCDE)",
        link: "/ccde",
      },
      {
        name: "Hikewise Partner Program",
        link: "/partner-program",
      },
    ],
  },
  {
    name: "Institutions",
    link: "/institutions",
  },
  {
    name: "About Us",
    link: "/about",
  },
  {
    name: "Why Hikewise",

    sublinks: [
      {
        name: "Assessment",
        link: "/assessment",
      },
      {
        name: "Counselling",
        link: "/post-assessment",
      },
    ],
  },
];

export default function Navbar({ background }) {
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

  function handleClickAway(e) {
    if (e.target.id === "navLink" || e.target.id === "navLinkSvg" || e.path === undefined) return;
    if (!e.path) return;

    const hamWrapper = e.path.find((f) => f.id === "hamWrapper");
    if (hamWrapper) return;

    if (isHamOpen) setIsHamOpen(false);

    setNavLinks((prev) =>
      prev.map((item, ind) => {
        item.isOpen = false;
        return item;
      })
    );
  }

  function openSublinks(index) {
    let toUpdate = [...navLinks].map((item, ind) => ({
      ...item,
      isOpen: false,
    }));
    toUpdate[index].isOpen = true;

    setNavLinks(toUpdate);
  }

  function closeSubLinks(index) {
    let toUpdate = [...navLinks].map((item, ind) => ({
      ...item,
      isOpen: false,
    }));

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
    const { user_type } = UserContext.state.profile;

    if (user_type) {
      if (user_type === "VENDOR") navigate(`/dashboard/vendor`);
      else if (user_type === "CDE") navigate(`/dashboard/counsellor`);
      else navigate(`/dashboard/candidate`);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    resizeHandler();
  }, []);

  return (
    <WithPadding className={style.wrapper} style={{ background: background ? `${background}` : "transparent" }}>
      {!isMobile && (
        <div className={style.desktopWrapper}>
          <div className={style.logo} onClick={() => navigate("/")}>
            <img src={LogoImg} alt="logo" />
          </div>
          <nav className={style.links}>
            {navLinks.map((link, index) => (
              <div
                key={link.name}
                className={style.link}
                to={link.link}
                onMouseEnter={openSublinks.bind(this, index)}
                onMouseLeave={closeSubLinks.bind(this, index)}
              >
                <div className={style.top}>
                  {!link.sublinks ? (
                    <Link to={link.link} id="navLink">
                      {link.name}
                    </Link>
                  ) : (
                    <span id="navLink">{link.name}</span>
                  )}

                  <span>{link.sublinks && <ChevronDown id="navLinkSvg" size={15} />}</span>
                </div>
                {link.sublinks && (
                  <div className={clsx(style.bottom, link.isOpen && style.open)}>
                    {link.sublinks.map((sublink) => (
                      <ClickAwayListener key={sublink.name} onClickAway={handleClickAway}>
                        <Link className={style.sublink} to={sublink.link}>
                          {sublink.name}
                        </Link>
                      </ClickAwayListener>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          {isLoggedIn() ? (
            <div className={style.buttonDashboard}>
              <button onClick={handleClickDashboard} options={{ width: "100px" }}>
                Visit Dashboard
              </button>
            </div>
          ) : (
            <>
              <div className={style.buttons}>
                <button onClick={() => navigate("/auth/register")}>Get Started</button>
                <button onClick={() => navigate("/auth/login")}>Login</button>
              </div>
            </>
          )}
        </div>
      )}

      {isMobile && (
        <div className={style.mobileWrapper}>
          <div className={style.logo} onClick={() => navigate("/")}>
            <img src={LogoImg} alt="logo" />
          </div>
          <div id="hamWrapper" className={clsx(style.hamWrapper)}>
            <span onClick={() => window.open("https://wa.me/+7593929394")}>
              <RiWhatsappFill size={30} />
            </span>
            <HamburgerMenu
              id="hamWrapper"
              isOpen={isHamOpen}
              menuClicked={handleHamClick}
              width={25}
              height={15}
              color="#9456c8"
            />
          </div>
          <div className={clsx(style.links, isHamOpen && style.open)}>
            <>
              {navLinks.map((link, index) => (
                <div key={link.name} className={style.link} to={link.link} onClick={openSublinks.bind(this, index)}>
                  <div className={style.top}>
                    {!link.sublinks ? (
                      <Link to={link.link} id="navLink">
                        {link.name}
                      </Link>
                    ) : (
                      <span id="navLink">{link.name}</span>
                    )}
                  </div>
                  {link.sublinks && (
                    <div className={clsx(style.sublinks, link.isOpen && style.open)}>
                      {link.sublinks.map((sublink) => (
                        <ClickAwayListener key={sublink.name} onClickAway={handleClickAway}>
                          <Link className={style.sublink} to={sublink.link}>
                            {sublink.name}
                          </Link>
                        </ClickAwayListener>
                      ))}
                    </div>
                  )}
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
