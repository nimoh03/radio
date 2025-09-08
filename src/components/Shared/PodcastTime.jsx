/* eslint-disable react/prop-types */
const PodcastTime = ({
  time,
  icon,
  iconColor = "tcp-1",
  txtColor = "tcn-n0",
}) => {
  return (
    <div className="episode-time d-flex align-items-center gap-2">
      <span className={`fs-sm ${iconColor}`}>{icon}</span>
      <span className={`fs-sm fw-normal text-nowrap ${txtColor}`}>{time}</span>
    </div>
  );
};

export default PodcastTime;