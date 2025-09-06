import logo1 from "../../images/youtube4.png";
import logo2 from "../../images/podcast-icon-2.png";

const ListenOnList = [
  {
    logo: logo1,
    link: "https://www.youtube.com/@TECHNAIJA-Studio",
  },
  {
    logo: logo2,
    link: "https://open.spotify.com/show/56oPnFVGxCOTbY4O36hEL9",
  },
];

const ListenOnBtns = ({
  justify = "",
  iconSize = "",
  gap = "gap-sm-4 gap-2",
}) => {
  return (
    <ul className={`d-flex align-items-center ${gap} ${justify}`}>
      {ListenOnList.map((item, index) => {
        return (
          <li className={`brand-icon ${iconSize}`} key={index}>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <img
                className="w-100 rounded-circle"
                src={item.logo}
                alt="brand icon"
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default ListenOnBtns;
