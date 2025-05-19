import { Option } from "antd/es/mentions";
import TopBanner from "../components/design/TopBanner";
import Topbar from "../components/design/Topbar";
import { Button, Input, Select, Row, Col, Space } from "antd";
import ServiceCard from "../components/design/ServiceCard";

const MyServices = () => {
  return (
    <>
      <Topbar />
      <TopBanner
        imageUrl="https://dummyimage.com/1900x300/ededed/ededed&text=."
        text="Meus serviços"
      />

      <section className="container-my-services" style={{ padding: "24px" }}>
        <Row gutter={24}>
          <Col xs={24} sm={24} md={6}>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Button type="primary" block style={{ background: "#3F8F56" }}>
                Novo
              </Button>

              <label>Buscar</label>
              <Input placeholder="Digite para buscar..." />

              <label>Filtro 1</label>
              <Select placeholder="Selecione uma opção" allowClear>
                <Option value="1">Opção 1</Option>
                <Option value="2">Opção 2</Option>
              </Select>

              <label>Filtro 2</label>
              <Select placeholder="Selecione uma opção" allowClear>
                <Option value="1">Opção A</Option>
                <Option value="2">Opção B</Option>
              </Select>

              <label>Filtro 3</label>
              <Select placeholder="Selecione uma opção" allowClear>
                <Option value="1">Item X</Option>
                <Option value="2">Item Y</Option>
              </Select>
            </Space>
          </Col>

          <Col xs={24} sm={24} md={18}>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <ServiceCard
                title="Serviço X"
                description="Descrição do serviço X. Texto explicando o que o serviço faz."
                categories={["Categoria A", "Categoria B", "Categoria C"]}
                onEdit={() => console.log("Editar")}
                onDelete={() => console.log("Excluir")}
              />

              <ServiceCard
                title="Serviço Y"
                description="Descrição do serviço Y. Texto explicando o que o serviço faz."
                categories={["Categoria A"]}
                onEdit={() => console.log("Editar Y")}
                onDelete={() => console.log("Excluir Y")}
              />
            </Space>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default MyServices;
