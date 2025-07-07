import { useEffect, useState } from "react";
import { Col, Space, Spin } from "antd";
import Cookies from "universal-cookie";

import Topbar from "../components/design/Topbar";
import TopBanner from "../components/design/TopBanner";
import ServiceCard from "../components/design/ServiceCard";
import { authFetch } from "../services/authFetch";

interface Service {
  id_servico: number;
  nom_servico: string;
  desc_servico: string;
  nom_status: string;
  nom_usuario: string;
}

const Applications = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);

  const cookies = new Cookies();
  const userId = cookies.get("id_usuario");

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await authFetch(
        `${import.meta.env.VITE_BASE_PATH}/service?id_usuario_prestador=${userId}`
      );
      const data = await response.json();
      if (response.ok && data.result) {
        setServices(data.result);
      }
    } catch (err) {
      console.error("Erro ao carregar candidaturas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <>
      <Topbar />
      <TopBanner
        imageUrl="https://dummyimage.com/1900x300/ededed/ededed&text=."
        text="Minhas candidaturas"
      />
      <section
        className="container-applications"
        style={{
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Col xs={24} sm={24} md={18} style={{ width: "100%" }}>
          {loading ? (
            <Spin size="large" />
          ) : services.length === 0 ? (
            <p style={{ textAlign: "center" }}>Nenhuma candidatura encontrada.</p>
          ) : (
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              {services.map((item) => (
                <ServiceCard
                  key={item.id_servico}
                  title={item.nom_servico}
                  description={item.desc_servico}
                  categories={[item.nom_status, item.nom_usuario]}
                />
              ))}
            </Space>
          )}
        </Col>
      </section>
    </>
  );
};

export default Applications;
