import Topbar from "../components/design/Topbar";
import TopBanner from "../components/design/TopBanner";
import ServiceCard from "../components/design/ServiceCard";
import { Col, Space } from "antd";

const Applications = () => {
  const handleWithdraw = () => {
    console.log("Desistir do serviço...");
  };

  const handleCheckStatus = () => {
    console.log("Ver status do processo seletivo...");
  };

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
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <ServiceCard
              title="Serviço de Entrega Rápida"
              description="Entrega expressa de documentos em áreas urbanas."
              categories={["Logística", "Motoboy"]}
              isApplicationView={true}
              onWithdraw={handleWithdraw}
              onCheckStatus={handleCheckStatus}
            />
            <ServiceCard
              title="Serviço de Entrega Rápida"
              description="Entrega expressa de documentos em áreas urbanas."
              categories={["Logística", "Motoboy"]}
              isApplicationView={true}
              onWithdraw={handleWithdraw}
              onCheckStatus={handleCheckStatus}
            />
            <ServiceCard
              title="Serviço de Entrega Rápida"
              description="Entrega expressa de documentos em áreas urbanas."
              categories={["Logística", "Motoboy"]}
              isApplicationView={true}
              onWithdraw={handleWithdraw}
              onCheckStatus={handleCheckStatus}
            />
            <ServiceCard
              title="Serviço de Entrega Rápida"
              description="Entrega expressa de documentos em áreas urbanas."
              categories={["Logística", "Motoboy"]}
              isApplicationView={true}
              onWithdraw={handleWithdraw}
              onCheckStatus={handleCheckStatus}
            />
          </Space>
        </Col>
      </section>
    </>
  );
};

export default Applications;
