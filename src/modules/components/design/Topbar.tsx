import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

import Logo from "../../../assets/logo.png";

import "../../styles/components/design/topbar.scss";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();

  return (
    <div className="container-topbar">
      <div className="content-title">
        <img src={Logo} style={{ cursor: "pointer" }} />
        <span className="title">ColabHora</span>
      </div>
      <div className="container-actions">
        <a className="link">Meus serviços</a>
        <a className="link">Candidaturas</a>
        <Avatar
          style={{ backgroundColor: "#112e37", cursor: "pointer" }}
          icon={<UserOutlined />}
          size={"small"}
          onClick={() => navigate("/signin")}
        />
      </div>
    </div>
  );
};

export default Topbar;
