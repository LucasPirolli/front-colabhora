import { Option } from "antd/es/mentions";
import { Input, Select, Row, Col, Space } from "antd";
import { useNavigate } from "react-router-dom";

import TopBanner from "../components/design/TopBanner";
import Topbar from "../components/design/Topbar";
import ServiceCard from "../components/design/ServiceCard";

const Opportunities = () => {
  const navigate = useNavigate();

    const handleNavigate = (data: any) => {
    navigate("/service-details", {
      state: {
        selectedData: data,
      },
    });
  };

  return (
    <>
      <Topbar />
      <TopBanner
        imageUrl="https://dummyimage.com/1900x300/ededed/ededed&text=."
        text="Oportunidades"
      />

      <section className="container-my-services" style={{ padding: "24px" }}>
        <Row gutter={24}>
          <Col xs={24} sm={24} md={6}>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
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
                hasActions={false}
                onClick={() =>
                  handleNavigate({
                    title: "Serviço Y",
                    description:
                      "Descrição do serviço Y. Texto explicando o que o serviço faz.",
                    categories: ["Categoria A"],
                  })
                }
              />

              <ServiceCard
                title="Serviço Y"
                description="Descrição do serviço Y. Texto explicando o que o serviço faz."
                categories={["Categoria A"]}
                onEdit={() => console.log("Editar Y")}
                onDelete={() => console.log("Excluir Y")}
                hasActions={false}
                onClick={() =>
                  handleNavigate({
                    title: "Serviço Y",
                    description:
                      "Descrição do serviço Y. Texto explicando o que o serviço faz.",
                    categories: ["Categoria A"],
                  })
                }
              />
            </Space>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default Opportunities;
