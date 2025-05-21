import { Card, Tag, Space, Typography, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;

type ServiceCardProps = {
  title: string;
  description: string;
  categories: string[];
  hasActions: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onClick?: () => void;
};

const ServiceCard = ({
  title,
  description,
  categories,
  hasActions,
  onEdit,
  onDelete,
  onClick,
}: ServiceCardProps) => {
  return (
    <Card
      title={title}
      extra={
        hasActions ? (
          <Space>
            <Button icon={<EditOutlined />} onClick={onEdit} type="text" />
            <Button
              icon={<DeleteOutlined />}
              onClick={onDelete}
              type="text"
              danger
            />
          </Space>
        ) : null
      }
      style={{ cursor: "pointer" }}
      onClick={onClick}
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
