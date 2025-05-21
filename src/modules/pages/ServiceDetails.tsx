import { Button, Card, Col, Row, Typography } from "antd";
import { useLocation } from "react-router-dom";

import Topbar from "../components/design/Topbar";
import TopBanner from "../components/design/TopBanner";

const { Paragraph, Text } = Typography;

const ServiceDetails = () => {
  const location = useLocation();
  const { selectedData } = location.state || {};

  return (
    <>
      <Topbar />
      <TopBanner
        imageUrl="https://dummyimage.com/1900x300/ededed/ededed&text=."
        text={selectedData?.title || "Serviço"}
      />

      {/* Conteúdo principal */}
      <section style={{ padding: "24px", paddingBottom: "96px" }}>
        <Card bordered style={{ borderRadius: "8px" }}>
          <Row gutter={[16, 16]}>
            {/* Imagem/ícone */}
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
                  src="https://via.placeholder.com/64"
                  alt="Serviço"
                  style={{ width: 64, height: 64 }}
                />
              </div>
            </Col>

            <Col xs={24} sm={18}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Text strong>Lorem</Text>
                  <Paragraph type="secondary">
                    rem Ipsum is simply dummy text of the printing.
                  </Paragraph>
                </Col>
                <Col xs={24} sm={12}>
                  <Text strong>Lorem</Text>
                  <Paragraph type="secondary">
                    rem Ipsum is simply dummy text of the printing.
                  </Paragraph>
                </Col>
                <Col xs={24} sm={12}>
                  <Text strong>Lorem</Text>
                  <Paragraph type="secondary">
                    rem Ipsum is simply dummy text of the printing.
                  </Paragraph>
                </Col>
                <Col xs={24} sm={12}>
                  <Text strong>Lorem</Text>
                  <Paragraph type="secondary">
                    rem Ipsum is simply dummy text of the printing.
                  </Paragraph>
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
          style={{
            background: "#3F8F56",
            width: "100%",
            maxWidth: 300,
            fontSize: "0.875rem",
          }}
        >
          Quero me candidatar
        </Button>
      </div>
    </>
  );
};

export default ServiceDetails;
