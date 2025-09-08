
import { Link } from "react-router-dom";

const FooterWidget = ({ data }) => {
  return (
    <div className="footer-widget">
      <h4 className="widget-title mb-lg-6 mb-4 fw-semibold">{data?.title}</h4>
      <ul className="footer-menu d-grid gap-3">
        {data?.items?.map((item, index) => {
          const isExternal = item?.link?.startsWith("http"); // detect external link

          return (
            <li key={index} className="d-flex align-items-center gap-3">
              {/* Icon Rendering */}
              {item?.hasIcon && (
                <span className="tcp-1 fs-lg">
                  <i className={item?.icon}></i>
                </span>
              )}

              {/* Link or Text */}
              {item?.isLink ? (
                isExternal ? (
                  <a
                    href={item?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item?.title}
                  </a>
                ) : (
                  <Link to={item?.link}>{item?.title}</Link>
                )
              ) : (
                <span>{item?.title}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FooterWidget;
