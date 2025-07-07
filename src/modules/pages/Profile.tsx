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
import isEqual from "lodash.isequal";

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
  const [habilidades, setHabilidades] = useState<any[]>([]);
  const [usuario, setUsuario] = useState<any>(null);
  const [initialValues, setInitialValues] = useState<any>(null);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEstados();
    fetchHabilidades();
    fetchUsuarioCompleto();
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

  const fetchHabilidades = async () => {
    try {
      const res = await authFetch(`${import.meta.env.VITE_BASE_PATH}/skill`);
      const data = await res.json();
      setHabilidades(data.result || []);
    } catch {
      message.error("Erro ao carregar habilidades.");
    }
  };

  const fetchUsuarioCompleto = async () => {
    try {
      const [resUsuario, todasCidadesRes, habsUsuario] = await Promise.all([
        authFetch(`${import.meta.env.VITE_BASE_PATH}/user?id_usuario=${userId}`),
        authFetch(`${import.meta.env.VITE_BASE_PATH}/city`),
        authFetch(`${import.meta.env.VITE_BASE_PATH}/user/skills?id_usuario=${userId}`),
      ]);

      const usuarioData = await resUsuario.json();
      const cidadesData = await todasCidadesRes.json();
      const habsData = await habsUsuario.json();

      const info = usuarioData.result[0];
      const cidadeUsuario = cidadesData.result.find(
        (c: any) => c.id_cidade === info.id_cidade
      );

      const estadoId = cidadeUsuario?.id_estado;
      const cidadesDoEstado = cidadesData.result.filter(
        (c: any) => c.id_estado === estadoId
      );

      setCidades(cidadesDoEstado); 

      const habilidadesIds = habsData.result.map((h: any) => h.id_habilidade);
      setUsuario(info);

      const valoresIniciais = {
        nom_usuario: info.nom_usuario,
        cod_email_usuario: info.cod_email_usuario,
        cod_cadastro: info.cod_cadastro,
        desc_endereco: info.desc_endereco,
        id_estado: estadoId,
        id_cidade: info.id_cidade,
        id_habilidade_lista: habilidadesIds,
      };

      form.setFieldsValue(valoresIniciais);
      setInitialValues(valoresIniciais);
    } catch {
      message.error("Erro ao carregar dados do usuário.");
    }
  };


  const handleChangeEstado = async (id_estado: number) => {
    try {
      const res = await authFetch(
        `${import.meta.env.VITE_BASE_PATH}/city?id_estado=${id_estado}`
      );
      const data = await res.json();
      setCidades(data.result || []);
      form.setFieldsValue({ id_cidade: undefined });
    } catch {
      message.error("Erro ao carregar cidades.");
    }
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
        setIsFormChanged(false);
        fetchUsuarioCompleto();
      } else {
        Toast("error", data.error || "Erro ao atualizar perfil.");
      }
    } catch {
      Toast("error", "Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = () => {
    const current = form.getFieldsValue();
    setIsFormChanged(!isEqual(current, initialValues));
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
            onValuesChange={handleFormChange}
          >
            <Row style={{ marginBottom: 16 }}>
              <Col>
                <Typography.Text strong>Saldo de horas disponível: </Typography.Text>
                <Typography.Text type="success">
                  {usuario?.num_saldo_horas_st}
                </Typography.Text>
              </Col>
            </Row>
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

              <Col span={24}>
                <Form.Item
                  name="id_habilidade_lista"
                  label="Habilidades"
                  rules={[{ required: false }]}
                >
                  <Select
                    mode="multiple"
                    placeholder="Selecione suas habilidades"
                  >
                    {habilidades.map((hab: any) => (
                      <Option key={hab.id_habilidade} value={hab.id_habilidade}>
                        {hab.nom_habilidade}
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
                disabled={!isFormChanged}
                style={{ background: isFormChanged ? "#3F8F56" : "#c8c8c8" }}
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
