import { useEffect, useState } from "react";
import { Button, Input, Table, Typography, Space, Modal, DatePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/pt_BR";
import Cookies from "universal-cookie";
import { authFetch } from "../services/authFetch";
import Toast from "../components/lib/toast";
import Topbar from "../components/design/Topbar";

const { Title } = Typography;
const { TextArea } = Input;

interface Project {
    id_projeto: number;
    nom_projeto: string;
    desc_projeto: string;
    dth_inicio: string;
    dth_fim: string;
}

const Projects = () => {
    const cookies = new Cookies();
    const userId = cookies.get("id_usuario");

    const [projects, setProjects] = useState<Project[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [loadingSave, setLoadingSave] = useState(false);

    const [formData, setFormData] = useState({
        nom_projeto: "",
        desc_projeto: "",
        dth_inicio: null as any,
        dth_fim: null as any,
    });

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const res = await authFetch(
                `${import.meta.env.VITE_BASE_PATH}/project?id_usuario_responsavel=${userId}`
            );
            const data = await res.json();

            if (res.ok && data.result) {
                setProjects(data.result);
            } else {
                Toast("error", "Erro ao carregar projetos.");
            }
        } catch (err) {
            Toast("error", "Erro de conexão.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleSave = async () => {
        const { nom_projeto, desc_projeto, dth_inicio, dth_fim } = formData;

        if (!nom_projeto || !desc_projeto || !dth_inicio || !dth_fim) {
            Toast("info", "Preencha todos os campos.");
            return;
        }

        setLoadingSave(true);
        try {
            const response = await authFetch(
                `${import.meta.env.VITE_BASE_PATH}/project`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        nom_projeto,
                        desc_projeto,
                        id_usuario_responsavel: userId,
                        dth_inicio: dth_inicio.toISOString(),
                        dth_fim: dth_fim.toISOString(),
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                Toast("success", "Projeto criado com sucesso!");
                setModalOpen(false);
                setFormData({
                    nom_projeto: "",
                    desc_projeto: "",
                    dth_inicio: null,
                    dth_fim: null,
                });
                fetchProjects();
            } else {
                Toast("error", data.error || "Erro ao salvar projeto.");
            }
        } catch (err) {
            Toast("error", "Erro ao conectar com o servidor.");
        } finally {
            setLoadingSave(false);
        }
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id_projeto",
            key: "id_projeto",
        },
        {
            title: "Nome",
            dataIndex: "nom_projeto",
            key: "nom_projeto",
        },
        {
            title: "Descrição",
            dataIndex: "desc_projeto",
            key: "desc_projeto",
        },
        {
            title: "Início",
            dataIndex: "dth_inicio",
            key: "dth_inicio",
            render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
        },
        {
            title: "Fim",
            dataIndex: "dth_fim",
            key: "dth_fim",
            render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
        },
    ];

    const filteredData = projects.filter((proj) =>
        proj.nom_projeto.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <Topbar />
            <div style={{ padding: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Title level={3}>Projetos</Title>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        style={{ background: "#3F8F56" }}
                        onClick={() => setModalOpen(true)}
                    >
                        Novo Projeto
                    </Button>
                </div>

                <Space style={{ marginBottom: 16 }} wrap>
                    <Input
                        placeholder="Buscar..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ width: 240 }}
                    />
                </Space>

                <Table
                    columns={columns}
                    dataSource={filteredData}
                    rowKey="id_projeto"
                    loading={loading}
                    pagination={false}
                />
            </div>

            <Modal
                title="Novo Projeto"
                open={modalOpen}
                onOk={handleSave}
                centered
                onCancel={() => {
                    setModalOpen(false);
                    setFormData({
                        nom_projeto: "",
                        desc_projeto: "",
                        dth_inicio: null,
                        dth_fim: null,
                    });
                }}
                okText="Criar"
                cancelText="Cancelar"
                destroyOnClose
                okButtonProps={{
                    style: { backgroundColor: "#3F8F56", borderColor: "#3F8F56" },
                    loading: loadingSave,
                }}
            >
                <Input
                    placeholder="Nome do Projeto"
                    value={formData.nom_projeto}
                    onChange={(e) => setFormData({ ...formData, nom_projeto: e.target.value })}
                    style={{ marginBottom: 12 }}
                />
                <TextArea
                    placeholder="Descrição"
                    value={formData.desc_projeto}
                    onChange={(e) => setFormData({ ...formData, desc_projeto: e.target.value })}
                    rows={3}
                    style={{ marginBottom: 12, resize: "none" }}
                />
                <DatePicker
                    placeholder="Data de Início"
                    style={{ width: "100%", marginBottom: 12 }}
                    locale={locale}
                    format="DD/MM/YYYY"
                    value={formData.dth_inicio}
                    onChange={(date) => setFormData({ ...formData, dth_inicio: date })}
                />
                <DatePicker
                    placeholder="Data de Fim"
                    style={{ width: "100%" }}
                    locale={locale}
                    format="DD/MM/YYYY"
                    value={formData.dth_fim}
                    onChange={(date) => setFormData({ ...formData, dth_fim: date })}
                />
            </Modal>
        </>
    );
};

export default Projects;
