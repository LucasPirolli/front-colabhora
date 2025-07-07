import { Option } from "antd/es/mentions";
import { Button, Input, Select, Row, Col, Space, message, Spin } from "antd";

import TopBanner from "../components/design/TopBanner";
import Topbar from "../components/design/Topbar";
import ServiceCard from "../components/design/ServiceCard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { authFetch } from "../services/authFetch";
import Cookies from "universal-cookie";
import { Services } from "../../types/types";
import Toast from "../components/lib/toast";
import CreateServiceModal from "../components/lib/CreateServiceModal";
import EvaluateServiceModal from "../components/lib/EvaluateServiceModal";

const MyServices = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const [dataServices, setDataServices] = useState<Services[]>([]);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();
  const [selectedUser, setSelectedUser] = useState<string | undefined>();

  const userId = cookies.get("id_usuario");

  const [modalVisible, setModalVisible] = useState(false);
  const [isPJ, setIsPJ] = useState(false);

  const [evaluationModalVisible, setEvaluationModalVisible] = useState(false);
  const [avaliarUsuarios, setAvaliarUsuarios] = useState<any[]>([]);
  const [idServicoAvaliado, setIdServicoAvaliado] = useState<number | null>(null);


  const filteredData = dataServices.filter((item) => {
    const matchesSearch =
      item.nom_servico.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.desc_servico.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nom_usuario.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus ? item.nom_status === selectedStatus : true;
    const matchesUser = selectedUser ? item.nom_usuario === selectedUser : true;

    return matchesSearch && matchesStatus && matchesUser;
  });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const endpoint = `${import.meta.env.VITE_BASE_PATH}/service?id_usuario_solicitante=${userId}`

      const response = await authFetch(endpoint, {
        method: "GET",
      });

      const data = await response.json();

      if (response.ok && data.result) {
        setDataServices(data.result);
      } else {
        message.error("Erro ao carregar oportunidades.");
      }
    } catch (err) {
      console.error("Erro ao buscar oportunidades:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelService = async (id_servico: number) => {
    try {
      const endpoint = `${import.meta.env.VITE_BASE_PATH}/service/cancel`;

      const response = await authFetch(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_servico }),
      });

      const data = await response.json();

      if (response.ok) {
        Toast("success", "Serviço cancelado com sucesso!");
        fetchServices();
      } else {
        Toast("error", data.error || "Erro ao cancelar o serviço.");
      }
    } catch (err) {
      Toast("error", "Erro de conexão.");
      console.error("Erro ao cancelar serviço:", err);
    }
  };

  const handleFinalizeService = async (id_servico: number) => {
    try {
      const endpoint = `${import.meta.env.VITE_BASE_PATH}/service/finalize`;

      const response = await authFetch(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_servico }),
      });

      const data = await response.json();

      if (response.ok && data.result) {
        Toast("success", "Serviço finalizado com sucesso!");
        setIdServicoAvaliado(data.result.id_servico);
        setAvaliarUsuarios(data.result.avaliar_usuarios || []);
        setEvaluationModalVisible(true);
      } else {
        Toast("error", data.error || "Erro ao finalizar o serviço.");
      }
    } catch (err) {
      Toast("error", "Erro de conexão.");
      console.error("Erro ao finalizar serviço:", err);
    }
  };

  const handleSubmitEvaluation = async (payload: any) => {
    try {
      const endpoint = `${import.meta.env.VITE_BASE_PATH}/service/rate`;

      const response = await authFetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        Toast("success", "Avaliação enviada com sucesso!");
        setEvaluationModalVisible(false);
        fetchServices();
      } else {
        Toast("error", data.error || "Erro ao enviar avaliação.");
      }
    } catch (err) {
      Toast("error", "Erro ao conectar com o servidor.");
      console.error("Erro ao enviar avaliação:", err);
    }
  };

  const handleNavigate = (data: any) => {
    navigate("/service-details", {
      state: {
        selectedData: data,
      },
    });
  };

  const tipoUsuario = cookies.get("flg_tipo_usuario");
  
  useEffect(() => {
    setIsPJ(tipoUsuario === "PJ");
  }, [tipoUsuario]);

  useEffect(() => {
    fetchServices()
  }, []);

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
              <Button
                type="primary"
                block
                style={{ background: "#3F8F56" }}
                onClick={() => setModalVisible(true)}
              >
                Novo
              </Button>


              <label>Buscar</label>
              <Input
                placeholder="Digite para buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <label>Status</label>
              <Select
                placeholder="Selecione o status"
                allowClear
                value={selectedStatus}
                onChange={(value) => setSelectedStatus(value)}
              >
                {[...new Set(dataServices.map((item) => item.nom_status))].map(
                  (status) => (
                    <Option key={status} value={status}>
                      {status}
                    </Option>
                  )
                )}
              </Select>

              <label>Solicitante</label>
              <Select
                placeholder="Selecione o solicitante"
                allowClear
                value={selectedUser}
                onChange={(value) => setSelectedUser(value)}
              >
                {[...new Set(dataServices.map((item) => item.nom_usuario))].map(
                  (user) => (
                    <Option key={user} value={user}>
                      {user}
                    </Option>
                  )
                )}
              </Select>
            </Space>
          </Col>

          <Col xs={24} sm={24} md={18}>
            <Spin spinning={loading}>
              <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                {filteredData.map((item) => (
                  <ServiceCard
                    key={item.id_servico}
                    title={item.nom_servico}
                    description={item.desc_servico}
                    categories={[item.nom_status, item.nom_usuario]}
                    status={item.nom_status}
                    hasActions
                    onFinished={() => handleFinalizeService(item.id_servico)}
                    onCancel={() => handleCancelService(item.id_servico)}
                    onClick={() => handleNavigate(item)}
                  />

                ))}
              </Space>
            </Spin>
          </Col>
        </Row>
      </section>
      <CreateServiceModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSuccess={() => {
          setModalVisible(false);
          fetchServices();
        }}
        isPJ={isPJ}
      />
      <EvaluateServiceModal
        visible={evaluationModalVisible}
        onClose={() => { }}
        onSubmit={handleSubmitEvaluation}
        idServico={idServicoAvaliado!}
        usuariosParaAvaliar={avaliarUsuarios}
      />
    </>
  );
};

export default MyServices;
