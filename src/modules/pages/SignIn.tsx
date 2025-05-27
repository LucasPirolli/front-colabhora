import { useEffect, useState } from "react";
import { Button, Form, Input, Select, Row, Col, message } from "antd";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

import Banner from "../../assets/banner-signin.svg";
import Toast from "../components/lib/toast";

import "../styles/pages/signIn.scss";
const { Option } = Select;

function SignIn() {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);

  const [estados, setEstados] = useState<any[]>([]);
  const [cidades, setCidades] = useState<any[]>([]);
  const [habilidades, setHabilidades] = useState<any[]>([]);

  const [selectedEstado, setSelectedEstado] = useState<string | undefined>();

  const [form] = Form.useForm();

  useEffect(() => {
    if (isRegistering) {
      fetchInitialData();
    }
    form.resetFields();
  }, [isRegistering]);

  const fetchInitialData = async () => {
    try {
      const [estadosRes, habilidadesRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_BASE_PATH}/state`),
        fetch(`${import.meta.env.VITE_BASE_PATH}/skill`),
      ]);

      const estadosData = await estadosRes.json();
      const habilidadesData = await habilidadesRes.json();

      setEstados(estadosData.result || []);
      setHabilidades(habilidadesData.result || []);
    } catch (err) {
      message.error("Erro ao carregar dados iniciais.");
    }
  };

  const fetchCidades = async (estadoId: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_PATH}/city?id_estado=${estadoId}`
      );
      const data = await response.json();
      setCidades(data.result || []);
    } catch (err) {
      message.error("Erro ao buscar cidades");
    }
  };

  const handleEstadoChange = (value: string) => {
    setSelectedEstado(value);
    form.setFieldsValue({ id_cidade: undefined });
    fetchCidades(value);
  };

  const onFinish = async () => {
    const allValues = form.getFieldsValue();

    setLoading(true);

    try {
      if (isRegistering) {
        const { estado_id, ...body } = allValues;

        const response = await fetch(`${import.meta.env.VITE_BASE_PATH}/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        const result = await response.json();

        if (!response.ok) {
          const errorMessage =
            result.message || result.msg || "Erro ao registrar usuário";
          Toast("error", `${errorMessage}`);
        } else {
          Toast("success", "Usuário criado com sucesso!");
          setTimeout(() => {
            setIsRegistering(false);
            form.resetFields();
            setSelectedEstado("");
          }, 1500);
        }
      } else {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_PATH}/user/validate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cod_email_usuario: allValues.cod_email_usuario,
              cod_senha_usuario: allValues.cod_senha_usuario,
            }),
          }
        );

        const result = await response.json();

        if (!response.ok) {
          const errorMessage =
            result.message || result.msg || "Email ou senha incorretos";
          Toast("error", `${errorMessage}`);
        } else {
          const token = result?.result?.token;

          if (!token) {
            Toast("error", "Token não encontrado na resposta.");
          } else {
            Cookies.set("token", token);
            Toast("success", "Login realizado com sucesso!");

            setTimeout(() => {
              navigate("/home");
            }, 1500);
          }
        }
      }
    } catch (err) {
      Toast("error", "Erro inesperado ao fazer login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-page="signIn">
      <section className="container-form">
        <div className="content-form">
          <h1 className="title">ColabHora</h1>
          <span className="phrase">
            {isRegistering
              ? "Crie sua conta"
              : "Faça login para acessar a ferramenta"}
          </span>

          <Form
            form={form}
            layout="vertical"
            style={{ width: "100%" }}
            onFinish={onFinish}
          >
            {isRegistering && (
              <>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Nome"
                      name="nom_usuario"
                      rules={[{ required: true, message: "Digite o nome" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="CPF"
                      name="cod_cadastro"
                      rules={[{ required: true, message: "Digite o CPF" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Email"
                      name="cod_email_usuario"
                      rules={[{ required: true, message: "Digite o email" }]}
                    >
                      <Input type="email" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Senha"
                      name="cod_senha_usuario"
                      rules={[{ required: true, message: "Digite a senha" }]}
                    >
                      <Input.Password />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Estado"
                      name="estado_id"
                      rules={[
                        { required: true, message: "Selecione o estado" },
                      ]}
                    >
                      <Select
                        placeholder="Selecione o estado"
                        onChange={handleEstadoChange}
                      >
                        {estados.map((estado) => (
                          <Option
                            key={estado.id_estado}
                            value={estado.id_estado}
                          >
                            {estado.nom_estado}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Cidade"
                      name="id_cidade"
                      rules={[
                        { required: true, message: "Selecione a cidade" },
                      ]}
                    >
                      <Select
                        placeholder="Selecione a cidade"
                        disabled={!selectedEstado}
                        loading={!selectedEstado}
                        allowClear
                      >
                        {cidades.map((cidade) => (
                          <Option
                            key={cidade.id_cidade}
                            value={cidade.id_cidade}
                          >
                            {cidade.nom_cidade}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label="Endereço"
                  name="desc_endereco"
                  rules={[{ required: true, message: "Digite o endereço" }]}
                >
                  <Input />
                </Form.Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Tipo de Usuário"
                      name="flg_tipo_usuario"
                      rules={[{ required: true, message: "Selecione o tipo" }]}
                    >
                      <Select placeholder="Selecione o tipo">
                        <Option value="PF">Pessoa física</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Habilidades"
                      name="id_habilidade_lista"
                      rules={[
                        { required: true, message: "Selecione as habilidades" },
                      ]}
                    >
                      <Select
                        mode="multiple"
                        placeholder="Selecione habilidades"
                      >
                        {habilidades.map((habilidade) => (
                          <Option
                            key={habilidade.id_habilidade}
                            value={habilidade.id_habilidade}
                          >
                            {habilidade.nom_habilidade}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}

            {!isRegistering && (
              <>
                <Form.Item
                  label="Email"
                  name="cod_email_usuario"
                  rules={[{ required: true, message: "Digite o email" }]}
                >
                  <Input type="email" />
                </Form.Item>

                <Form.Item
                  label="Senha"
                  name="cod_senha_usuario"
                  rules={[{ required: true, message: "Digite a senha" }]}
                >
                  <Input.Password />
                </Form.Item>
              </>
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{ background: "#3F8F56", marginRight: "8px" }}
              >
                {isRegistering ? "Registrar" : "Entrar"}
              </Button>

              <Button
                type="link"
                onClick={() => setIsRegistering((prev) => !prev)}
                style={{ color: "#7b7b7b" }}
              >
                {isRegistering ? "Entrar" : "Registre-se"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </section>

      <div className="content-img">
        <img src={Banner} alt="Banner" />
      </div>
    </div>
  );
}

export default SignIn;
