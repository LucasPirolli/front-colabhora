import { Option } from "antd/es/mentions";
import { Input, Select, Row, Col, Space, message } from "antd";
import { useNavigate } from "react-router-dom";

import TopBanner from "../components/design/TopBanner";
import Topbar from "../components/design/Topbar";
import ServiceCard from "../components/design/ServiceCard";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { authFetch } from "../services/authFetch";
import { Spin } from "antd";
import { toast } from "react-toastify";
import Toast from "../components/lib/toast";


interface Opportunity {
  id_servico: number;
  nom_servico: string;
  desc_servico: string;
  id_usuario_solicitante: number;
  id_projeto_pai: number | null;
  nom_projeto: string | null;
  dth_servico: string;
  dth_fim_servico: string;
  num_tempo_estimado: number;
  num_qtd_prestadores: number;
  id_status: number;
  nom_usuario: string;
  cod_email_usuario: string;
  id_cidade: number;
  desc_endereco: string;
  nom_status: string;
  num_qtd_prestadores_confirmados: number;
}


const Opportunities = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const [dataOpportunities, setDataOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingAcceptId, setLoadingAcceptId] = useState<number | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();
  const [selectedUser, setSelectedUser] = useState<string | undefined>();

  const userId = cookies.get("id_usuario");

  const filteredData = dataOpportunities.filter((item) => {
    const matchesSearch =
      item.nom_servico.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.desc_servico.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nom_usuario.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus ? item.nom_status === selectedStatus : true;
    const matchesUser = selectedUser ? item.nom_usuario === selectedUser : true;

    return matchesSearch && matchesStatus && matchesUser;
  });


  const fetchOpportunities = async () => {
    setLoading(true);
    try {
      const endpoint = `${import.meta.env.VITE_BASE_PATH}/service?id_usuario_busca=${userId}`

      const response = await authFetch(endpoint, {
        method: "GET",
      });

      const data = await response.json();

      if (response.ok && data.result) {
        setDataOpportunities(data.result);
      } else {
        message.error("Erro ao carregar oportunidades.");
      }
    } catch (err: any) {
      message.error("Erro de conexão.", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptService = async (id_servico: number) => {
    setLoadingAcceptId(id_servico);

    try {
      const endpoint = `${import.meta.env.VITE_BASE_PATH}/service/provide`;

      const response = await authFetch(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_servico,
          id_usuario_prestador: userId,
        }),
      });

      if (response.ok) {
        Toast('success', "Serviço aceito com sucesso!");
        fetchOpportunities();
      } else {
        const errorData = await response.json();
        Toast('error', errorData.message || "Erro ao aceitar o serviço.");
      }
    } catch (err) {
      Toast('error', "Erro de conexão.");
    } finally {
      setLoadingAcceptId(null); 
    }
  };



  useEffect(() => {
    fetchOpportunities()
  }, []);

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
                {[...new Set(dataOpportunities.map((item) => item.nom_status))].map(
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
                {[...new Set(dataOpportunities.map((item) => item.nom_usuario))].map(
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
                    onAccept={() => handleAcceptService(item.id_servico)}
                    acceptLoading={loadingAcceptId === item.id_servico}
                    onClick={() =>
                      handleNavigate({
                        title: item.nom_servico,
                        description: item.desc_servico,
                        categories: [item.nom_status],
                      })
                    }
                  />

                ))}
              </Space>
            </Spin>
          </Col>

        </Row>
      </section>
    </>
  );
};

export default Opportunities;
