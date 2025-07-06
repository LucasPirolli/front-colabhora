import { useState } from "react";
import { Card, Tag, Space, Typography, Button, Spin } from "antd";
import {
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
  status?: string;
  onFinished?: () => Promise<void> | void;
  onCancel?: () => Promise<void> | void;
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
  status,
  onFinished,
  onCancel,
  onClick,
  onWithdraw,
  onCheckStatus,
  onAccept,
  acceptLoading = false,
}: ServiceCardProps) => {
  const [actionLoading, setActionLoading] = useState<Record<"finalize" | "cancel", boolean>>({
    finalize: false,
    cancel: false,
  });

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
            icon={actionLoading.finalize ? <Spin size="small" /> : <CheckCircleOutlined />}
            onClick={async (e) => {
              e.stopPropagation();
              if (!actionLoading.finalize && onFinished) {
                setActionLoading((prev) => ({ ...prev, finalize: true }));
                try {
                  await onFinished();
                } finally {
                  setActionLoading((prev) => ({ ...prev, finalize: false }));
                }
              }
            }}
            type="text"
            style={{ color: "#3f8f56" }}
            disabled={actionLoading.finalize}
          />
          <Button
            icon={actionLoading.cancel ? <Spin size="small" /> : <CloseCircleOutlined />}
            onClick={async (e) => {
              e.stopPropagation();
              if (status === "Cancelado" || actionLoading.cancel || !onCancel) return;
              setActionLoading((prev) => ({ ...prev, cancel: true }));
              try {
                await onCancel();
              } finally {
                setActionLoading((prev) => ({ ...prev, cancel: false }));
              }
            }}
            type="text"
            danger
            disabled={status === "Cancelado" || actionLoading.cancel}
            style={{
              cursor: status === "Cancelado" ? "not-allowed" : "pointer",
              opacity: status === "Cancelado" ? 0.4 : 1,
            }}
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
