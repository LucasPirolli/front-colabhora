// Novo componente para modal de criação de serviço
import { Modal, Form, Input, DatePicker, Select, InputNumber, Button, Row, Col } from "antd";
import { useEffect, useState } from "react";
import locale from "antd/es/date-picker/locale/pt_BR";
import Cookies from "universal-cookie";
import { authFetch } from "../../services/authFetch";
import Toast from "./toast";

const { TextArea } = Input;
const { Option } = Select;

const CreateServiceModal = ({ visible, onClose, onSuccess, isPJ }: {
    visible: boolean;
    onClose: () => void;
    onSuccess: () => void;
    isPJ: boolean;
}) => {
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [categories, setCategories] = useState([]);

    const [form] = Form.useForm();
    const cookies = new Cookies();
    const userId = cookies.get("id_usuario");

    useEffect(() => {
        if (visible) {
            fetchDropdownData();
        }
    }, [visible]);

    useEffect(() => {
        if (!visible) {
            form.resetFields();
        }
    }, [visible]);

    const fetchDropdownData = async () => {
        try {
            const [projRes, skillRes, catRes] = await Promise.all([
                authFetch(`${import.meta.env.VITE_BASE_PATH}/project?id_usuario_responsavel=${userId}`),
                authFetch(`${import.meta.env.VITE_BASE_PATH}/skill`),
                authFetch(`${import.meta.env.VITE_BASE_PATH}/category`),
            ]);

            const parseJsonSafe = async (res: Response) => {
                if (!res.ok) throw new Error("Erro na requisição");
                const text = await res.text();
                return text ? JSON.parse(text) : {};
            };

            const [projData, skillData, catData] = await Promise.all([
                parseJsonSafe(projRes),
                parseJsonSafe(skillRes),
                parseJsonSafe(catRes),
            ]);


            setProjects(projData.result || []);
            setSkills(skillData.result || []);
            setCategories(catData.result || []);
        } catch (err) {
            console.error("Erro ao carregar dados auxiliares:", err);
            Toast("error", "Erro ao carregar dados auxiliares.");
        }
    };

    const handleSubmit = async (values: any) => {

        setLoading(true);
        try {
            const payload: any = {
                nom_servico: values.nom_servico,
                desc_servico: values.desc_servico,
                id_usuario_solicitante: userId,
                dth_servico: values.dth_servico.toISOString(),
                dth_fim_servico: values.dth_fim_servico.toISOString(),
                num_qtd_prestadores: values.num_qtd_prestadores,
                id_habilidade_lista: values.id_habilidade_lista,
                id_categoria_lista: values.id_categoria_lista,
                ...(isPJ && { id_projeto_pai: values.id_projeto_pai })
            };

            const response = await authFetch(`${import.meta.env.VITE_BASE_PATH}/service`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                Toast("success", "Serviço criado com sucesso!");
                onSuccess();
                form.resetFields();
            } else {
                Toast("error", data.error || "Erro ao criar serviço.");
            }
        } catch (err) {
            Toast("error", "Erro de conexão.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Novo Serviço"
            open={visible}
            onCancel={onClose}
            footer={null}
            destroyOnClose
            centered={true}
        >
            <Form layout="vertical" form={form} onFinish={handleSubmit}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="nom_servico" label="Nome do Serviço" rules={[{ required: true, message: "Campo obrigatório" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12} style={{ display: isPJ ? "block" : "none" }}>
                        {isPJ && (
                            <Form.Item name="id_projeto_pai" label="Projeto" rules={[{ required: true, message: "Campo obrigatório" }]}
                            >
                                <Select placeholder="Selecione o projeto">
                                    {projects.map((proj: any) => (
                                        <Option key={proj.id_projeto} value={proj.id_projeto}>
                                            {proj.nom_projeto}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        )}
                    </Col>
                </Row>

                <Form.Item name="desc_servico" label="Descrição" rules={[{ required: true, message: "Campo obrigatório" }]}
                >
                    <TextArea rows={3} style={{ resize: 'none' }} />
                </Form.Item>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="dth_servico"
                            label="Data de Início"
                            rules={[{ required: true, message: "Campo obrigatório" }]}
                        >
                            <DatePicker
                                style={{ width: "100%" }}
                                format="DD/MM/YYYY"
                                locale={locale}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="dth_fim_servico"
                            label="Data de Fim"
                            rules={[{ required: true, message: "Campo obrigatório" }]}
                        >
                            <DatePicker
                                style={{ width: "100%" }}
                                format="DD/MM/YYYY"
                                locale={locale}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="num_qtd_prestadores"
                            label="Quantidade de Prestadores"
                            rules={[{ required: true, message: "Campo obrigatório" }]}

                        >
                            <InputNumber min={1} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="id_categoria_lista"
                            label="Categorias"
                            rules={[{ required: true, message: "Campo obrigatório" }]}

                        >
                            <Select mode="multiple" placeholder="Selecione as categorias">
                                {categories.map((c: any) => (
                                    <Option key={c.id_categoria} value={c.id_categoria}>
                                        {c.nom_categoria}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    name="id_habilidade_lista"
                    label="Habilidades"
                    rules={[{ required: true, message: "Campo obrigatório" }]}

                >
                    <Select mode="multiple" placeholder="Selecione as habilidades">
                        {skills.map((s: any) => (
                            <Option key={s.id_habilidade} value={s.id_habilidade}>
                                {s.nom_habilidade}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button
                        htmlType="submit"
                        type="primary"
                        block
                        loading={loading}
                        style={{ background: "#3F8F56" }}
                    >
                        Criar Serviço
                    </Button>
                </Form.Item>
            </Form>

        </Modal>
    );
};

export default CreateServiceModal;
