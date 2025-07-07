import { useEffect, useState } from "react";
import { Button, Input, Table, Typography, Space, message, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import Topbar from "../../components/design/Topbar";
import Toast from "../../components/lib/toast";
import { authFetch } from "../../services/authFetch";

const { Title } = Typography;

interface Skill {
  id_habilidade: number;
  nom_habilidade: string;
}

const Skills = () => {
  const [search, setSearch] = useState("");
  const [dataSkills, setDataSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSkillName, setNewSkillName] = useState<string>("");
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null); // null = modo criação

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_PATH}/skill`);
      const data = await response.json();

      if (response.ok && data.result) {
        setDataSkills(data.result);
      } else {
        message.error("Erro ao carregar habilidades.");
      }
    } catch (err) {
      message.error("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSaveSkill = async () => {
    if (!newSkillName.trim()) {
      Toast("info", "Digite um nome para a habilidade.");
      return;
    }

    setLoadingCreate(true);

    setTimeout(async () => {
      try {
        const method = editingSkill ? "PATCH" : "POST";
        const endpoint = `${import.meta.env.VITE_BASE_PATH}/skill`;

        const body = editingSkill
          ? {
              id_habilidade: editingSkill.id_habilidade,
              nom_habilidade: newSkillName,
            }
          : {
              nom_habilidade: newSkillName,
            };

        const response = await authFetch(endpoint, {
          method,
          body: JSON.stringify(body),
        });

        const data = await response.json();

        if (response.ok) {
          Toast(
            "success",
            editingSkill
              ? "Habilidade atualizada com sucesso!"
              : "Habilidade criada com sucesso!"
          );
          setNewSkillName("");
          setIsModalOpen(false);
          setEditingSkill(null);
          fetchSkills();
        } else {
          Toast("error", data.error || "Erro ao salvar habilidade.");
        }
      } catch (err) {
        Toast("error", "Erro ao conectar com o servidor.");
      } finally {
        setLoadingCreate(false);
      }
    }, 1500);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id_habilidade",
      key: "id_habilidade",
      render: (text: number, record: Skill) => (
        <Button
          type="link"
          onClick={() => {
            setEditingSkill(record);
            setNewSkillName(record.nom_habilidade);
            setIsModalOpen(true);
          }}
        >
          {text}
        </Button>
      ),
    },
    {
      title: "Nome",
      dataIndex: "nom_habilidade",
      key: "nom_habilidade",
      sorter: (a: Skill, b: Skill) =>
        a.nom_habilidade.localeCompare(b.nom_habilidade),
    },
  ];

  const filteredData = dataSkills.filter((item) =>
    item.nom_habilidade.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Topbar />
      <div style={{ padding: 24 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title level={3}>Habilidades</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ background: "#3F8F56", fontSize: "0.875rem" }}
            onClick={() => {
              setEditingSkill(null); // modo criação
              setNewSkillName("");
              setIsModalOpen(true);
            }}
          >
            Novo
          </Button>
        </div>

        <Space style={{ marginBottom: 16 }} wrap>
          <Input
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 200 }}
          />
        </Space>

        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id_habilidade"
          loading={loading}
          pagination={false}
        />
      </div>

      <Modal
        title={editingSkill ? "Editar Habilidade" : "Nova Habilidade"}
        open={isModalOpen}
        onOk={handleSaveSkill}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingSkill(null);
        }}
        okText={editingSkill ? "Salvar" : "Criar"}
        cancelText="Cancelar"
        destroyOnClose
        okButtonProps={{
          style: {
            backgroundColor: "#3F8F56",
            borderColor: "#3F8F56",
          },
          loading: loadingCreate,
        }}
      >
        <Input
          placeholder="Nome da habilidade"
          value={newSkillName}
          onChange={(e) => setNewSkillName(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default Skills;
