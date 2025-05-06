import Logo from "../../../assets/logo.png";

import "../../styles/components/design/topbar.scss";

const Topbar = () => {
  return (
    <div className="container-topbar">
      <div className="content-title">
        <img src={Logo} style={{ cursor: "pointer" }} />
        <span className="title">ColabHora</span>
      </div>
      <div className="container-actions"></div>
    </div>
  );
};

export default Topbar;
