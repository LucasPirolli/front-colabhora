import { useState } from "react";
import {
  Card,
  Tag,
  Space,
  Typography,
  Button,
  Spin,
  Tooltip,
} from "antd";
import {
  CloseCircleOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  FlagOutlined,
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
  const [actionLoading, setActionLoading] = useState<
    Record<"finalize" | "cancel", boolean>
  >({
    finalize: false,
    cancel: false,
  });

  const isLocked = status === "Finalizado" || status === "Cancelado";

  const renderActions = () => {
    if (onAccept) {
      return (
        <Space>
          <Tooltip
            title={isLocked ? "Serviço já encerrado" : "Aceitar serviço"}
          >
            <Button
              icon={
                acceptLoading ? <Spin size="small" /> : <CheckCircleOutlined />
              }
              onClick={(e) => {
                e.stopPropagation();
                if (isLocked || acceptLoading || !onFinished) return;
                if (!acceptLoading) {
                  onAccept?.();
                }
              }}
              type="text"
              style={{ color: "#52c41a", cursor: isLocked ? "not-allowed" : "pointer", opacity: isLocked ? 0.4 : 1 }}
              disabled={acceptLoading}
            />
          </Tooltip>
        </Space>
      );
    }

    if (isApplicationView) {
      return (
        <Space>
          <Tooltip title="Desistir da candidatura">
            <Button
              icon={<CloseCircleOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                onWithdraw?.();
              }}
              type="text"
              danger
            />
          </Tooltip>
          <Tooltip title="Ver status da seleção">
            <Button
              icon={<InfoCircleOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                onCheckStatus?.();
              }}
              type="text"
            />
          </Tooltip>
        </Space>
      );
    }

    if (hasActions) {
      return (
        <Space>
          <Tooltip
            title={isLocked ? "Serviço já encerrado" : "Finalizar serviço"}
          >
            <Button
              icon={
                actionLoading.finalize ? <Spin size="small" /> : <FlagOutlined />
              }
              onClick={async (e) => {
                e.stopPropagation();
                if (isLocked || actionLoading.finalize || !onFinished) return;

                setActionLoading((prev) => ({ ...prev, finalize: true }));
                try {
                  await onFinished();
                } finally {
                  setActionLoading((prev) => ({ ...prev, finalize: false }));
                }
              }}
              type="text"
              style={{
                color: "#3f8f56",
                cursor: isLocked ? "not-allowed" : "pointer",
                opacity: isLocked ? 0.4 : 1,
              }}
              disabled={isLocked || actionLoading.finalize}
            />
          </Tooltip>

          <Tooltip
            title={isLocked ? "Serviço já encerrado" : "Cancelar serviço"}
          >
            <Button
              icon={
                actionLoading.cancel ? <Spin size="small" /> : <CloseCircleOutlined />
              }
              onClick={async (e) => {
                e.stopPropagation();
                if (isLocked || actionLoading.cancel || !onCancel) return;

                setActionLoading((prev) => ({ ...prev, cancel: true }));
                try {
                  await onCancel();
                } finally {
                  setActionLoading((prev) => ({ ...prev, cancel: false }));
                }
              }}
              type="text"
              danger
              disabled={isLocked || actionLoading.cancel}
              style={{
                cursor: isLocked ? "not-allowed" : "pointer",
                opacity: isLocked ? 0.4 : 1,
              }}
            />
          </Tooltip>
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
