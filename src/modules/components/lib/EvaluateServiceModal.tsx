// components/lib/EvaluateServiceModal.tsx
import { Modal, Form, Input, Rate, Button } from "antd";
import { useEffect } from "react";

const { TextArea } = Input;

export type EvaluateServiceModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  idServico: number;
  usuariosParaAvaliar: { id_usuario_prestador: number; nom_usuario: string }[];
};

const EvaluateServiceModal = ({
  visible,
  onClose,
  onSubmit,
  idServico,
  usuariosParaAvaliar,
}: EvaluateServiceModalProps) => {
  const [form] = Form.useForm();

  console.log('usuariosParaAvaliar', usuariosParaAvaliar);
  

  useEffect(() => {
    if (visible) {
      const initial = usuariosParaAvaliar.map((user) => ({
        id_usuario: user.id_usuario_prestador,
        num_nota_avaliacao: 0,
        desc_comentario_avaliacao: "",
      }));
      form.setFieldsValue({ avaliacao_usuario_list: initial });
    }
  }, [visible]);

  const handleFinish = (values: any) => {
    onSubmit({
      id_servico: idServico,
      avaliacao_usuario_list: values.avaliacao_usuario_list,
    });
  };

  return (
    <Modal
      title="Avaliar Prestadores"
      open={visible}
      footer={null}
      onCancel={() => {}}
      maskClosable={false}
      closable={false}
      destroyOnClose
    >
      <Form form={form} onFinish={handleFinish} layout="vertical">
        {usuariosParaAvaliar.map((user, index) => (
          <div key={user.id_usuario_prestador} style={{ marginBottom: 24 }}>
            <h4>{user.nom_usuario}</h4>
            <Form.Item
              name={["avaliacao_usuario_list", index, "id_usuario"]}
              initialValue={user.id_usuario_prestador}
              hidden
            >
              <Input type="hidden" />
            </Form.Item>

            <Form.Item
              label="Nota"
              name={["avaliacao_usuario_list", index, "num_nota_avaliacao"]}
              rules={[{ required: true, message: "Por favor, dê uma nota" }]}
            >
              <Rate count={10} />
            </Form.Item>

            <Form.Item
              label="Comentário"
              name={["avaliacao_usuario_list", index, "desc_comentario_avaliacao"]}
              rules={[{ required: true, message: "Por favor, insira um comentário" }]}
            >
              <TextArea rows={3} placeholder="Digite seu feedback..." />
            </Form.Item>
          </div>
        ))}

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Enviar Avaliação
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EvaluateServiceModal;
