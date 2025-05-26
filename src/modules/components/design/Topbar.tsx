import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import Logo from "../../../assets/logo.png";

import "../../styles/components/design/topbar.scss";

const Topbar = () => {
  const navigate = useNavigate();

  return (
    <div className="container-topbar">
      <div className="content-title" onClick={() => navigate("/home")}>
        <img src={Logo} style={{ cursor: "pointer" }} />
        <span className="title">ColabHora</span>
      </div>
      <div className="container-actions">
        <a className="link" onClick={() => navigate("/opportunities")}>
          Oportunidades
        </a>
        <a className="link" onClick={() => navigate("/my-services")}>
          Meus serviços
        </a>
        <a className="link" onClick={() => navigate("/applications")}>
          Candidaturas
        </a>
        <Avatar
          style={{ backgroundColor: "#112e37", cursor: "pointer" }}
          icon={<UserOutlined />}
          size={"small"}
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  );
};

export default Topbar;
