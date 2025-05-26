import { useState } from "react";
import { Button, Input, Select, Table, Typography, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import Topbar from "../../components/design/Topbar";

const { Title } = Typography;
const { Option } = Select;

const Skills = () => {
  const [search, setSearch] = useState("");
  const [filter1, setFilter1] = useState<string | undefined>();
  const [filter2, setFilter2] = useState<string | undefined>();

  const columns = [
    {
      title: "Name (job title)",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a: any, b: any) => a.age - b.age,
    },
    {
      title: "Nickname",
      dataIndex: "nickname",
      key: "nickname",
    },
    {
      title: "Employee",
      dataIndex: "employee",
      key: "employee",
      render: (value: boolean) => (
        <input type="checkbox" checked={value} readOnly />
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "Giacomo Guilizzoni\nFounder & CEO",
      age: 40,
      nickname: "Peldi",
      employee: true,
    },
    {
      key: "2",
      name: "Marco Botton\nTuttofare",
      age: 38,
      nickname: "",
      employee: false,
    },
    {
      key: "3",
      name: "Mariah Maclachlan\nBetter Half",
      age: 41,
      nickname: "Patata",
      employee: true,
    },
    {
      key: "4",
      name: "Valerie Liberty\nHead Chef",
      age: null,
      nickname: "Val",
      employee: true,
    },
  ];

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
            style={{
              background: "#3F8F56",
              fontSize: "0.875rem",
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
          <Select
            placeholder="Filtro 1"
            value={filter1}
            onChange={(value) => setFilter1(value)}
            style={{ width: 150 }}
          >
            <Option value="opcao1">Opção 1</Option>
            <Option value="opcao2">Opção 2</Option>
          </Select>
          <Select
            placeholder="Filtro 2"
            value={filter2}
            onChange={(value) => setFilter2(value)}
            style={{ width: 150 }}
          >
            <Option value="categoriaA">Categoria A</Option>
            <Option value="categoriaB">Categoria B</Option>
          </Select>
        </Space>

        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
    </>
  );
};

export default Skills;
