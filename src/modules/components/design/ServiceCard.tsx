import { Card, Tag, Space, Typography, Row, Col, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

type ServiceCardProps = {
  title: string;
  description: string;
  categories: string[];
  onEdit: () => void;
  onDelete: () => void;
};

const ServiceCard = ({
  title,
  description,
  categories,
  onEdit,
  onDelete,
}: ServiceCardProps) => {
  return (
    <Card
      title={title}
      extra={
        <Space>
          <Button icon={<EditOutlined />} onClick={onEdit} type="text" />
          <Button
            icon={<DeleteOutlined />}
            onClick={onDelete}
            type="text"
            danger
          />
        </Space>
      }
    >
      <Paragraph>{description}</Paragraph>

      <Space wrap>
        {categories.map((cat) => (
          <Tag color="green" key={cat}>
            {cat}
          </Tag>
        ))}
      </Space>
    </Card>
  );
};

export default ServiceCard;
