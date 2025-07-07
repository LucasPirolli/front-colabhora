import {
  Typography,
  Row,
  Col,
  Input,
  Select,
  Form,
  Button,
  Card,
  message,
} from "antd";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

import Topbar from "../components/design/Topbar";
import { authFetch } from "../services/authFetch";
import Toast from "../components/lib/toast";

const { Title } = Typography;
const { Option } = Select;

const Profile = () => {
  const [form] = Form.useForm();
  const cookies = new Cookies();
  const userId = cookies.get("id_usuario");

  const [estados, setEstados] = useState<any[]>([]);
  const [cidades, setCidades] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFormTouched, setIsFormTouched] = useState(false);
  const [initialValues, setInitialValues] = useState<any>({});

  useEffect(() => {
    fetchEstados();
    fetchUsuario();
  }, []);

  const fetchEstados = async () => {
    try {
      const res = await authFetch(`${import.meta.env.VITE_BASE_PATH}/state`);
      const data = await res.json();
      setEstados(data.result || []);
    } catch {
      message.error("Erro ao carregar estados.");
    }
  };

  const fetchCidades = async (id_estado: number) => {
    try {
      const res = await authFetch(
        `${import.meta.env.VITE_BASE_PATH}/city?id_estado=${id_estado}`
      );
      const data = await res.json();
      setCidades(data.result || []);
    } catch {
      message.error("Erro ao carregar cidades.");
    }
  };

  const fetchUsuario = async () => {
    try {
      const res = await authFetch(
        `${import.meta.env.VITE_BASE_PATH}/user?id_usuario=${userId}`
      );
      const data = await res.json();
      const info = data.result[0];

      const cidadeRes = await authFetch(`${import.meta.env.VITE_BASE_PATH}/city`);
      const todasCidades = (await cidadeRes.json()).result || [];
      const cidadeUsuario = todasCidades.find(
        (c: any) => c.id_cidade === info.id_cidade
      );
      const estadoId = cidadeUsuario?.id_estado;

      if (estadoId) {
        await fetchCidades(estadoId);
      }

      const formValues = {
        nom_usuario: info.nom_usuario,
        cod_email_usuario: info.cod_email_usuario,
        cod_cadastro: info.cod_cadastro,
        desc_endereco: info.desc_endereco,
        id_estado: estadoId,
        id_cidade: info.id_cidade,
        id_habilidade_lista: [],
      };

      form.setFieldsValue(formValues);
      setInitialValues(formValues);
    } catch {
      message.error("Erro ao carregar dados do usuário.");
    }
  };

  const handleChangeEstado = async (id_estado: number) => {
    await fetchCidades(id_estado);
    form.setFieldsValue({ id_cidade: undefined });
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const body = {
        id_usuario: userId,
        nom_usuario: values.nom_usuario,
        cod_email_usuario: values.cod_email_usuario,
        cod_cadastro: values.cod_cadastro,
        id_cidade: values.id_cidade,
        desc_endereco: values.desc_endereco,
        id_habilidade_lista: values.id_habilidade_lista || [],
      };

      const res = await authFetch(`${import.meta.env.VITE_BASE_PATH}/user`, {
        method: "PATCH",
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        Toast("success", "Perfil atualizado com sucesso!");
        setIsFormTouched(false);
        fetchUsuario();
      } else {
        Toast("error", data.error || "Erro ao atualizar perfil.");
      }
    } catch {
      Toast("error", "Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  const checkFormChanges = () => {
    const currentValues = form.getFieldsValue();
    const hasChanges = Object.keys(initialValues).some((key) => {
      const initial = initialValues[key];
      const current = currentValues[key];

      if (Array.isArray(initial) && Array.isArray(current)) {
        return initial.sort().join(",") !== current.sort().join(",");
      }

      return initial !== current;
    });
    setIsFormTouched(hasChanges);
  };

  return (
    <>
      <Topbar />
      <div style={{ padding: "24px" }}>
        <Title level={3}>Editar meu perfil</Title>

        <Card title="Sobre você" style={{ marginBottom: "24px" }}>
          <Form
            layout="vertical"
            form={form}
            onFinish={handleSubmit}
            onValuesChange={checkFormChanges}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="nom_usuario"
                  label="Nome completo"
                  rules={[{ required: true, message: "Campo obrigatório" }]}
                >
                  <Input placeholder="Digite seu nome completo" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="cod_email_usuario"
                  label="E-mail"
                  rules={[{ required: true, message: "Campo obrigatório" }]}
                >
                  <Input placeholder="Digite seu e-mail" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="cod_cadastro"
                  label="CPF ou CNPJ"
                  rules={[{ required: true, message: "Campo obrigatório" }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="desc_endereco"
                  label="Endereço"
                  rules={[{ required: true, message: "Campo obrigatório" }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="id_estado"
                  label="Estado"
                  rules={[{ required: true, message: "Campo obrigatório" }]}
                >
                  <Select
                    placeholder="Selecione o estado"
                    onChange={handleChangeEstado}
                  >
                    {estados.map((estado: any) => (
                      <Option key={estado.id_estado} value={estado.id_estado}>
                        {estado.nom_estado}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="id_cidade"
                  label="Cidade"
                  rules={[{ required: true, message: "Campo obrigatório" }]}
                >
                  <Select placeholder="Selecione a cidade">
                    {cidades.map((cidade: any) => (
                      <Option key={cidade.id_cidade} value={cidade.id_cidade}>
                        {cidade.nom_cidade}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={!isFormTouched}
                style={{ background: isFormTouched ? "#3F8F56" : "#c8c8c8" }}
              >
                Salvar
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default Profile;
