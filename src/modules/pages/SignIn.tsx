import { useState } from "react";

import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router";

import Banner from "../../assets/banner-signin.svg";

import "../styles/pages/signIn.scss";

function SignIn() {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);

  type FieldType = {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div data-page="signIn">
      <section className="container-form">
        <div className="content-form">
          <h1 className="title">ColabHora</h1>
          <span className="phrase">
            {isRegistering
              ? "Crie sua conta"
              : "Faça login para acessar a ferramenta"}
          </span>

          <Form
            name="auth"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{
              width: "100%",
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            {isRegistering && (
              <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[{ required: true, message: "Digite seu email!" }]}
              >
                <Input />
              </Form.Item>
            )}

            <Form.Item<FieldType>
              label="Usuário"
              name="username"
              rules={[
                { required: true, message: "Digite seu nome de usuário!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Senha"
              name="password"
              rules={[{ required: true, message: "Digite sua senha!" }]}
            >
              <Input.Password />
            </Form.Item>

            {isRegistering && (
              <Form.Item<FieldType>
                label="Confirmar"
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Confirme sua senha!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("As senhas não coincidem!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
            )}

            <Form.Item
              wrapperCol={{ offset: 0, span: 24 }}
              style={{ textAlign: "center" }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ background: "#3F8F56", marginRight: "8px" }}
              >
                {isRegistering ? "Registrar" : "Entrar"}
              </Button>

              <Button
                type="link"
                htmlType="button"
                onClick={() => setIsRegistering((prev) => !prev)}
                style={{ color: "#7b7b7b" }}
              >
                {isRegistering ? "Entrar" : "Registre-se"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </section>

      <div className="content-img">
        <img src={Banner} alt="Banner" />
      </div>
    </div>
  );
}

export default SignIn;
