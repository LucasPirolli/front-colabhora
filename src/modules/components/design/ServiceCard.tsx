import { Card, Tag, Space, Typography, Button, Spin } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { Paragraph } = Typography;

type ServiceCardProps = {
  title: string;
  description: string;
  categories: string[];
  hasActions?: boolean;
  isApplicationView?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
  onViewDetails?: () => void;
  onWithdraw?: () => void;
  onCheckStatus?: () => void;
  onAccept?: () => void;
  acceptLoading?: boolean;
};

const ServiceCard = ({
  title,
  description,
  categories,
  hasActions = false,
  isApplicationView = false,
  onEdit,
  onDelete,
  onClick,
  onWithdraw,
  onCheckStatus,
  onAccept,
  acceptLoading = false,
}: ServiceCardProps) => {
  const renderActions = () => {
    if (onAccept) {
      return (
        <Space>
          <Button
            icon={acceptLoading ? <Spin size="small" /> : <CheckCircleOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              if (!acceptLoading) {
                onAccept?.();
              }
            }}
            type="text"
            style={{ color: "#52c41a" }}
            disabled={acceptLoading}
          />
        </Space>
      );
    }

    if (isApplicationView) {
      return (
        <Space>
          <Button
            icon={<CloseCircleOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              onWithdraw?.();
            }}
            type="text"
            danger
          />
          <Button
            icon={<InfoCircleOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              onCheckStatus?.();
            }}
            type="text"
          />
        </Space>
      );
    }

    if (hasActions) {
      return (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.();
            }}
            type="text"
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
            type="text"
            danger
          />
        </Space>
      );
    }

    return null;
  };

  return (
    <Card
      title={title}
      extra={renderActions()}
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
