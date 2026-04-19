import { useState } from "react";
import { Form, Input, Button, Select, Typography } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import styles from "./auth.module.css";

import EB from "../../assets/exercito.png";

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

  return (
    <div className={`${styles.container} ${isRegister ? styles.active : ""}`}>
      {/* FORM LOGIN */}
      <div className={`${styles.formContainer} ${styles.login}`}>
        <div className={styles.formBox}>
          <Title level={3}>Acesso ao Sistema</Title>

          <Form layout="vertical">
            <Form.Item name="email" rules={[{ required: true }]}>
              <Input prefix={<MailOutlined />} placeholder="E-mail" />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true }]}>
              <Input.Password prefix={<LockOutlined />} placeholder="Senha" />
            </Form.Item>

            <Button className={styles.button} block>
              Entrar
            </Button>
          </Form>

          <Text>
            Não possui conta?{" "}
            <span onClick={() => setIsRegister(true)}>Criar conta</span>
          </Text>
        </div>
      </div>

      {/* FORM REGISTER */}
      <div className={`${styles.formContainer} ${styles.register}`}>
        <div className={styles.formBox}>
          <Title level={3}>Criar Conta</Title>

          <Form layout="vertical">
            <Form.Item name="warName" rules={[{ required: true }]}>
              <Input prefix={<UserOutlined />} placeholder="Nome de Guerra" />
            </Form.Item>

            <Form.Item name="email" rules={[{ required: true }]}>
              <Input prefix={<MailOutlined />} placeholder="E-mail" />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true }]}>
              <Input.Password prefix={<LockOutlined />} placeholder="Senha" />
            </Form.Item>

            <Form.Item name="confirmPassword" rules={[{ required: true }]}>
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirme sua senha"
              />
            </Form.Item>

            <Form.Item name="grad" rules={[{ required: true }]}>
              <Select placeholder="Selecione a graduação">
                {GRADUACOES.map((g) => (
                  <Option key={g.value} value={g.value}>
                    {g.label} ({g.value})
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Button className={styles.button} block>
              Registrar
            </Button>
          </Form>

          <Text>
            Já possui conta?{" "}
            <span onClick={() => setIsRegister(false)}>Fazer login</span>
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
