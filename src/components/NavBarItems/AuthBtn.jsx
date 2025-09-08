import { Link } from "react-router-dom";

const AuthBtn = () => {
  return (
    <div className="auth-btn order-last d-flex flex-sm-row w- justify-content-center align-items-center">
      <Link  style={{ width: "80%" }} to="/contact" className="bttn-1 alt-position text-center" >
        <span className="text-nowrap fw-semibold">Contact Us</span>
        <span className="icon icon-right">
          <i className="ti ti-arrow-right"></i>
        </span>
      </Link>
    </div>
  );
};

export default AuthBtn;
