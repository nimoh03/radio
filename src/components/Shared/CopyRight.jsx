import { Link } from "react-router-dom";

const CopyRight = () => {
  return (
    <span>
      Copyright © {new Date().getFullYear()} {" "}
      <Link to={"/"} className="tcp-1 link-text">
        TechNaija FM
      </Link>{" "}
      All Rights Reserved.
    </span>
  );
};

export default CopyRight;
