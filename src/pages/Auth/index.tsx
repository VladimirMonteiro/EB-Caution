import { useState } from "react";
import { Form, Input, Button, Select, Typography, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

import styles from "./auth.module.css";

import EB from "../../assets/exercito.png";
import { useAuth } from "../../hooks/useAuth";
import type {
  LoginRequest,
  RegisterRequest,
} from "../../services/authService/types";
import { registerRequest } from "../../services/authService";

const { Title, Text } = Typography;
const { Option } = Select;

const GRADUACOES = [
  { label: "Soldado", value: "SD" },
  { label: "Cabo", value: "CB" },
  { label: "3º Sargento", value: "3SGT" },
  { label: "2º Sargento", value: "2SGT" },
  { label: "1º Sargento", value: "1SGT" },
  { label: "Subtenente", value: "ST" },
  { label: "Aspirante", value: "ASP" },
  { label: "2º Tenente", value: "2TEN" },
  { label: "1º Tenente", value: "1TEN" },
  { label: "Capitão", value: "CAP" },
  { label: "Major", value: "MAJ" },
  { label: "Tenente-Coronel", value: "TC" },
  { label: "Coronel", value: "CEL" },
];

export function Auth() {
  const [isRegister, setIsRegister] = useState(false);

  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();

  const { authenticate } = useAuth();

  function toggleIsRegister() {
    setIsRegister((prev) => !prev);

    loginForm.resetFields();
    registerForm.resetFields();
  }

  async function handleLogin(values: LoginRequest) {
    try {
      await authenticate(values);

      message.success("Login realizado com sucesso");
      loginForm.resetFields();

      // 👉 exemplo:
      // navigate("/dashboard");
    } catch (err: any) {
      message.error(err.message || "Erro ao fazer login");
    }
  }

  async function handleRegister(values: RegisterRequest) {
    try {
      await registerRequest(values);
      console.log(values);
      message.success("Cadastro realizado com sucesso");
      registerForm.resetFields();
      setIsRegister(false);
    } catch (error: any) {
      message.error(error.message || "Erro ao fazer login");
    }
  }

  return (
    <div className={`${styles.container} ${isRegister ? styles.active : ""}`}>
      {/* FORM LOGIN */}
      <div className={`${styles.formContainer} ${styles.login}`}>
        <div className={styles.formBox}>
          <Title level={3}>Acesso ao Sistema</Title>

          <Form layout="vertical" form={loginForm} onFinish={handleLogin}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "E-mail é obrigatório." }]}
            >
              <Input prefix={<MailOutlined />} placeholder="E-mail" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "A senha é obrigatória." }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Senha" />
            </Form.Item>

            <div className={styles.buttonContainer}>
              <input type="submit" className={styles.button} value="entrar" />
            </div>
          </Form>

          <Text>
            Não possui conta?{" "}
            <span onClick={toggleIsRegister}>Criar conta</span>
          </Text>
        </div>
      </div>

      {/* FORM REGISTER */}
      <div className={`${styles.formContainer} ${styles.register}`}>
        <div className={styles.formBox}>
          <Title level={3}>Criar Conta</Title>

          <Form layout="vertical" form={registerForm} onFinish={handleRegister}>
            <Form.Item
              name="warName"
              rules={[
                { required: true, message: "O nome de guerra é obrigatório." },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Nome de Guerra" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[{ required: true, message: "O E-mail é obrigatório." }]}
            >
              <Input prefix={<MailOutlined />} placeholder="E-mail" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "A senha é obrigatória." }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Senha" />
            </Form.Item>

            <Form.Item
              name="passwordConfirm"
              rules={[
                {
                  required: true,
                  message: "A confirmação de senha é obrigatória.",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirme sua senha"
              />
            </Form.Item>

            <Form.Item
              name="grad"
              rules={[
                { required: true, message: "A graduação é obrigatória." },
              ]}
            >
              <Select placeholder="Selecione a graduação">
                {GRADUACOES.map((g) => (
                  <Option key={g.value} value={g.value}>
                    {g.label} ({g.value})
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <div className={styles.buttonContainer}>
              <input
                type="submit"
                className={styles.button}
                value="Registrar"
              />
            </div>
          </Form>

          <Text>
            Já possui conta? <span onClick={toggleIsRegister}>Fazer login</span>
          </Text>
        </div>
      </div>

      {/* OVERLAY (ANIMAÇÃO) */}
      <div className={styles.overlayContainer}>
        <div className={styles.overlay}>
          <div className={styles.overlayPanel}>
            <img src={EB} className={styles.logo} />
            <h2>Sistema de Cautelas</h2>
            <p>Controle de material militar com segurança</p>
          </div>
        </div>
      </div>
    </div>
  );
}
