import { useState } from "react";
import { Typography, Row, Col, Input, Select, Form, Button, Card } from "antd";
import Topbar from "../components/design/Topbar";

const { Title } = Typography;
const { Option } = Select;

const Profile = () => {
  const [form] = Form.useForm();

  return (
    <>
      <Topbar />
      <div style={{ padding: "24px" }}>
        <Title level={3}>Editar meu perfil</Title>

        <Card title="Sobre você" style={{ marginBottom: "24px" }}>
          <Form form={form} layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="name" label="Nome completo">
                  <Input placeholder="Digite seu nome completo" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="email" label="E-mail">
                  <Input placeholder="Digite seu e-mail" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name="city" label="Cidade">
                  <Input placeholder="Digite sua cidade" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="category" label="Categoria">
                  <Select placeholder="Selecione uma categoria">
                    <Option value="design">Design</Option>
                    <Option value="dev">Desenvolvimento</Option>
                    <Option value="adm">Administração</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name="saldoHoras" label="Saldo de horas">
                  <Input type="number" placeholder="0" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="skills" label="Habilidades">
                  <Select
                    mode="tags"
                    style={{ width: "100%" }}
                    placeholder="Digite ou selecione habilidades"
                  >
                    <Option value="comunicação">Comunicação</Option>
                    <Option value="figma">Figma</Option>
                    <Option value="react">React</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button type="primary" style={{ background: "#3F8F56" }}>
                Salvar
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <div>
          <Title level={4}>Experiência</Title>
          <Card title="Serviço X">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since...
            </p>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Profile;
