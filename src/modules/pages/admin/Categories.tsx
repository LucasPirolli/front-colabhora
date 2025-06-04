import { useEffect, useState } from "react";
import { Button, Input, Table, Typography, Space, message, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import Topbar from "../../components/design/Topbar";
import Toast from "../../components/lib/toast";
import { authFetch } from "../../services/authFetch";

const { Title } = Typography;

interface Category {
  id_categoria: number;
  nom_categoria: string;
}

const Categories = () => {
  const [search, setSearch] = useState("");
  const [dataCategories, setDataCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [loadingSave, setLoadingSave] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await authFetch(
        `${import.meta.env.VITE_BASE_PATH}/category`
      );
      const data = await response.json();

      if (response.ok && data.result) {
        setDataCategories(data.result);
      } else {
        message.error("Erro ao carregar categorias.");
      }
    } catch (err) {
      message.error("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSaveCategory = async () => {
    if (!newCategoryName.trim()) {
      Toast("info", "Digite um nome para a categoria.");
      return;
    }

    setLoadingSave(true);

    try {
      const response = await authFetch(
        `${import.meta.env.VITE_BASE_PATH}/category`,
        {
          method: editingCategory ? "PATCH" : "POST",
          body: JSON.stringify({
            nom_categoria: newCategoryName,
            ...(editingCategory && {
              id_categoria: editingCategory.id_categoria,
            }),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Toast(
          "success",
          editingCategory ? "Categoria atualizada!" : "Categoria criada!"
        );
        setNewCategoryName("");
        setEditingCategory(null);
        setIsModalOpen(false);
        fetchCategories();
      } else {
        Toast("error", data.message || "Erro ao salvar categoria.");
      }
    } catch (err) {
      Toast("error", "Erro ao conectar com o servidor.");
    } finally {
      setLoadingSave(false);
    }
  };

  // const handleEdit = (category: Category) => {
  //   setEditingCategory(category);
  //   setNewCategoryName(category.nom_categoria);
  //   setIsModalOpen(true);
  // };

  const columns = [
    {
      title: "ID",
      dataIndex: "id_categoria",
      key: "id_categoria",
      render: (text: number, record: Category) => (
        <Button
          type="link"
          onClick={() => {
            setEditingCategory(record);
            setNewCategoryName(record.nom_categoria);
            setIsModalOpen(true);
          }}
        >
          {text}
        </Button>
      ),
    },
    {
      title: "Nome",
      dataIndex: "nom_categoria",
      key: "nom_categoria",
      sorter: (a: Category, b: Category) =>
        a.nom_categoria.localeCompare(b.nom_categoria),
    },
  ];

  const filteredData = dataCategories.filter((item) =>
    item.nom_categoria.toLowerCase().includes(search.toLowerCase())
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
          <Title level={3}>Categorias</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ background: "#3F8F56", fontSize: "0.875rem" }}
            onClick={() => {
              setEditingCategory(null);
              setNewCategoryName("");
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
          rowKey="id_categoria"
          loading={loading}
          pagination={false}
        />
      </div>

      <Modal
        title={editingCategory ? "Editar Categoria" : "Nova Categoria"}
        open={isModalOpen}
        onOk={handleSaveCategory}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingCategory(null);
        }}
        okText={editingCategory ? "Salvar" : "Criar"}
        cancelText="Cancelar"
        destroyOnClose
        okButtonProps={{
          style: {
            backgroundColor: "#3F8F56",
            borderColor: "#3F8F56",
          },
          loading: loadingSave,
        }}
      >
        <Input
          placeholder="Nome da categoria"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default Categories;
