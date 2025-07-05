import { Avatar, Dropdown, MenuProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import Logo from "../../../assets/logo.png";
import Toast from "../lib/toast";

import "../../styles/components/design/topbar.scss";

const Topbar = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const tipoUsuario = cookies.get("flg_tipo_usuario");

  const handleLogout = () => {
    cookies.remove("token", { path: "/" });
    cookies.remove("flg_tipo_usuario", { path: "/" });
    Toast("info", "Logout realizado com sucesso!");

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: <span onClick={() => navigate("/profile")}>Meu perfil</span>,
    },
    ...(tipoUsuario === "AD"
      ? [
        {
          key: "skills",
          label: (
            <span onClick={() => navigate("/adm-skills")}>Habilidades</span>
          ),
        },
        {
          key: "category",
          label: (
            <span onClick={() => navigate("/adm-categories")}>
              Categoria
            </span>
          ),
        },
      ]
      : []),
    {
      key: "logout",
      label: <span onClick={handleLogout}>Sair</span>,
    },
  ];

  return (
    <div className="container-topbar">
      <div className="content-title" onClick={() => navigate("/home")}>
        <img src={Logo} style={{ cursor: "pointer" }} />
        <span className="title">ColabHora</span>
      </div>
      <div className="container-actions">
        {tipoUsuario !== "PJ" && (
          <a className="link" onClick={() => navigate("/opportunities")}>
            Oportunidades
          </a>
        )}
        <a className="link" onClick={() => navigate("/my-services")}>
          Meus serviços
        </a>
        {tipoUsuario !== "PJ" && (
          <a className="link" onClick={() => navigate("/applications")}>
            Candidaturas
          </a>
        )}

        <Dropdown menu={{ items: menuItems }} placement="bottomRight" arrow>
          <Avatar
            style={{ backgroundColor: "#112e37", cursor: "pointer" }}
            icon={<UserOutlined />}
            size="small"
          />
        </Dropdown>
      </div>
    </div>
  );
};

export default Topbar;
