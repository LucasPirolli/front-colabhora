import { Button, Card, Col, Row, Typography } from "antd";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Cookies from "universal-cookie";

import Topbar from "../components/design/Topbar";
import TopBanner from "../components/design/TopBanner";
import { authFetch } from "../services/authFetch";
import Toast from "../components/lib/toast";

const { Paragraph, Text } = Typography;

const ServiceDetails = () => {
  const location = useLocation();
  const { selectedData } = location.state || {};

  const cookies = new Cookies();
  const [loading, setLoading] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const userId = cookies.get("id_usuario");

  const handleAcceptService = async () => {
    if (!selectedData?.id_servico || !userId) return;

    setLoading(true);
    try {
      const endpoint = `${import.meta.env.VITE_BASE_PATH}/service/provide`;

      const response = await authFetch(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_servico: selectedData.id_servico,
          id_usuario_prestador: userId,
        }),
      });

      const data = await response.json();

      console.log('data', data);


      if (response.ok) {
        Toast("success", "Você se candidatou com sucesso!");
        setHasApplied(true);
      }
      else {
        Toast("error", data.error || "Erro ao se candidatar.");
      }
    } catch (err) {
      Toast("error", "Erro de conexão.");
      console.error("Erro ao aceitar serviço:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!selectedData) {
    return <p style={{ padding: "24px" }}>Serviço não encontrado.</p>;
  }

  return (
    <>
      <Topbar />
      <TopBanner
        imageUrl="https://dummyimage.com/1900x300/ededed/ededed&text=."
        text={selectedData.nom_servico || "Detalhes do Serviço"}
      />

      <section style={{ padding: "24px", paddingBottom: "96px" }}>
        <Card bordered style={{ borderRadius: "8px" }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={6}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: 100,
                  background: "#f0f0f0",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "8px",
                }}
              >
                <img
                  src="https://chatgpt.com/backend-api/public_content/enc/eyJpZCI6Im1fNjg2OTk2OTU5NjEwODE5MTk3OTFjNmJjZmU0Y2IwMzg6ZmlsZV8wMDAwMDAwMDIxODA2MWZkOGVlNTIyMjg0NmEwY2RiOSIsInRzIjoiNDg2NTk3IiwicCI6InB5aSIsInNpZyI6IjkzNTdlNDdmNmI5ZTA4NGYwYzFkZjYzMDRiMTM2YzUxNWYwZGI0ZmQ2ZDliMjQ4NDE2MTk3ODdhMmRkMDEyNDciLCJ2IjoiMCIsImdpem1vX2lkIjpudWxsfQ=="
                  alt="Serviço"
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
            </Col>

            <Col xs={24} sm={18}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Text strong>Solicitante</Text>
                  <Paragraph type="secondary">{selectedData.nom_usuario}</Paragraph>
                </Col>
                <Col xs={24} sm={12}>
                  <Text strong>Status</Text>
                  <Paragraph type="secondary">{selectedData.nom_status}</Paragraph>
                </Col>
                <Col xs={24} sm={12}>
                  <Text strong>Data/Hora Início</Text>
                  <Paragraph type="secondary">{selectedData.dth_servico}</Paragraph>
                </Col>
                <Col xs={24} sm={12}>
                  <Text strong>Data/Hora Fim</Text>
                  <Paragraph type="secondary">{selectedData.dth_fim_servico}</Paragraph>
                </Col>
                <Col xs={24} sm={12}>
                  <Text strong>Endereço</Text>
                  <Paragraph type="secondary">{selectedData.desc_endereco}</Paragraph>
                </Col>
                <Col xs={24} sm={12}>
                  <Text strong>Tempo Estimado</Text>
                  <Paragraph type="secondary">{selectedData.num_tempo_estimado}h</Paragraph>
                </Col>
                <Col xs={24} sm={24}>
                  <Text strong>Descrição</Text>
                  <Paragraph type="secondary">{selectedData.desc_servico}</Paragraph>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </section>

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          background: "#fff",
          padding: "12px 24px",
          borderTop: "1px solid #eaeaea",
          zIndex: 1000,
          textAlign: "center",
        }}
      >
        <Button
          type="primary"
          size="large"
          loading={loading}
          disabled={hasApplied}
          onClick={handleAcceptService}
          style={{
            background: "#3F8F56",
            width: "100%",
            maxWidth: 300,
            fontSize: "0.875rem",
            opacity: hasApplied ? 0.5 : 1,
            cursor: hasApplied ? "not-allowed" : "pointer",
          }}
        >
          {hasApplied ? "Candidatado com sucesso" : "Quero me candidatar"}
        </Button>
      </div>
    </>
  );
};

export default ServiceDetails;
