/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";

const NavMenu = ({ data }) => {
  const { pathname } = useLocation();

  

  return (
    <div className="nav-menu-wrapper w-100 justify-content-lg-center">
      {/* Desktop Menu */}
      <ul className="nav-menu d-lg-flex gap-xl-4 gap-3 d-none">
        {data?.map((item) => {
          const isExternal = item?.link.startsWith("http"); // detect external links
          return (
            <li className="menu-item" key={item?.id}>
              {isExternal ? (
                <a
                  className="menu-link"
                  href={item?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item?.title}
                </a>
              ) : (
                <Link
                  className={`menu-link ${pathname === item?.link ? "text-success" : ""}`}
                  to={item?.link}
                >
                  {item?.title}
                </Link>
              )}
            </li>
          );
        })}
      </ul>

      {/* Mobile Menu */}
      <ul className="nav-menu gap-xl-4 gap-3 d-lg-none">
       {data?.map((item) => {
          const isExternal = item?.link.startsWith("http");
          return (
            <li className="menu-item" key={item?.id}>
              {isExternal ? (
                <a
                  className="menu-link"
                  href={item?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item?.title}
                </a>
              ) : (
                <Link
                  className={`menu-link ${pathname === item?.link ? "active" : ""}`}
                  to={item?.link}
                >
                  {item?.title}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NavMenu;
